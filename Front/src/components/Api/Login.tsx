'use client'

import { LoginProps, TokenDTO } from "../Types"

const backURL = `http://localhost:3000`

const setTokenInLocalStorage = (token: string) => {
  localStorage.setItem('accessToken', token);
}

const removeTokenFromLocalStorage = () =>  {
    localStorage.removeItem('accessToken');
}

const isTokenInLocalStorage = () => {
    const token = localStorage.getItem('accessToken');
    return token !== null; // Retorna true se o token existe, caso contrário, retorna false.
}

const getTokenToLocalStorage = () => {
    const token = localStorage.getItem('accessToken');
    return token
}
  
const handleLogin = async ({ data }: LoginProps): Promise<TokenDTO> => {
    try {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        const req = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/session`, options)

        const res = await req.json()

        if (!req.ok) {
            const errorMessage = res.message || 'Erro desconhecido'; // Mensagem de erro padrão, caso não haja mensagem no objeto de resposta.
            const error = new Error(errorMessage); // Crie uma instância de Error com a mensagem de erro.
            throw error; // Lance a instância de Error.
        }

        return res
    } catch (error) {
        throw error
    }
}

export { handleLogin, setTokenInLocalStorage, removeTokenFromLocalStorage, isTokenInLocalStorage, getTokenToLocalStorage }