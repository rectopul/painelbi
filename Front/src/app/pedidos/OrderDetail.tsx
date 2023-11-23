import { PlanilhasDTO } from "@/@types/types";
import { CircleDollarSign, X } from "lucide-react";

interface DetailResumeDTO {
    dados: PlanilhasDTO
    handleCloseDetail: () => void
    open: boolean
}

export function OrderDetail({ dados, handleCloseDetail, open }: DetailResumeDTO) {

    const handleCloseResume = () => handleCloseDetail()

    return (
        <div 
            data-open={open}
            className="flex transition-all translate-x-96 data-[open=true]:translate-x-0 fixed h-full pt-28 pb-10 w-full bg-grayLight-200 md:w-[380px] right-0 top-0 z-10 p-4 flex-col border-l border-slate-200"
        >
            <span 
                className="w-10 h-10 text-slate-300 hover:text-slate-800 text-xl absolute right-6 top-28 cursor-pointer"
                onClick={handleCloseResume}
            ><X size={20} strokeWidth={2} /></span>
            <h2 className="text-base text-slate-800 text-center font-semibold">Pedido</h2>
            <i className="text-sm italic text-center text-slate-400 font-light">{dados.data_hora}</i>

            <div className="w-full mt-10 flex-1 shadow bg-white text-black p-4 rounded-lg flex flex-col">
                <span className="bg-green-600 text-white mt-[-30px] self-stretch text-wite mx-auto w-10 h-10 rounded-lg flex justify-center items-center"><CircleDollarSign /></span>

                <div className="flex text-slate-400 text-center flex-col my-3 mx-auto text-sm justify-center items-center">
                    <span className="text-green-500 text-2xl mb-2 font-semibold text-center">+{dados.valor_c_desconto}</span>
                    <span className="text-sm font-semibold mb-2 text-slate-800 text-center">{dados.alias_produto}</span>
                    <span className="rounded-full bg-gray-200 py-1 px-2 text-slate-800 text-xs mt-2">{dados.nome_status}</span>
                </div>

                <div className="flex flex-1 flex-col w-[90%] text-slate-400 mb-3 overflow-y-auto mx-auto text-sm border-t border-dashed border-slate-200 pt-4 mt-4">
                    <div className="flex text-slate-400 w-full justify-between items-center mb-3 mx-auto text-sm">
                        <b className="mr-2 text-slate-800">Valor Pago com desconto:</b> {dados.valor_c_desconto}
                    </div>

                    <div className="flex text-slate-400 w-full justify-between items-center mb-3 mx-auto text-sm">
                        <b className="mr-2 text-slate-800">Desconto:</b> {dados.desconto}
                    </div>
                    <div className="flex text-slate-400 w-full justify-between items-center mb-3 mx-auto text-sm">
                        <b className="mr-2 text-slate-800">Número do pedido:</b> {dados.numero_pedido}
                    </div>
                    <div className="flex text-slate-400 w-full justify-between items-center mb-3 mx-auto text-sm">
                        <b className="mr-2 text-slate-800">Código do produto:</b> {dados.codigo_produto}
                    </div>
                    <div className="flex text-slate-400 w-full justify-between items-center mb-3 mx-auto text-sm">
                        <b className="mr-2 text-slate-800">Cupom de desconto:</b> {dados.cupom_desconto}
                    </div>
                    <div className="flex text-slate-400 w-full justify-between items-center mb-3 mx-auto text-sm">
                        <b className="mr-2 text-slate-800">Forma de pagamento:</b> {dados.forma_pagamento}
                    </div>
                    <div className="flex text-slate-400 w-full justify-between items-center mb-3 mx-auto text-sm">
                        <b className="mr-2 text-slate-800">Número do pedido:</b> {dados.numero}
                    </div>
                    <div className="flex text-slate-400 w-full justify-between items-center mb-3 mx-auto text-sm">
                        <b className="mr-2 text-slate-800">Nome completo:</b> {dados.nome_completo}
                    </div>
                    <div className="flex text-slate-400 w-full justify-between items-center mb-3 mx-auto text-sm">
                        <b className="mr-2 text-slate-800">E-mail:</b> {dados.email}
                    </div>
                    <div className="flex text-slate-400 w-full justify-between items-center mb-3 mx-auto text-sm">
                        <b className="mr-2 text-slate-800">Telefone:</b> {dados.celular}
                    </div>
                    <div className="flex text-slate-400 w-full justify-between items-center mb-3 mx-auto text-sm">
                        <b className="mr-2 text-slate-800">CPF:</b> {dados.cpf}
                    </div>

                    <div className="flex text-slate-400 w-full justify-between items-center mb-3 mx-auto text-sm">
                        <b className="mr-2 text-slate-800">Endereço:</b> {dados.rua}
                    </div>
                    <div className="flex text-slate-400 w-full justify-between items-center mb-3 mx-auto text-sm">
                        <b className="mr-2 text-slate-800">Cidade:</b> {dados.cidade}
                    </div>
                    <div className="flex text-slate-400 w-full justify-between items-center mb-3 mx-auto text-sm">
                        <b className="mr-2 text-slate-800">Estado:</b> {dados.estado}
                    </div>

                    <div className="flex text-slate-400 w-full justify-between items-center mb-6 mx-auto text-sm">
                        <b className="mr-2 text-slate-800">CEP:</b> {dados.cep}
                    </div>

                    <div className="flex text-slate-400 w-full justify-between items-center mb-3 mx-auto text-sm">
                        <b className="mr-2 text-slate-800">UTM SOURCE:</b> {dados.utm_source}
                    </div>
                    <div className="flex text-slate-400 w-full justify-between items-center mb-3 mx-auto text-sm">
                        <b className="mr-2 text-slate-800">UTM MEDIUM:</b> {dados.utm_medium}
                    </div>
                    <div className="flex text-slate-400 w-full justify-between items-center mb-3 mx-auto text-sm">
                        <b className="mr-2 text-slate-800">UTM CAMPAIGN:</b> {dados.utm_campaign}
                    </div>
                    <div className="flex text-slate-400 w-full justify-between items-center mb-3 mx-auto text-sm">
                        <b className="mr-2 text-slate-800">UTM TERM:</b> {dados.utm_term}
                    </div>
                    <div className="flex text-slate-400 w-full justify-between items-center mb-3 mx-auto text-sm">
                        <b className="mr-2 text-slate-800">UTM CONTENT:</b> {dados.utm_content}
                    </div>
                    <div className="flex text-slate-400 w-full justify-between items-center mb-3 mx-auto text-sm">
                        <b className="mr-2 text-slate-800">UTM ID:</b> {dados.utm_id}
                    </div>
                    <div className="flex text-slate-400 w-full justify-between items-center mb-3 mx-auto text-sm">
                        <b className="mr-2 text-slate-800">UTM REDE:</b> {dados.utm_rede}
                    </div>
                </div>

                
            </div>
        </div>
    )
}