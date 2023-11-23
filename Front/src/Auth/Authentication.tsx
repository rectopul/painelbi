'use client'

import { getDash } from "@/components/Api/Dashboard"
import { APP_ROUTES } from "@/constants/app-routes"
import { useRouter } from "next/navigation"
import { ReactNode, useCallback, useEffect, useState } from "react"


interface AuthenticatedProps {
    children: ReactNode
}

export function Authenticated({children}: AuthenticatedProps) {
    const { push } = useRouter()
    const [isValidToken, setIsValidToken] = useState<boolean>(false) 

    const checkToken = useCallback(async () => {
        try {
          const dash = await getDash();
          dash && setIsValidToken(true);
        } catch (error) {
          push(APP_ROUTES.public.login);
        }
    }, [push]);

    useEffect(() => {
        checkToken()
    }, [checkToken])

    return (
        <>
            {!isValidToken && null}
            {isValidToken && children}
        </>
    )
}