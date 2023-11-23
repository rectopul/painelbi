import { searchTerms } from "@/components/Api/Campaigns";
import { AudiencePayload, AudienceValuesTypes } from "@/components/Types";
import { DateTimePicker, LocalizationProvider, renderTimeViewClock } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DemoContainer } from "@mui/x-date-pickers/internals/demo"
import { useState } from "react";

interface CompleteOptionsTarget {
    data: {
        terms: AudienceValuesTypes[]
    }
}

interface OptionsTargetProps {
    onShow: boolean
    onChangeStartDate: (data: string) => void
    onChangeEndDate: (data: string) => void
    onSelectTerms: (data: AudienceValuesTypes[]) => void
    onCompleteSelect: (data: CompleteOptionsTarget) => void
}

export function TargetOptionsAdset({ onShow, onChangeStartDate, onChangeEndDate, onSelectTerms, onCompleteSelect }: OptionsTargetProps) {
    const [interest, setInterest] = useState<AudiencePayload | null>(null)
    const [selectTerms, setSelectTerms] = useState<AudienceValuesTypes[]>([])


    const handleCompleteSelect = () => { 
        onCompleteSelect({
            data: {
                terms: selectTerms
            }
        })
    }

    const handleSearchTerms = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        try {
            e.preventDefault()

            const { value } = e.currentTarget

            if(value.length > 3) {
                const terms = await searchTerms(value)
                setInterest(terms)
            }

            if(value.length < 3) {
                setInterest(null)
            }
        } catch (error) {
            console.log(`erro ao buscar termos`, error)
        }
        
    };

    const handleChangeStartDate = (date: Date | null) => { 
        if (date) {
            const isoDate = date.toISOString();
            onChangeStartDate(isoDate)
        }
    }

    const handleChangeEndDate = (date: Date | null) => { 
        if (date) {
            const isoDate = date.toISOString();
            onChangeEndDate(isoDate)
        }
    }

    const handleSelectTerms = (data: AudienceValuesTypes) => {
        setSelectTerms([data, ...selectTerms])
        onSelectTerms(selectTerms)
        setInterest(null)
    }

    return (
        <div 
            data-show={onShow}
            className="w-full data-[show=true]:flex data-[show=true]:opacity-100 transition-all opacity-0 md:max-w-[600px] mx-auto fixed top-20 left-[50%] shadow py-8 px-4 translate-x-[-50%] rounded-lg bg-white border-slate-200 hidden flex-col"
        >
            <h1 className="text-xl font-medium text-slate-800 pb-3 border-b border-slate-200">Opções de target</h1>

            <div className="w-full flex flex-col">
                <span className="flex flex-col">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateTimePicker']}>
                            <DateTimePicker 
                                label="Selecione a data de início"
                                ampm={false}
                                onChange={handleChangeStartDate}
                                viewRenderers={
                                    {
                                        hours: renderTimeViewClock,
                                        minutes: renderTimeViewClock,
                                        seconds: renderTimeViewClock
                                    }
                                }
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </span>

                <span className="flex flex-col mt-3">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateTimePicker']}>
                            <DateTimePicker 
                                label="Selecione a data de término"
                                ampm={false}
                                onChange={handleChangeEndDate}
                                viewRenderers={
                                    {
                                        hours: renderTimeViewClock,
                                        minutes: renderTimeViewClock,
                                        seconds: renderTimeViewClock
                                    }
                                }
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </span>

                <span className="flex flex-col mt-3 relative">
                    <label htmlFor="" className="text-sm font-medium text-slate-800">Selecione os targets</label>
                    <input 
                        type="text" 
                        placeholder="digite os termos a serem buscados" 
                        className="px-3 py-2 data-[error=true]:border-red-400 outline-none rounded border-slate-200 border leading-5"
                        onKeyUp={handleSearchTerms}
                    />
                    {interest && (
                        <div className="w-full bg-white shadow border border-slate-200 absolute p-3 top-16 left-0 flex flex-col">
                            <h2 className="text-sm text-slate-800 font-medium">Lista de targets</h2>

                            <div className="flex flex-col max-h-[150px] overflow-y-auto">
                                {interest.data.map((i, k) => (
                                    <span 
                                        onClick={() => handleSelectTerms(i)}
                                        className="py-2 border-b border-slate-200 flex hover:bg-slate-500 hover:text-white p-2 rounded cursor-pointer" 
                                        key={k}
                                    >
                                        <span className="bg-slate-400 text-white text-xs p-2 rounded flex">
                                            <b className="mr-1">Nome:</b> {i.name} <b className="mx-1">MAX: </b>{i.audience_size_upper_bound}
                                            <b className="mx-1">MIN: </b>{i.audience_size_lower_bound}
                                        </span>
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </span>
            </div>

            {selectTerms && (
                <div className="w-full flex flex-col my-3 rounded">
                    <h1 className="text-sm font-medium text-slate-800">Targets selecionados</h1>

                    <div className="flex flex-wrap items-center p-2 border border-slate-200">
                        {selectTerms.map((t, k) => (
                            <span className="p-2 bg-slate-500 text-white text-xs mr-1 mb-1 rounded" key={k}>{t.name}</span>
                        ))}
                    </div>
                </div>
            )}

            <span className="flex justify-center">
                <button 
                    onClick={handleCompleteSelect}
                    className="text-sm text-white bg-indigo-600 px-4 py-2 rounded leading-5 text-center font-medium"
                >
                    Concluir
                </button>
            </span>
        </div>
    )
}