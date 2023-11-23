'use client'

import { FacebookProfileComplete } from "@/@types/types";
import { getAllFacebookAccounts } from "@/components/Api/FacebookAccounts";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

interface ContextData {
    facebookAccounts: FacebookProfileComplete[] | null
    error: string | null
}

const defaultContextData: ContextData = {
    facebookAccounts: null,
    error: null
};

type FacebookProviderProps = {
    children: ReactNode;
};

const context = createContext<ContextData>(defaultContextData)

export default function FacebookProvider({ children }: FacebookProviderProps) {
    const [accounts, setAccounts] = useState<FacebookProfileComplete[] | null>(null)
    const [error, setError] = useState<string | null>(null)

    const getAccounts = async () => {
        try {
            const list  = await getAllFacebookAccounts()

            setAccounts(list)
        } catch (error: any) {
            setError(error.message);
        }
    }

    useEffect(() => {
        getAccounts()
    }, [])

    const defaultContextData: ContextData = {
        facebookAccounts: accounts,
        error
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