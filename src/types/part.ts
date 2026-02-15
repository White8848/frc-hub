export type PartCategory =
  | '电机'
  | '控制器'
  | '传感器'
  | '结构件'
  | '气动'
  | '电子元件'
  | '线材连接'

export interface PartSpec {
  label: string
  value: string
}

export interface Part {
  id: string
  name: string
  category: PartCategory
  description: string
  price: string
  image?: string
  specs: PartSpec[]
  purchaseUrl?: string
  brand: string
}
