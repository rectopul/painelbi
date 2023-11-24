import { CommentsPayload, CreateComments } from "@/@types/Comments"
import { ErrorType } from "@/@types/types"

const createComment = async (data: CreateComments): Promise<CommentsPayload> => {
    try {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${process.env.NEXT_PUBLIC_ASANA_TOKEN}`,
            },
            body: JSON.stringify(data)
        }
        const req = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/comments`, options)

        if(!req.ok) {
            const dataError: ErrorType = await req.json()

            throw new Error(dataError.message)
        }

        const res: CommentsPayload = await req.json()

        return res
    } catch (error) {
        throw error
    }
}

const getComments = async (): Promise<CommentsPayload[]> => {
    try {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${process.env.NEXT_PUBLIC_ASANA_TOKEN}`,
            }
        }
        const req = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/comments`, options)

        if(!req.ok) {
            const dataError: ErrorType = await req.json()

            throw new Error(dataError.message)
        }

        const res: CommentsPayload[] = await req.json()

        return res
    } catch (error) {
        throw error
    }
}

export { createComment, getComments }