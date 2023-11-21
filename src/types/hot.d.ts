import type { GoodItem, PageResult } from './global'

export type SubTypeItem = {
  id: string
  title: string
  goodsItems: PageResult<GoodItem>
}

export type HotResult = {
  id: string
  bannerPicture: string
  title: string
  subTypes: SubTypeItem[]
}
