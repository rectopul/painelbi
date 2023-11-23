'use client'

import { PlanilhasDTO } from "@/@types/types"
import { filterOrders, getPlanilhaResume } from "@/components/Api/Planilha"
import { ChangeEvent, useCallback, useEffect, useState } from "react"
import { OrderDetail } from "./OrderDetail"
import { OrderResumeItem } from "./OrderItem"
import { OrderResumeList } from "./OrderList"
import { useForm } from "react-hook-form"
import { FiltersDatas } from "@/functions/FilterDates"

interface StatusPropos {
    status: string
}

function someValues(dados: PlanilhasDTO[]) {
    // Passo 1: Converter os valores de valor_c_desconto em números
    const valoresNumericos = dados.map(item => parseFloat(item.valor_c_desconto.replace('R$', '').replace(',', '.')));

    // Passo 2: Somar os valores
    const somaValores = valoresNumericos.reduce((acc, valor) => acc + valor, 0);

    // Passo 3: Formatar o resultado em formato de Real brasileiro
    const valorFormatado = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(somaValores);

    return valorFormatado
}

export function MainPedidos() {
    const [resume, setResume] = useState<PlanilhasDTO[]>()
    const [dados, setDados] = useState<PlanilhasDTO | null>(null)
    const [resumeOpen, setResumeOpen] = useState<boolean>(false)
    const { register, getValues } = useForm<StatusPropos>()

    const handleOpenResume = (dados: PlanilhasDTO) => {
        setResumeOpen(true)
        setDados(dados)
    }

    const getResume = useCallback(async () => {
        try {
            const res = await getPlanilhaResume()

            setResume(res)
        } catch (error) {
            console.log(error)
        }
    }, [setResume])

    const handleFilterOrder = async (e: ChangeEvent<HTMLSelectElement>) => {
        try {
            const status = e.currentTarget.value
            const filter = await filterOrders({filter: { nome_status: status }})
            setResume(filter)

        } catch (error) {
            console.log(`erro ao filtrar pedidos`, error)
        }
    }

    useEffect(() => {
        !resume && getResume()
    }, [getResume, resume])

    return (
        <>
            {resume?.length && (
                <div className="w-full mt-60 md:w-[1200px] mx-auto flex justify-between items-center">
                    <div className="p-2">
                        <div className="bg-gradient-to-t from-green-600 to-green-500 px-4 py-3 text-sm font-medium text-white rounded-lg flex flex-col">
                            <h1 className="text-lg uppercase">Último dia</h1>

                            <div className="mt-2 flex">
                                <b>Quantidade: </b> <span className="ml-1">{`${FiltersDatas(resume).dataDiaAtual.length}`}</span>
                                <b className="ml-2">Total: </b> <span className="ml-1">{`${FiltersDatas(resume).dataDiaAtual.length == 0 ? `R$ 0` : someValues(FiltersDatas(resume).dataDiaAtual)}`}</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-2">
                        <div className="bg-gradient-to-t from-green-600 to-green-500 px-4 py-3 text-sm font-medium text-white rounded-lg flex flex-col">
                            <h1 className="text-lg uppercase">Últimos 7 Dias</h1>

                            <div className="mt-2 flex">
                                <b>Quantidade: </b> <span className="ml-1">{`${FiltersDatas(resume).dataUltimos7Dias.length}`}</span>
                                <b className="ml-2">Total: </b> <span className="ml-1">{`${FiltersDatas(resume).dataUltimos7Dias.length == 0 ? `R$ 0` : someValues(FiltersDatas(resume).dataUltimos7Dias)}`}</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-2">
                        <div className="bg-gradient-to-t from-green-600 to-green-500 px-4 py-3 text-sm font-medium text-white rounded-lg flex flex-col">
                            <h1 className="text-lg uppercase">Últimos 30 Dias</h1>

                            <div className="mt-2 flex">
                                <b>Quantidade: </b> <span className="ml-1">{`${FiltersDatas(resume).dataUltimos30Dias.length}`}</span>
                                <b className="ml-2">Total: </b> <span className="ml-1">{`${FiltersDatas(resume).dataUltimos30Dias.length == 0 ? `R$ 0` : someValues(FiltersDatas(resume).dataUltimos30Dias)}`}</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-2">
                        <div className="bg-gradient-to-t from-green-600 to-green-500 px-4 py-3 text-sm font-medium text-white rounded-lg flex flex-col">
                            <h1 className="text-lg uppercase">Último Ano</h1>

                            <div className="mt-2 flex">
                                <b>Quantidade: </b> <span className="ml-1">{`${FiltersDatas(resume).dataAnoAtual.length}`}</span>
                                <b className="ml-2">Total: </b> <span className="ml-1">{`${FiltersDatas(resume).dataAnoAtual.length == 0 ? `R$ 0` : someValues(FiltersDatas(resume).dataAnoAtual)}`}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="w-full mt-10 md:w-[1200px] mx-auto md:mt-10 bg-white border-slate-200 border">
                <header className="p-4 flex items-center justify-between">
                    <h1 className="font-semibold text-slate-700">Lista de pedidos <span className="text-gray-300">{resume?.length}</span></h1>

                    <div className="flex-1 flex justify-center mx-auto items-center text-sm text-green-500 font-medium">
                        Total: {resume && someValues(resume)}
                    </div>

                    <div className="flex items-center justify-end">
                        <label htmlFor="status" className="text-sm font-semibold text-slate-800 mr-2">Status</label>
                        <select 
                            id="status"
                            className="leading-5 px-4 py-2 rounded bg-white border border-slate-200 font-medium text-sm text-slate-800"
                            {...register('status')}
                            onChange={handleFilterOrder}
                        >
                            <option value="Aguardando Pagamento">Aguardando pagamento</option>
                            <option value="pending">Pedido Pendente</option>
                            <option value="Pedido Concluído">Pedido Concluído</option>
                            <option value="failed">Pagamento Recusado</option>
                            <option value="Carrinho Abandonado">Carrinho Abandonado</option>
                            <option value="processing">Processando</option>
                        </select>
                    </div>
                </header>
                {dados && (<OrderDetail handleCloseDetail={() => setResumeOpen(false)} open={resumeOpen} dados={dados} />)}
                {resume && (<OrderResumeList onClickResume={handleOpenResume} resume={resume} />)}
            </div>
        </>
    )
}