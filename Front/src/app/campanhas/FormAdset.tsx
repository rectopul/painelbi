import { AudiencePayload, AudienceValuesTypes, BevahiorsProps, CreateAdSetDto } from "@/components/Types"
import { SubmitHandler, useController, useForm } from "react-hook-form"
import InputMask from 'react-input-mask';
import { DateTimePicker, LocalizationProvider, StaticDateTimePicker, renderTimeViewClock } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { maskToCurrency } from "./currencyMask";
import { NumericFormat } from 'react-number-format';
import { searchTerms } from "@/components/Api/Campaigns";
import { useState } from "react";
import { TargetOptionsAdset } from "./AdsetTargetingOptions";
import { CheckCircle2 } from "lucide-react";

interface AdsetProps {
    campaign_id: string | number
}

const bilingEvents: string[] = [
    'APP_INSTALLS',
    'CLICKS',
    'IMPRESSIONS',
    'LINK_CLICKS',
    'NONE',
    'OFFER_CLAIMS',
    'PAGE_LIKES',
    'POST_ENGAGEMENT',
    'THRUPLAY',
    'PURCHASE',
    'LISTING_INTERACTION'
]

const bidStrategy: string[] = [
    'LOWEST_COST_WITHOUT_CAP',
    'LOWEST_COST_WITH_BID_CAP',
    'COST_CAP'
]


export function FormAdset({ campaign_id }: AdsetProps) {
    const { register, handleSubmit, watch, formState: { errors }, getValues, control, setValue } = useForm<CreateAdSetDto>()
    const [selectTerms, setSelectTerms] = useState<AudienceValuesTypes[]>([])
    const [interest, setInterest] = useState<AudiencePayload | null>(null)
    const [targeTingsOpen, setTargetingsOpen] = useState<boolean>(false)

    const onSubmit: SubmitHandler<CreateAdSetDto> = (data) => console.log(`data do formulário`, data)
    const gotoNextStep = () => setTargetingsOpen(true)

    const onChangeStartDate = (data: string) => setValue('start_time', data)
    const onChangeEndDate = (data: string) => setValue('end_time', data)

    const handleCloseSelecTargeting = (data: AudienceValuesTypes[]) => {
        setTargetingsOpen(false)
        setSelectTerms(data)
    }


    return (
        <>
            {targeTingsOpen && (
                <TargetOptionsAdset 
                    onCompleteSelect={(data) => handleCloseSelecTargeting(data.data.terms)}
                    onShow={true} 
                    onChangeStartDate={onChangeStartDate} 
                    onChangeEndDate={onChangeEndDate}
                    onSelectTerms={setSelectTerms}
                />
            )}
            <div 
                data-step={targeTingsOpen}
                className="w-full data-[step=true]:hidden data-[step=true]:opacity-0 transition-all opacity-100 md:max-w-[600px] mx-auto fixed top-20 left-[50%] shadow py-8 px-4 translate-x-[-50%] rounded-lg bg-white border-slate-200 flex flex-col"
            >
                <h1 className="text-xl font-medium text-slate-800 pb-3 border-b border-slate-200">Criar Conjunto de anúncios</h1>

                <div className="w-full mt-5 flex flex-col">
                    <form 
                        className="flex flex-col"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <input type="hidden" {...register('campaign_id', {required: true})} value={campaign_id} />
                        <input type="hidden" {...register('targeting', {required: true})} />
                        <span className="flex flex-col">
                            <label htmlFor="name" className="text-sm font-medium text-slate-800">Nome do conjunto de anúncios</label>
                            <input 
                                id="name"
                                type="text" 
                                data-error={errors.name ? true : false}
                                className="px-3 py-2 data-[error=true]:border-red-400 outline-none rounded border-slate-200 border leading-5" 
                                {...register('name')}
                            />
                        </span>

                        <span className="flex flex-col my-3">
                            <label htmlFor="daily_budget" className="text-sm font-medium text-slate-800">Orçamento diário</label>

                            
                            <InputMask 
                                id="daily_budget"
                                mask="R$ 9999999999"
                                alwaysShowMask={false}
                                beforeMaskedStateChange={maskToCurrency}
                                maskChar={null}
                                data-error={errors.daily_budget ? true : false}
                                className="px-3 py-2 data-[error=true]:border-red-400 outline-none rounded border-slate-200 border leading-5"
                                {...register('daily_budget')}
                            />
                        </span>

                        <span className="flex flex-col py-3">
                            <label htmlFor="billing_event" className="text-sm font-medium text-slate-800">Estratégia de faturamento</label>
                            <select 
                                id="bid_strategy"
                                className="px-3 py-2 data-[error=true]:border-red-400 outline-none rounded border-slate-200 border leading-5"
                                {...register('bid_strategy')}
                            >
                                {bidStrategy.map((o, k) => (
                                    <option value={o} key={k}>{o}</option>
                                ))}
                            </select>
                        </span>

                        <span className="flex flex-col py-3">
                            <label htmlFor="billing_event" className="text-sm font-medium text-slate-800">Evento de faturamento</label>
                            <select 
                                id="billing_event"
                                className="px-3 py-2 data-[error=true]:border-red-400 outline-none rounded border-slate-200 border leading-5"
                                {...register('billing_event')}
                            >
                                {bilingEvents.map((o, k) => (
                                    <option value={o} key={k}>{o}</option>
                                ))}
                            </select>
                        </span>

                        <div className="flex w-full">
                            <button 
                                data-complete={selectTerms.length ? true : false}
                                onClick={gotoNextStep}
                                className="bg-indigo-600 data-[complete=true]:bg-green-500 text-sm font-medium hover:bg-indigo-500 text-white text-center my-2 leading-5 px-4 py-2 rounded flex items-center justify-center"
                            >
                                {selectTerms.length ? (
                                    <>
                                        <CheckCircle2 className="mr-1" size={16} /> Targets Selecionados
                                    </>
                                ): 
                                (
                                    <span>Configurações de target</span>
                                )}
                            </button>
                        </div>

                        {errors.campaign_id &&
                        errors.daily_budget &&
                        errors.end_time &&
                        errors.start_time &&
                        errors.targeting && (
                            <span className="bg-red-400 text-white text-sm font-medium text-center leading-5 py-2 px-3">
                                {`Existem campos não preenchidos que são obrigatórios`}
                            </span>
                        )}
                        
                        <div className="flex justify-center my-2 pt-6 border-t border-slate-200">
                            <button className="py-2 px-3 my-3 mx-auto min-w-[200px] justify-center hover:bg-indigo-600 items-center bg-indigo-500 text-white font-medium rounded text-sm text-center leading-5 flex">
                                Criar Conjunto de anúncios
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}