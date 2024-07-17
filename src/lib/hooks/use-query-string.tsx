"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useCallback } from "react"

export const useQueryString = () => {
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (queryName: string, queryValue: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(queryName, queryValue)
      return params.toString()
    },
    [searchParams],
  )

  return createQueryString
}

export const useQueryStringState = (queryName: string, queryValue: string) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const createQueryString = useQueryString()

  const queryString = pathname + "?" + createQueryString(queryName, queryValue)
  const isActive = searchParams.get(queryName) === queryValue

  return { queryString, isActive }
}
