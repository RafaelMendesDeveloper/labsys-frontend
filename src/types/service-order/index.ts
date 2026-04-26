import type { Employee } from '../person'

export type ToothType = 'INCISOR' | 'CANINE' | 'PREMOLAR' | 'MOLAR' | 'DECIDUO'

export type ToothPosition = 'UPPER' | 'LOWER'

export type ServiceOrderSituation =
  | 'ORDERED'
  | 'PRODUCTION'
  | 'PENDING'
  | 'TEST'
  | 'CANCELED'
  | 'CONCLUDED'
  | 'DELIVERED'

export interface ServiceOrderItemDefaultStep {
  id: string
  description: string
  order: number
  comissinoPrice: number
}

export interface ServiceOrderItemCategory {
  id: string
  name: string
  defaultPrice: number
  frequencyDiscount: number
  deadlineInDays: number
  defaultStep: ServiceOrderItemDefaultStep
}

export interface DefaultComission {
  id: string
  price: number
  frequencyPrice: number
  isDefault: boolean
}

export interface ServiceOrderItem {
  id: string
  quantity: number
  discount: number
  unitPrice: number
  dentistDeadline: string
  colorEscale: string
  observation: string
  isUrgent: boolean
  isFrequent: boolean
  category: ServiceOrderItemCategory
}

export interface ServiceOrderStep {
  id: string
  description: string
  order: number
  comissionPrice: number
  isConcluded: boolean
  responsible: Employee
}

export interface ServiceOrderTeeth {
  id: string
  type: ToothType
  identifier: string
  position: ToothPosition
}

export interface ServiceOrderSupplement {
  id: string
  url: string
  tipo: string
  uploadDate: string
}

export interface ServiceOrder {
  id: string
  entryDate: string
  externalOS: string
  organizingBox: string
  internalObservation: string
  situation: ServiceOrderSituation
  itens: ServiceOrderItem[]
  supplements: ServiceOrderSupplement[]
  steps: ServiceOrderStep[]
  teeths: ServiceOrderTeeth[]
}
