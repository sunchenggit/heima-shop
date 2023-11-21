import { http } from '@/utils/http'
import type { AddressParams, AddressItem } from '@/types/address'

export const postAddressAPI = (data: AddressParams) => {
  return http<{ id: number }>({
    method: 'POST',
    url: '/member/address',
    data,
  })
}

export const getAddressAPI = () => {
  return http<AddressItem[]>({
    method: 'GET',
    url: '/member/address',
  })
}

export const getAddressDetailAPI = (id: string) => {
  return http<AddressItem>({
    method: 'GET',
    url: `/member/address/${id}`,
  })
}

export const putAddressAPI = (id: string, data: AddressParams) => {
  return http<{ id: string }>({
    method: 'PUT',
    url: `/member/address/${id}`,
    data,
  })
}

export const deleteAddressAPI = (id: string) => {
  return http<{ id: string }>({
    method: 'DELETE',
    url: `/member/address/${id}`,
  })
}
