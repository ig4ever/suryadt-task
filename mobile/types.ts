export type Cat = {
  id: string
  name: string
}

export type Owner = {
  id: string
  name: string
  cats: Cat[]
}

export type PaginatedResponse<T> = {
  success: boolean
  data: T
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
}