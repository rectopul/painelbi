import { FacebookAccountsPayloadDTO } from "@/@types/types"
import { createFacebookAccounts } from "@/components/Api/FacebookAccounts"
import { FacebookCreatePayloadDTO } from "@/components/Types"
import { Plus, X } from "lucide-react"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { FormBusinessUpdate } from "./FormsReturn/FormBusiness"
import { FormAdAccountsUpdate } from "./FormsReturn/FormAdAccounts"
import { Alert } from "evergreen-ui"

interface FormFaceCreateProps {
    onOpen: boolean
    onCloseForm: (data: boolean) => void
}

export function FaceFormCreate({ onCloseForm, onOpen}: FormFaceCreateProps) {
    const { register, formState: { errors }, handleSubmit } = useForm<FacebookCreatePayloadDTO>()
    const [faceAccounts, setFaceAccounts] = useState<FacebookAccountsPayloadDTO | null>(null)
    const [hasError, setHasError] = useState<string | null>(null)
    
    const handleCloseForm = () => onCloseForm(false)

    const onSubmit: SubmitHandler<FacebookCreatePayloadDTO> = async (data) => {
        try {
            const accounts = await createFacebookAccounts(data)
            setFaceAccounts(accounts)
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
            console.log(`erro ao cadastrar conta do facebook`, error)
        }
    }

    return (
        <>
        {hasError && (
            <div className="w-full max-w-[600px] shadow fixed bottom-2 left-[50%] translate-x-[-50%] z-50">
                <Alert 
                    intent="warning"
                    title="Erro ao adicionar conta do facebook!"
                >
                    {hasError}
                </Alert>
            </div>
        )}
        {faceAccounts ? (<FormAdAccountsUpdate onBusinessOpen={onCloseForm} adAccounts={faceAccounts.AdAccount} />) : (
            <div 
                data-open={onOpen}
                className="w-full data-[open=false]:hidden md:max-w-[500px] fixed top-40 left-[50%] translate-x-[-50%] bg-white border border-slate-200 rounded shadow"
            >
                <button 
                    onClick={handleCloseForm}
                    className="w-5 flex justify-center items-center hover:bg-red-300 cursor-pointer h-5 bg-red-500 text-white absolute right-5 top-5 rounded border border-red-600"
                >
                    <X />
                </button>
                <form 
                    onSubmit={handleSubmit(onSubmit)}
                    className="m-4 flex flex-col text-sm font-medium text-slate-800"
                >
                    <h1 className="text-lg pb-2 border-b border-slate-200 mb-4">Adicionar conta do facebook</h1>

                    <span className="flex flex-col my-2 w-full">
                        <label htmlFor="token" className="text-start mb-2">Token</label>
                        <input 
                            id="token"
                            data-error={errors.token ? true : false}
                            {...register('token', { required: true, validate: (value) => value.length >= 150 })}
                            className="px-3 py-2 data-[error=true]:border-red-400 outline-none rounded border-slate-200 border leading-5"
                        />
                        {errors.token && (
                            <span className="leading-5 p-1 rounded bg-red-400 text-xs text-center text-white mt-2">
                                O token é obrigatório e deve ter no mínimo 150 caracteres
                            </span>
                        )}
                    </span>

                    <span className="flex flex-col my-2 w-full">
                        <label htmlFor="unic_code" className="text-start mb-2">Código Único</label>
                        <input 
                            id="unic_code"
                            data-error={errors.unic_code ? true : false}
                            {...register('unic_code', { pattern: /^[0-9]+$/, required: true})}
                            className="px-3 py-2 data-[error=true]:border-red-400 outline-none rounded border-slate-200 border leading-5"
                        />
                        {errors.unic_code && (
                            <span className="leading-5 p-1 rounded bg-red-400 text-xs text-center text-white mt-2">
                                O Código Único é obrigatório e deve conter somente números
                            </span>
                        )}
                    </span>

                    <span className="flex my-2 w-full justify-center">
                        <button className="leading-5 bg-indigo-600 flex justify-center items-center hover:bg-indigo-500 text-white rounded text-sm font-medium text-center px-4 py-2">
                            <Plus className="mr-1 opacity-70" size={17} />Adicionar conta
                        </button>
                    </span>
                </form>
            </div>
        )}
        </>
    )
}