export type AddressParams = {
  receiver: string
  contact: string
  provinceCode: string
  cityCode: string
  countyCode: string
  address: string
  isDefault: number
}

export type AddressItem = {
  id: string
  fullLocation: string
} & AddressParams
