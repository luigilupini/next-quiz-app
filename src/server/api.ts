"use server"

const EMPTY = {
  data: [],
  pagination: {
    offset: 0,
    current: 1,
    total_pages: 0,
    current_page: 1,
    total: 0,
  },
}

/*
{
    amount: '10',
    category: 'General Knowledge',
    difficulty: 'easy',
    type: 'multiple'
  }
*/

export async function getQuiz({
  amount = "10",
  category = "1",
  difficulty = "easy",
  type = "multiple",
}) {
  console.log(amount, category, difficulty, type)
  const query = `amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`
  const res = await fetch(`https://opentdb.com/api.php?${query}`)
  // if (!res.ok) throw new Error("Unable to fetch data")
  return res.json()
}

export async function getCategories() {
  const res = await fetch(`https://opentdb.com/api_category.php`)
  if (!res.ok) throw new Error("Unable to fetch data")
  return res.json()
}
