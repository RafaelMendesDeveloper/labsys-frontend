import type { ServiceOrder } from '../service-order'

export type UnitOfMeasure = 'UN' | 'KG' | 'ML' | 'L' | 'M'

export type StockMovementType = 'ENTRY' | 'LEAVE' | 'LOST' | 'RETURN'

export interface Product {
  id: string
  code: string
  name: string
  branch: string
  label: string
  unitOfMeasure: UnitOfMeasure
  stock: number
  minStock: number
}

export interface StockMovement {
  id: string
  serviceOrders: ServiceOrder[]
  products: Product[]
  type: StockMovementType
  quantity: number
  entryDate: string
  observation: string
}
