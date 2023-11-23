import { BusinessReturnDTO } from "@/@types/types"
import { Plus } from "lucide-react"
import { useForm } from "react-hook-form"

interface BusinessFormsProps {
    business: BusinessReturnDTO[]
}

export function FormBusinessUpdate({ business }: BusinessFormsProps) {
    const { register, formState: { errors } } = useForm<BusinessReturnDTO>()

    return (
        <div className="w-full md:max-w-[500px] fixed top-40 left-[50%] translate-x-[-50%] bg-white border border-slate-200 rounded shadow">
            <form className="flex flex-col w-full p-4">
                <h1 className="text-sm text-slate-800 font-medium">Informe os códigos únicos dos business</h1>

                {business.map((b, k) => (
                    <div key={k} className="flex flex-col">
                        <span className="my-2 flex flex-col" key={k}>
                            <label htmlFor="unic_code" className="text-start text-sm mb-2">{b.name}</label>
                        </span>
                        <span className="my-2 flex flex-col" key={k}>
                            <label htmlFor="unic_code" className="text-start text-sm mb-2">Código único</label>
                            <input 
                                id="unic_code"
                                data-error={errors.unic_code ? true : false}
                                {...register('unic_code', { required: true, validate: (value) => value.length >= 3 })}
                                className="px-3 py-2 data-[error=true]:border-red-400 outline-none rounded border-slate-200 border leading-5"
                            />
                        </span>
                    </div>
                ))}

                
                <span className="flex my-2 w-full justify-center">
                    <button className="leading-5 bg-indigo-600 flex justify-center items-center hover:bg-indigo-500 text-white rounded text-sm font-medium text-center px-4 py-2">
                        <Plus className="mr-1 opacity-70" size={17} />Adicionar conta
                    </button>
                </span>
            </form>
        </div>
    )
}