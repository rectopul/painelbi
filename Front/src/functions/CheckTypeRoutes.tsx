'use client'

import { useEffect, useState } from "react";

const useCheckIsAuthenticated  = () => {
    const [token, setToken] = useState<string>()

    useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            const gettoken = localStorage.getItem('accessToken');
            gettoken && setToken(gettoken)
        }
    }, [])
    
    

    return !!token
}

export { useCheckIsAuthenticated  }
