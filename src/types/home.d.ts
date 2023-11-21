import type { GoodItem } from './global'

/**
 * 首页广告区域数据类型
 */

export type BannerItem = {
  hrefUrl: string
  id: string
  imgUrl: string
  type: number
}

export type CategoryItem = {
  id: string
  name: string
  icon: string
}

export type HotItem = {
  id: string
  alt: string
  pictures: string[]
  target: string
  title: string
  type: string
}

export type GuessItem = GoodItem
