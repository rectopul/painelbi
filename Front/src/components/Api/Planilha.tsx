import { PlanilhasDTO } from "@/@types/types"
import { FilterOptionsProps } from "../Types"

const getPlanilhaResume = async (): Promise<PlanilhasDTO[]> => {
    try {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const req = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/planilha`, options)

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


const filterOrders = async ({ filter }: FilterOptionsProps): Promise<PlanilhasDTO[]> => {
    try {

        const url = new URL(`${process.env.NEXT_PUBLIC_BACK_URL}/planilha`)

        if(filter.date) url.searchParams.append('date', filter.date)
        if(filter.nome_status) url.searchParams.append('status', filter.nome_status)
        if(filter.numero_pedido) url.searchParams.append('numero_pedido', filter.numero_pedido)
        if(filter.product_code) url.searchParams.append('product_code', filter.product_code)

        const req = await fetch(url)

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

export { getPlanilhaResume, filterOrders }