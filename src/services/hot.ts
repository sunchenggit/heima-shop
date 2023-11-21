import { http } from '@/utils/http'
import type { PageParams } from '@/types/global'
import type { HotResult } from '@/types/hot'

// & 交叉类型 合并两个类型
type HotParams = PageParams & { subType?: string }
/**
 * 通用人呢推荐类型
 * @param url 请求地址
 * @param data  请求参数
 * @returns
 */
export const getHotRecommendApi = (url: string, data?: HotParams) => {
  return http<HotResult>({
    method: 'GET',
    url,
    data,
  })
}
