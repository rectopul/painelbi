'use client'

import { ProjectMain, TaskListMain } from "@/@types/asana"
import { ChargeBack, MercadoPagoMain, MercadoPagoToken } from "@/@types/mercadopago"
import { ErrorType } from "@/@types/types"


const generateToken = async (): Promise<MercadoPagoToken> => {
    try {
        //NEXT_PUBLIC_ASANA_TOKEN
        const url = new URL(`https://api.mercadopago.com/oauth/token`)

        url.searchParams.append('grant_type', 'client_credentials')
        url.searchParams.append('client_id', `${process.env.NEXT_PUBLIC_MP_CLIENT_ID}`)
        url.searchParams.append('client_secret', `${process.env.NEXT_PUBLIC_MP_CLIENT_SECRET}`)

        const options = {
            method: 'POST',
        }
        const req = await fetch(url, options)

        if(!req.ok) {
            const dataError: ErrorType = await req.json()

            throw new Error(dataError.message)
        }

        const res: MercadoPagoToken = await req.json()

        return res
    } catch (error) {
        throw error
    }
}



const getPayments = async (): Promise<MercadoPagoMain> => {
    try {
        const token = await generateToken()
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token.access_token}`,
            }
        }
        const req = await fetch(`https://api.mercadopago.com/v1/payments/search`, options)

        if(!req.ok) {
            const dataError: ErrorType = await req.json()

            throw new Error(dataError.message)
        }

        const res: MercadoPagoMain = await req.json()

        return res
    } catch (error) {
        throw error
    }
}

const getChargeBacks = async (payment_id: number): Promise<ChargeBack[]> => {
    try {
        const token = await generateToken()
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token.access_token}`,
            }
        }
        const req = await fetch(`https://api.mercadopago.com/v1/payments/${payment_id}/refunds`, options)

        if(!req.ok) {
            const dataError: ErrorType = await req.json()

            throw new Error(dataError.message)
        }

        const res: ChargeBack[] = await req.json()

        return res
    } catch (error) {
        throw error
    }
}

const getChargeBacksList = async (): Promise<ChargeBack[]> => {
    try {
        const paymentList = await getPayments();

        if (paymentList.results.length) {
            const chargeBackList: Promise<ChargeBack[]>[] = paymentList.results.map(async (c) => {
                const chargeBack = await getChargeBacks(c.id);
                return chargeBack || []; // Retorne uma matriz vazia se não houver chargeback
            });

            const lista = await Promise.all(chargeBackList);

            return lista.flat(); // Use .flat() para "achatar" a matriz de matrizes em uma única matriz
        }

        return []; // Retorna uma matriz vazia se não houver resultados
    } catch (error) {
        throw error;
    }
};

export { getPayments, getChargeBacks, getChargeBacksList }