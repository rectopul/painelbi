'use client'

import { CampaignPayload } from "../Types"

interface CardCapaignProps {
    campanha: CampaignPayload
}
 
export function CardCampaign({ campanha }: CardCapaignProps) {
    const values = campanha.data.map(v => parseFloat(v.spend))
    const some = values.reduce((a, c) => a + c, 0)

    const valorFormatado = some.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })

    return (
        <div className="w-4/12 p-1">
            <div className="w-full p-3 bg-indigo-500 shadow rounded-lg flex-col">
                <h1 className="text-white font-semibold text-lg">Resumo de campanhas:</h1>

                <div className="w-full text-white flex flex-col text-xs">
                    <span className="my-1">Quantidade de campanhas: {values.length}</span>
                    <span className="my-1">Valor total de campanhas: {valorFormatado}</span>
                </div>
            </div>
        </div>
    )
}