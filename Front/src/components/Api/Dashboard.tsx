'use client'

import { DashboardPayload } from "../Types"
import { getTokenToLocalStorage } from "./Login"

const getDash = async (): Promise<DashboardPayload> => {
    try {
        const token = getTokenToLocalStorage()
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
        const req = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/admin/dashboard`, options)

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

export { getDash }