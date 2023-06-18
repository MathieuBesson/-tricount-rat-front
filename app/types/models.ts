export type Expenditure = {
    id: number
    amount: number
    date: string
    expenditureCategoryId: number
    userId: number
}

export type ExpenditureCategory = {
    id: number
    name: string
}

export type User = {
    id: number
    firstName: string
    lastName: string
    userId: number
}