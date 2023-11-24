'use client'

import { CommentsPayload } from "@/@types/Comments";
import { FacebookPagesPayload } from "@/@types/facebook";
import { FacebookProfileComplete } from "@/@types/types";
import { getComments } from "@/components/Api/Comments";
import { getAllFacebookAccounts, getFacebookPagesList } from "@/components/Api/FacebookAccounts";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

interface ContextData {
    facebookAccounts: FacebookProfileComplete[] | null
    facebookPages: FacebookPagesPayload[] | null
    comments: CommentsPayload[] | null
    error: string | null
    updateComments: (newComments: CommentsPayload[] | null) => void
}

const defaultContextData: ContextData = {
    facebookAccounts: null,
    facebookPages: null,
    comments: null,
    error: null,
    updateComments: () => {}
};

type FacebookProviderProps = {
    children: ReactNode;
};

const context = createContext<ContextData>(defaultContextData)

export default function FacebookProvider({ children }: FacebookProviderProps) {
    const [accounts, setAccounts] = useState<FacebookProfileComplete[] | null>(null)
    const [facebookPages, setFacebookPages] = useState<FacebookPagesPayload[] | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [comments, setComments] = useState<CommentsPayload[] | null>(null)

    const updateComments = (newComments: CommentsPayload[] | null) => {
        setComments((prevComments) => {
            // Se não houver comentários antigos, retorna apenas os novos
            if (!prevComments) {
                return newComments;
            }

            if(newComments) {
                return [...prevComments, ...newComments];
            }else{
                return prevComments
            }
            
        });
    };

    const getAccounts = async () => {
        try {
            const list  = await getAllFacebookAccounts()
            setAccounts(list)

            const facePages = await getFacebookPagesList()

            facePages && setFacebookPages(facePages)

            const commentsList = await getComments()

            commentsList && setComments(commentsList)
        } catch (error: any) {
            setError(error.message);
        }
    }

    useEffect(() => {
        getAccounts()
    }, [])

    const defaultContextData: ContextData = {
        facebookAccounts: accounts,
        comments,
        facebookPages,
        error,
        updateComments
    };

    return (
        <context.Provider value={defaultContextData} >
            {children}
        </context.Provider>
    )
}

export function useFaceInfos() {
    return useContext(context);
}

export function useUpdateComments() {
    const { updateComments } = useContext(context);
    return updateComments;
}