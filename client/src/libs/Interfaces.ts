export interface EmptyState {}

export interface EmptyProps {}

type zero = 0
export interface TodoDatabaseInterface {
    _id: string
    title: string
    content: string
    date: string
    __v?: zero
}

export interface TodoAppInterface {
    title: string
    content: string
    date: string
}