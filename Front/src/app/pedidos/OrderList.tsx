'use client'

import { PlanilhasDTO } from "@/@types/types";
import { OrderResumeItem } from "./OrderItem";

interface ResumeProps {
    resume: PlanilhasDTO[]
    onClickResume: (data: PlanilhasDTO) => void
}

export function OrderResumeList({ resume, onClickResume }: ResumeProps) {


    return (
        <table className="w-full table-auto text-xs">
            <thead className="text-slate-500 dark:text-slate-400 border-t border-b border-slate-200 uppercase font-[0.75rem] bg-grayLight-200">
            <tr>
                <th className="pl-4 pr-2 py-3 text-left">
                    <span>
                        Numero do pedido
                    </span>
                </th>

                <th className="pl-4 pr-2 py-3 text-left">
                    <span>
                        Data
                    </span>
                </th>

                <th className="px-2 py-3 text-left">
                    <span>
                        Nome do status
                    </span>
                </th>

                <th className="px-2 py-3 text-left">
                    <span>
                        Alias do Produto
                    </span>
                </th>

                <th className="px-2 py-3 text-left">
                    <span>
                        Nome Completo
                    </span>
                </th>


                <th className="px-2 py-3 text-left">
                    <span>
                        Código do produto
                    </span>
                </th>
            </tr>
            </thead>

            {resume.map((r, k) => (<OrderResumeItem onClickResume={onClickResume} dados={r} key={k} />))}
            
        </table>
    )
}