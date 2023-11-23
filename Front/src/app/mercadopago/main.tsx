'use client'

import { Search } from "lucide-react";
import { MpPaymentsList } from "./OrderList";
import { useState } from "react";
import { DatePicker } from "@/components/DatePicker";

export function MPMain() {
    const [dateFilter, setDateFilter] = useState<Date[] | null>(null)
    

    return (
        <>
            <div className="w-full mt-10 md:w-[calc(100%-350px)] mx-auto md:ml-auto md:mx-0 px-2 md:mt-40 xl:md-20 2xl:mt-20 flex flex-col justify-between">
                <div className="w-full mt-10 mx-auto md:ml-auto md:mx-0 md:mt-10 2xl:mt-0 flex flex-col">
                    <header className="w-full mx-auto py-4 flex items-center justify-between">
                        <h1 className="text-2xl font-medium text-slate-800">Informações Do Mercado Pago</h1>

                        <div className="flex">
                            <div className="w-full max-w-[245px] border border-slate-200 py-1 px-2 rounded bg-white items-center flex h-[38px]">
                                <button className="flex items-center justify-center text-slate-400"><Search size={16} strokeWidth={3} /></button>
                                <input type="text" placeholder="Procurar..." className="ml-1 text-sm font-medium h-full outline-0" />
                            </div>
                        </div>
                    </header>
                </div>

                <DatePicker onChange={(date) => setDateFilter(date)} />
            </div>

            <MpPaymentsList selectDate={dateFilter} />
        </>
    )
}