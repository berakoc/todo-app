export interface EmptyState {}

export interface EmptyProps {}

type zero = 0
export interface TodoDatabaseInterface {
    _id: string
    title: string
    content: string
    isFinished: boolean
    date: string
    __v?: zero
}

export interface TodoAppInterface {
    title: string
    content: string
    isFinished: boolean
    date: string
}

export interface ArrayRemoveReturnType<T> {
    array: Array<T>,
    removedElement: T
}