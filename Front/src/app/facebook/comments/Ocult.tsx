'use client'

import { useState } from "react"
import { CommentOcultForm } from "./CommentOcultForm"
import { CommentsOcultList } from "./CommentsOcultList"

export function CommentsOcult() {
    const [commentFormOpen, setCommentFormOpen] = useState<boolean>(false)
    const [commentsOcultList, setCommentsOcultList] = useState<boolean>(false)

    return (
        <div className="w-full mt-4 flex justify-end px-1">
            <CommentOcultForm open={commentFormOpen} onClose={setCommentFormOpen} />
            <CommentsOcultList onClose={setCommentsOcultList} open={commentsOcultList} />

            <button 
                onClick={() => setCommentFormOpen(true)}
                className="bg-indigo-500 hover:bg-indigo-400 mr-3 text-white text-sm rounded border border-indigo-600 font-medium text-center leading-5 px-3 py-2"
            >
                Ocultar Comentário
            </button>

            <button 
                onClick={() => setCommentsOcultList(true)}
                className="bg-indigo-500 text-white text-sm rounded border border-indigo-600 font-medium text-center leading-5 px-3 py-2"
            >
                Lista de Comentários Ocultos
            </button>
        </div>
    )
}