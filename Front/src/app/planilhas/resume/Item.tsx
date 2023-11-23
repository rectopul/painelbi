import { PlanilhasDTO } from "@/@types/types"
import { ChevronDown, Copy, Eye, Trash2 } from "lucide-react"
import { useState } from "react"

interface PlanilhaResumeItemProps {
    dados: PlanilhasDTO
    onClickResume: (data: PlanilhasDTO) => void
}

export function PlanilhaResumeItem({ dados, onClickResume }:PlanilhaResumeItemProps) {
    const [open, setOpen] = useState<boolean>(false)

    const handleClickResume = () => onClickResume(dados)

    return (
        <tbody className="border-b border-slate-200 text-[0.875rem] hover:bg-grayLight-200 cursor-pointer" onClick={handleClickResume}>
            <tr>
                <td className="px-2 py-3">
                    <span className="px-2 text-indigo-400">{dados.numero_pedido}</span>
                </td>

                <td className="pl-2 pr-4 py-3">
                    <span className="px-2">{dados.data}</span>
                </td>

                <td className="pr-7 pl-2 py-3">
                    <span className="px-2">{dados.nome_status}</span>
                </td>

                <td className="px-2 py-3 font-[500] text-left">
                    <span>{dados.alias_produto}</span>
                </td>

                <td className="px-2 py-3 font-[500] text-left whitespace-nowrap">
                    <span>{dados.nome_completo}</span>
                </td>

                <td className="px-2 py-3 font-[500] text-left whitespace-nowrap">
                    <span className="flex justify-between">
                        {dados.codigo_produto}

                        <button 
                            data-open={open}
                            onClick={() => open ? setOpen(false) : setOpen(true)}
                            className="text-slate-400 ml-auto hover:text-slate-600 data-[open=true]:rotate-180"
                        >
                            <ChevronDown />
                        </button>
                    </span>
                </td>
            </tr>
            {open && (
                <tr className="px-2 py-3 w-full" role="region">
                    <td colSpan={10}>
                        <div className="bg-grayLight-200 p-4 m-3 italic flex flex-wrap">
                            <span className="p-2 bg-slate-400 m-1 text-white">
                                Data e Hora: {dados.data_hora}
                            </span>

                            <span className="p-2 bg-slate-400 m-1 text-white">
                                Status do Produto: {dados.status_produto}
                            </span>

                            <span className="p-2 bg-slate-400 m-1 text-white">
                                Valor pago com desconto: {dados.valor_c_desconto}
                            </span>

                            <span className="p-2 bg-slate-400 m-1 text-white">
                                Desconto: {dados.desconto}
                            </span>

                            <span className="p-2 bg-slate-400 m-1 text-white">
                                UTM SOURCE: {dados.utm_source}
                            </span>
                            
                            <span className="p-2 bg-slate-400 m-1 text-white">
                                UTM MEDIUM: {dados.utm_medium}
                            </span>
                            
                            <span className="p-2 bg-slate-400 m-1 text-white">
                                UTM CAMPAIGN: {dados.utm_campaign}
                            </span>

                            <span className="p-2 bg-slate-400 m-1 text-white">
                                UTM CONTENT: {dados.utm_content}
                            </span>

                            <span className="p-2 bg-slate-400 m-1 text-white">
                                UTM ID: {dados.utm_id}
                            </span>

                            <span className="p-2 bg-slate-400 m-1 text-white">
                                UTM TERM: {dados.utm_term}
                            </span>

                            <span className="p-2 bg-slate-400 m-1 text-white">
                                UTM REDE: {dados.utm_rede}
                            </span>

                            <span className="p-2 bg-slate-400 m-1 text-white">
                                E-MAIL: {dados.email}
                            </span>

                            <span className="p-2 bg-slate-400 m-1 text-white">
                                CPF: {dados.cpf}
                            </span>

                            <span className="p-2 bg-slate-400 m-1 text-white">
                                CELULAR: {dados.celular}
                            </span>

                            <span className="p-2 bg-slate-400 m-1 text-white">
                                LINK WHATSAPP: {dados.link_whatsapp}
                            </span>

                            <span className="p-2 bg-slate-400 m-1 text-white">
                                IP: {dados.ip}
                            </span>
                        </div>
                    </td>
                </tr>
            )}
        </tbody>
    )
}