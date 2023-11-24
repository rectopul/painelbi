export interface CreateComments {
    word: string
}

export interface CommentsPayload {
    id: number
    word: string
    created_at: Date
    updated_at: Date
}