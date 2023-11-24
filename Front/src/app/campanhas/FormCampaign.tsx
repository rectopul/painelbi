import { createCampaignAPI } from "@/components/Api/Campaigns";
import { CreateCampaignsDTO, CreateCampaignsPayload } from "@/components/Types"
import { Alert } from "evergreen-ui";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form"
import { FormAdset } from "./FormAdset";

const objectiveOptions: string[] = [
    'OUTCOME_LEADS',
    'OUTCOME_SALES',
    'OUTCOME_ENGAGEMENT',
    'OUTCOME_AWARENESS',
    'OUTCOME_TRAFFIC',
    'OUTCOME_APP_PROMOTION'
]

const specialAdCategory: string[] = [
    'HOUSING',
    'CREDIT',
    'EMPLOYMENT',
    'ISSUES_ELECTIONS_POLITICS',
    'NONE'
]

export function FormCampaign() {
    const { register, handleSubmit, watch, formState: { errors }, getValues } = useForm<CreateCampaignsDTO>()
    const [campaign, setCampaign] = useState<CreateCampaignsPayload | null>(null)
    const [showForm, setShowForm] = useState<boolean>(false)

    const onSubmit: SubmitHandler<CreateCampaignsDTO> = async data => {
        try {
            const campaign = await createCampaignAPI({data}) 

            setCampaign(campaign)
        } catch (error) {
           console.log(error) 
        }
    }

    return (
        <>
            {campaign && <FormAdset campaign_id={campaign.id} />}
            <div className="w-full md:w-[1200px] mx-auto md:mt-24 mt-3 flex justify-between items-center">
                <h1 className="text-xl text-slate-800 font-medium">Campanhas</h1>
                <button 
                    onClick={() => setShowForm(true)}
                    className="py-2 px-3 hover:bg-indigo-600 items-center bg-indigo-500 text-white font-medium rounded text-sm text-center leading-5 flex"
                >
                    <Plus className="mr-1 opacity-40" size={16} />
                    Criar Campanha
                </button>
            </div>

            <div className="fixed bottom-0 left-0 z-50 p-3">
                {campaign && (
                    <Alert 
                        intent="success"
                        title="Campanha criada com sucesso!"
                    >
                        {`Campanha de nome ${getValues('name')} criada com sucesso!`}
                    </Alert>
                )}
            </div>
            <div 
                data-show={showForm}
                className="w-full data-[show=true]:translate-y-0 z-50 duration-500 transition-all translate-y-[-500px] md:max-w-[700px] fixed left-[50%] top-32 translate-x-[-50%] flex flex-col bg-white rounded-lg border border-slate-200 py-5 px-4">
                <h1 className="text-sm font-semibold uppercase py-2 border-b border-slate-200">Criar campanha</h1>

                <span 
                    className="rounded bg-red-500 text-white p-2 absolute right-3 cursor-pointer hover:bg-red-400 top-3"
                    onClick={() => setShowForm(false)}
                >
                    <X size={18} strokeWidth={2} />
                </span>

                <div className="w-full">
                    <form className="flex flex-col w-full mt-10" onSubmit={handleSubmit(onSubmit)}>
                        <span className="flex flex-col">
                            <label className="text-sm font-medium text-slate-800">Nome da campanha</label>
                            <input 
                                type="text" 
                                data-error={errors.name ? true : false}
                                className="px-3 py-2 data-[error=true]:border-red-400 outline-none rounded border-slate-200 border leading-5"
                                {...register('name', {required: true})}
                            />
                        </span>

                        <span className="w-full flex items-center justify-between">
                            <span className="flex flex-col mt-4">
                                <label htmlFor="objective" className="text-sm font-medium text-slate-800">Objetivo da campanha</label>

                                <span className="relative mt-1 flex justify-center">
                                    <select 
                                        id="objective"
                                        className="text-xs text-slate-800 font-medium border border-slate-200 p-2 rounded"
                                        {...register('objective', {required: true})}
                                    >
                                        {objectiveOptions.map((o, k)=> (
                                            <option 
                                                value={o} 
                                                key={k}
                                                className="text-xs text-slate-800 font-medium"
                                            >{o}</option>
                                        ))}
                                    </select>
                                </span>
                            </span>

                            <span className="flex flex-col mx-2 mt-4">
                                <label htmlFor="special_ad_categories" className="text-sm font-medium text-slate-800">Categoria especial de campanha</label>

                                <span className="relative mt-1 flex text-center justify-center">
                                    <select 
                                        id="special_ad_categories"
                                        className="text-xs text-slate-800 font-medium border border-slate-200 p-2 rounded"
                                        {...register('special_ad_categories', {required: true})}
                                    >
                                        {specialAdCategory.map((o, k)=> (
                                            <option 
                                                value={o} 
                                                key={k}
                                                className="text-xs text-slate-800 font-medium"
                                            >{o}</option>
                                        ))}
                                    </select>
                                </span>
                            </span>

                            <span className="flex flex-col mt-4">
                                <label htmlFor="status" className="text-sm font-medium text-slate-800">Status da campanha</label>

                                <span className="relative mt-1 flex justify-center">

                                    <select 
                                        id="status"
                                        className="text-xs text-slate-800 font-medium border border-slate-200 p-2 rounded"
                                        {...register('status', {required: true})}
                                    >
                                        {['PAUSED', 'ACTIVE'].map((o, k)=> (
                                            <option 
                                                value={o} 
                                                key={k}
                                                className="text-xs text-slate-800 font-medium"
                                            >{o}</option>
                                        ))}
                                    </select>
                                </span>
                            </span>
                        </span>
                        

                        <span>
                            <button className="py-2 px-3 my-3 mx-auto min-w-[200px] justify-center hover:bg-indigo-600 items-center bg-indigo-500 text-white font-medium rounded text-sm text-center leading-5 flex">Criar Campanha</button>
                        </span>
                    </form>
                </div>
            </div>
        </>
    )
}