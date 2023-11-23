'use client'

import { CampaignStatusListDTO, PlanilhasDTO } from "@/@types/types"
import { filterOrders, getPlanilhaResume } from "@/components/Api/Planilha"
import { ChangeEvent, useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { FiltersDatas } from "@/functions/FilterDates"
import { FacebookList } from "./FacebookList"
import { FacebookDetail } from "./FacebookDetail"
import { FacebookIncrement } from "./Increment"
import { getCampaignsStatus } from "@/components/Api/Campaigns"
import { Facebook, LucideFacebook, Plus, Search } from "lucide-react"
import{ FaceIcon } from "../../components/Icons/Icons"
import { FaceFormCreate } from "./FormCreate"
import { useFaceInfos } from "@/providers/FacebookProvider"
import { useAsanaInfos } from "@/providers/AsanaProvider"
import { ResponseTask } from "@/@types/asana"
import { taskList } from "@/components/Api/Asana"

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

export function FacebookMain() {
    const [resume, setResume] = useState<CampaignStatusListDTO[]>()
    const [dados, setDados] = useState<PlanilhasDTO | null>(null)
    const [resumeOpen, setResumeOpen] = useState<boolean>(false)
    const [openFormCreate, setOpenFormCreate] = useState<boolean>()
    const [asanaTasks, setAsanaTasks] = useState<ResponseTask[] | null>(null)

    const { facebookAccounts } = useFaceInfos()

    const handleGetTasks = useCallback(async () => {
        try {
            const list = await taskList();
            setAsanaTasks(list);
        } catch (error) {
            console.log(`erro ao pegar tasks do asana: `, error);
        }
    }, [setAsanaTasks]);


    const getResume = async () => {
        try {
            const res = await getCampaignsStatus()

            setResume(res)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleGetTasks()
        !resume && getResume()
    }, [handleGetTasks, resume])

    return (
        <>
            {facebookAccounts && (
                <div className="w-full mt-10 md:w-[calc(100%-350px)] mx-auto md:ml-auto md:mx-0 px-2 md:mt-40 xl:md-20 2xl:mt-20 flex justify-between">
                    <div className="w-4/12 p-1">
                        <div className="w-full  px-4 py-3 bg-white border border-slate-200 shadow-lg text-sm font-medium text-slate-800 flex flex-col">
                            <span className="text-indigo-500 mb-2"><FaceIcon size={30} /></span>
                            <h1 className="text-lg font-semibold leading-6">Contas</h1>

                            <h2 className="text-sm font-semibold tracking-normal my-2 text-slate-400 uppercase">Total</h2>

                            <span className="text-2xl font-semibold text-slate-800">{facebookAccounts.length}</span>

                            <h2 className="text-xs font-semibold tracking-normal mt-2 text-white uppercase border border-green-400 bg-green-300 rounded-full self-start py-1 px-4">Ativos: 1</h2>

                            <h2 className="text-xs font-semibold tracking-normal my-1 border border-red-500 text-white uppercase bg-red-300 rounded-full self-start py-1 px-4">Bloqueados: 0</h2>
                        </div>
                    </div>

                    <div className="w-4/12 p-1">
                        <div className="w-full  px-4 py-3 bg-white border border-slate-200 shadow-lg text-sm font-medium text-slate-800 flex flex-col">
                            <span className="text-indigo-500 mb-2"><FaceIcon size={30} /></span>
                            <h1 className="text-lg font-semibold leading-6">Páginas</h1>

                            <h2 className="text-sm font-semibold tracking-normal my-2 text-slate-400 uppercase">Total</h2>

                            <span className="text-2xl font-semibold text-slate-800">2</span>

                            <h2 className="text-xs font-semibold tracking-normal mt-2 text-white uppercase border border-green-400 bg-green-300 rounded-full self-start py-1 px-4">Ativos: 1</h2>

                            <h2 className="text-xs font-semibold tracking-normal my-1 border border-red-500 text-white uppercase bg-red-300 rounded-full self-start py-1 px-4">Bloqueados: 0</h2>
                        </div>
                    </div>

                    <div className="w-4/12 p-1">
                        <div className="w-full  px-4 py-3 bg-white border border-slate-200 shadow-lg text-sm font-medium text-slate-800 flex flex-col">
                            <span className="text-indigo-500 mb-2"><FaceIcon size={30} /></span>
                            <h1 className="text-lg font-semibold leading-6">Anúncios</h1>

                            <h2 className="text-sm font-semibold tracking-normal my-2 text-slate-400 uppercase">Total</h2>

                            <span className="text-2xl font-semibold text-slate-800">4</span>

                            <h2 className="text-xs font-semibold tracking-normal mt-2 text-white uppercase border border-green-400 bg-green-300 rounded-full self-start py-1 px-4">Ativos: 1</h2>

                            <h2 className="text-xs font-semibold tracking-normal my-1 border border-red-500 text-white uppercase bg-red-300 rounded-full self-start py-1 px-4">Bloqueados: 0</h2>
                        </div>
                    </div>
                </div>
            )}

            {openFormCreate && (<FaceFormCreate onCloseForm={setOpenFormCreate} onOpen={openFormCreate} />)}

            <div className="w-full mt-10 md:w-[calc(100%-350px)] mx-auto md:ml-auto md:mx-0 px-2 md:mt-10 2xl:mt-0 flex flex-col">
                <header className="p-4 flex items-center justify-between">
                    <h1 className="text-2xl font-medium text-slate-800">Campanhas</h1>

                    <div className="flex">
                        <div className="w-full max-w-[245px] border border-slate-200 py-1 px-2 rounded bg-white items-center flex h-[38px]">
                            <button className="flex items-center justify-center text-slate-400"><Search size={16} strokeWidth={3} /></button>
                            <input type="text" placeholder="Procurar..." className="ml-1 text-sm font-medium h-full outline-0" />
                        </div>

                        <button 
                            onClick={() => setOpenFormCreate(true)}
                            className="flex ml-2 whitespace-nowrap hover:bg-indigo-400 text-sm font-medium py-1 px-3 bg-indigo-600 text-white h-[38px] items-center justify-center rounded">
                            <Plus size={20} strokeWidth={2} className="mr-1" />
                            Adicionar Conta
                        </button>
                    </div>
                </header>
                {dados && (<FacebookDetail handleCloseDetail={() => setResumeOpen(false)} open={resumeOpen} dados={dados} />)}
                <FacebookList />
            </div>
        </>
    )
}