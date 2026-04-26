export type EntryStatus = 'PENDING' | 'PAID' | 'CANCELED' | 'LATE'

export type EntryCategory =
  | 'SERVICE'
  | 'PRODUCT'
  | 'OTHER'
  | 'MATERIAL'
  | 'SALARY'
  | 'OUTSOURCED'

export interface Entry {
  id: string
  description: string
  value: number
  expireDate: string
  paymentDate: string
  status: EntryStatus
  category: EntryCategory
}

export interface BankAccount {
  id: string
  bankName: string
  agency: string
  number: string
  amount: number
}
