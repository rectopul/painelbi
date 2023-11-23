import { Loader } from "@/components/Loader"
import { useCallback, useEffect, useState } from "react"
import { MercadoPagoMain, MpResult } from "@/@types/mercadopago"
import { getPayments } from "@/components/Api/MercadoPago"
import { MpOrderItem } from "./OrderItem"
import { MpResumeCards } from "./ResumeCards"

interface MpPaymentListProps {
    selectDate: Date[] | null
}

export function MpPaymentsList({ selectDate }: MpPaymentListProps) {
    const [payments, setPayments] = useState<MercadoPagoMain | null>(null)
    const [paymentsFilter, setPaymentsFilter] = useState<MpResult[] | null>(null)

    const handleGetPayments = useCallback(async () => {
        try {
            const paymentList = await getPayments();
            paymentList && setPayments(paymentList);
        } catch (error) {
            console.log(`Erro ao recuperar lista de pagamentos do mercado pago`, error);
        }
    }, [setPayments]);
    
    const handleSelectDate = useCallback(() => {
        if (selectDate && selectDate.length > 1) {
            const inicio = new Date(selectDate[0]);
            const final = new Date(selectDate[1]);
    
            if (payments && payments.results) {
                const newDates: MpResult[] = payments?.results.filter((objeto) => {
                    const dataCriacao = new Date(objeto.date_created);
                    return dataCriacao >= inicio && dataCriacao <= final;
                });
    
                setPaymentsFilter(newDates);
            }
        } else {
            setPaymentsFilter(null);
        }
    }, [selectDate, payments, setPaymentsFilter]);
    
    useEffect(() => {
        handleSelectDate();
    }, [selectDate, handleSelectDate]);
    
    useEffect(() => {
        handleGetPayments();
    }, [handleGetPayments]);

    return (
        <>
        {paymentsFilter ? (
            <MpResumeCards payments={paymentsFilter} />
        ) : (
            payments && payments.results ? (
                <MpResumeCards payments={payments.results} />
            ) : (
                <MpResumeCards payments={null} />
            )
        )}
        
        <div className="w-full mt-10 md:w-[calc(100%-350px)] mx-auto md:ml-auto md:mx-0 px-2 md:mt-40 xl:md-20 2xl:mt-20 flex">
            <div className="bg-white w-full border border-slate-200">
                <table className="w-full table-auto text-xs">
                    <thead className="text-slate-500 dark:text-slate-400 border-b border-slate-200 uppercase font-[0.75rem] bg-grayLight-200">
                    <tr>
                        <th className="pl-4 pr-2 py-3 text-left">
                            <span>
                                Numero do pedido
                            </span>
                        </th>

                        <th className="pl-4 pr-2 py-3 text-left">
                            <span>
                                Site da venda
                            </span>
                        </th>

                        <th className="px-2 py-3 text-left">
                            <span>
                                Cliente
                            </span>
                        </th>

                        <th className="px-2 py-3 text-left">
                            <span>
                                Valor da venda
                            </span>
                        </th>

                        <th className="px-2 py-3 text-left">
                            <span>
                                Taxa cobrada
                            </span>
                        </th>


                        <th className="px-2 py-3 text-left">
                            <span>
                                Metodo de pagamento
                            </span>
                        </th>

                        <th className="px-2 py-3 text-left">
                            <span>
                                Data do pedido
                            </span>
                        </th>
                    </tr>
                    </thead>

                    {paymentsFilter ? paymentsFilter.map(o => (<MpOrderItem key={o.id} data={o} />)) :  payments && payments.results.map(o => (<MpOrderItem key={o.id} data={o} />))}
                    
                </table>
            </div>
        </div>
        </>
    )
}