export type PersonType = 'CLINIC' | 'DENTIST' | 'CONVENTION' | 'LAB' | 'EMPLOYEE' | 'OTHER'

export interface Person {
  id: string
  socialReason: string
  fantasyName: string
  birthDate: string
  CNPJ: string
  CPF: string
  email: string
  residencialPhone: string
  comercialPhone: string
  privatePhone: string
  type: PersonType
  personDelegated: Person | null
}

export interface Employee extends Person {
  position: string
  baseSalary: number
}

export interface Dentist extends Person {
  cro: string
}
