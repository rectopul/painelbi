import { AdAccountsStatusDTO, BusinessReturnDTO } from "@/@types/types"
import { updateFacebookAdAccounts } from "@/components/Api/FacebookAccounts"
import { Alert } from "evergreen-ui"
import { Check, Plus } from "lucide-react"
import React, { useState } from "react"
import { useForm } from "react-hook-form"

interface BusinessFormsProps {
    adAccounts: AdAccountsStatusDTO[]
    onBusinessOpen: (data: boolean) => void
}


export function FormAdAccountsUpdate({ adAccounts, onBusinessOpen }: BusinessFormsProps) {
    const { register, formState: { errors }, getValues } = useForm<AdAccountsStatusDTO>()
    const [adUpdated, setAdUpdated] = useState<AdAccountsStatusDTO[]>(adAccounts)
    const [hasError, setHasError] = useState<string | null>(null)
    const [showBusiness, setShowBusiness] = useState<boolean>(false)

    const handleAdAccountUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            e.preventDefault()
            const value = e.currentTarget.closest('span')?.querySelector('input')?.value
            const id = e.currentTarget.dataset.id

            if(id) {

                const data = {
                    id: parseFloat(id),
                    unic_code: value
                }
                console.log(`data a ser atualizada: `, { data, id })
                const adAccount = await updateFacebookAdAccounts(parseFloat(id), data)

                const newValues = adUpdated.filter(e => e.id !== adAccount.id)
                
                if(!newValues.length) {
                    setShowBusiness(true)
                    onBusinessOpen(false)
                }

                adAccount.name && setAdUpdated(newValues)
                console.log(`dados retornados`, adAccount)
            }

        } catch (error) {
            if (error instanceof Error) {
                setHasError(error.message);

                setTimeout(() => {
                    setHasError(null);
                }, 5000);
            } else {
                // Tratar o erro de outra forma
                console.log(error)
            }
            
        }
    }

    return (
        <>
            {hasError && (
                <div className="w-full max-w-[600px] shadow fixed bottom-2 left-[50%] translate-x-[-50%] z-50">
                    <Alert 
                        intent="warning"
                        title="Erro ao atualizar ad account!"
                    >
                        {hasError}
                    </Alert>
                </div>
            )}
            <div 
                data-complete={showBusiness}
                className="w-full md:max-w-[500px] data-[complete=true]:hidden fixed top-[20%] left-[50%] translate-x-[-50%] bg-white border border-slate-200 rounded shadow"
            >
                <form className="flex flex-col w-full p-4">
                    <h1 className="text-xl text-slate-800 font-medium mb-4">Informe os códigos únicos dos Accounts IDS</h1>

                    {adUpdated.map((b, k) => (
                        <div key={k} className="flex flex-col my-1 py-1 border-b border-slate-200">
                            <span className="mb-1 flex flex-col">
                                <label htmlFor="unic_code" className="text-start text-sm">{b.name}</label>
                                <input type="hidden" {...register('id')} value={b.id} />
                            </span>
                            <span className="my-1 flex">
                                <input 
                                    id="unic_code"
                                    data-error={errors.unic_code ? true : false}
                                    {...register('unic_code', { required: true })}
                                    className="px-3 py-2 data-[error=true]:border-red-400 flex-1 outline-none rounded border-slate-200 border leading-5"
                                />
                                <button 
                                onClick={handleAdAccountUpdate}
                                data-complete={b.unic_code ? true : false}
                                data-id={b.id}
                                className="leading-5 bg-indigo-600 ml-2 data-[complete=true]:bg-green-500 flex justify-center items-center hover:bg-indigo-500 text-white rounded text-sm font-medium text-center px-4 py-2">
                                    {b.unic_code  ? (
                                        <>
                                            <Check className="mr-1 opacity-70" size={17} /> Completo
                                        </>
                                    ) : (
                                        <>
                                            <Plus className="mr-1 opacity-70" size={17} />Adicionar
                                        </>
                                    )}
                                    
                                </button>
                            </span>
                        </div>
                    ))}
                </form>
            </div>
        </>
    )
}