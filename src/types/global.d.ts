export type PageResult<T> = {
  counts: number
  pageSize: number
  pages: number
  page: number
  items: T[]
}

export type PageParams = {
  page?: number
  pageSize?: number
}

export type GoodItem = {
  desc: string
  discount: number
  id: string
  name: string
  orderNum: number
  picture: string
  price: number
}
