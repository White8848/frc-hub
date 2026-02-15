export type EquipmentCategory =
  | 'CNC加工'
  | '3D打印'
  | '手动工具'
  | '电动工具'
  | '测量仪器'
  | '焊接设备'

export interface Equipment {
  id: string
  name: string
  category: EquipmentCategory
  description: string
  recommendation: string
  priceRange: string
  image?: string
  tips: string[]
}
