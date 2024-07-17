"use server"

import qs from "query-string"
import { z } from "zod"

export async function getCategories() {
  const res = await fetch(`https://opentdb.com/api_category.php`)
  if (!res.ok) throw new Error("Unable to fetch data")
  return res.json()
}

const settingsSchema = z.object({
  amount: z.preprocess(
    (value) => {
      const parsedValue = parseInt(value as string, 10)
      return isNaN(parsedValue) ? undefined : parsedValue
    },
    z.number().min(1, "Amount > 0").max(20, "Amount < 20"),
  ),
  category: z.string().min(1, "Category missing"),
  difficulty: z.string().min(1, "Difficulty missing"),
  type: z.string().min(1, "Type missing"),
})

const quizSchema = z.object({
  settings: z.preprocess((json) => {
    const parsed = qs.parse(json as string)
    return parsed
  }, settingsSchema),
})

export async function createQuiz(formData: FormData) {
  const validate = quizSchema.safeParse({
    settings: formData.get("settings"),
  })

  if (!validate.success) {
    const messages = validate.error.issues
      .map((issue) => issue.message)
      .join(", ")

    return {
      status: "error",
      message: `Please provide the following fields: ${messages}`,
      data: validate.error.flatten().fieldErrors,
    }
  }

  const { settings } = validate.data
  const query = `amount=${settings.amount}&category=${settings.category}&difficulty=${settings.difficulty}&type=${settings.type}`
  const res = await fetch(`https://opentdb.com/api.php?${query}`)
  const results = await res.json()

  if (results.response_code !== 0) {
    return {
      status: "error",
      message: "No questions found, please try again later or change criteria",
      data: results.results,
    }
  }

  return {
    status: "success",
    message: `${results.results[0].category} category loaded with ${results.results.length} questions`,
    data: results.results,
  }
}
