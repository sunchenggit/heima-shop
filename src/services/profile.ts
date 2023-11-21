import { http } from '@/utils/http'
import type { ProfileDetail, ProfileParams } from '@/types/member'

/**
 * 获取个人信息
 * @returns
 */
export const getMemberProfileAPI = () => {
  return http<ProfileDetail>({
    method: 'GET',
    url: '/member/profile',
  })
}

/**
 * 修改个人信息接口
 * @param data 传入参数
 * @returns
 */
export const putMemberProfilAPI = (data: ProfileParams) => {
  return http<ProfileDetail>({
    method: 'PUT',
    url: '/member/profile',
    data,
  })
}
