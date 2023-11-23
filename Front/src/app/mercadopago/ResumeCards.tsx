import { ChargeBack, MpResult } from "@/@types/mercadopago"
import { getChargeBacksList } from "@/components/Api/MercadoPago";
import Decimal from 'decimal.js';
import { useCallback, useEffect, useState } from "react";

interface MpResumeCardProps {
    payments: MpResult[] | null
}

function formatarParaReal(valorEmCentavos: number): string {
    //const valorEmReais = valorEmCentavos / 100; // Convertendo centavos para reais
    const formatoMoeda = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
    return formatoMoeda.format(valorEmCentavos);
}

export function MpResumeCards({ payments }: MpResumeCardProps) {
    const valorTotalVentas: number = payments ? payments.reduce((some, object) => some + object.transaction_details.total_paid_amount, 0) : 0
    const valorTotalTaxas: number = payments ? payments.reduce((some, object) => some + object.transaction_details.installment_amount, 0) : 0

    const [charges, setCharges] = useState<ChargeBack[] | null>(null)

    const handleGetChargeBacks = useCallback(async () => {
        try {
            const list = await getChargeBacksList();
            list && setCharges(list);
        } catch (error) {
            console.log(`Erro ao recuperar chargebacks`, error);
        }
    }, [setCharges]);
    
    const chargebacks = charges && charges.length ? charges.reduce((some, char) => some + char.amount, 0) : 0;
    
    useEffect(() => {
        handleGetChargeBacks();
    }, [handleGetChargeBacks]);

    return (
        <div className="w-full mt-10 md:w-[calc(100%-350px)] mx-auto md:ml-auto md:mx-0 px-2 md:mt-40 xl:md-20 2xl:mt-20 flex">
            <div className="w-full flex items-center mb-0">

                <div className="w-4/12 p-4">
                    <div className="bg-white border-slate-200 p-3 flex flex-col text-slate-800 shadow">
                        <h2 className="text-lg font-bold mb-2">Total de vendas</h2>

                        <div className="flex items-center text-sm font-medium"><b className="mr-2">Quantidade de vendas: </b> {payments?.length}</div>
                        <div className="flex items-center text-sm font-medium"><b className="mr-2">
                            Valor total de vendas: </b> {formatarParaReal(valorTotalVentas)}
                        </div>
                    </div>
                </div>

                <div className="w-4/12 p-4">
                    <div className="bg-white border-slate-200 p-3 flex flex-col text-slate-800 shadow">
                        <h2 className="text-lg font-bold mb-2">Total de taxas</h2>

                        <div className="flex items-center text-sm font-medium"><b className="mr-2">Quantidade de vendas: </b> {payments?.length}</div>
                        <div className="flex items-center text-sm font-medium"><b className="mr-2">
                            Valor total de taxa cobrada: </b> {formatarParaReal(valorTotalTaxas)}
                        </div>
                    </div>
                </div>

                <div className="w-4/12 p-4">
                    <div className="bg-white border-slate-200 p-3 flex flex-col text-slate-800 shadow">
                        <h2 className="text-lg font-bold mb-2">Reembolsos</h2>

                        <div className="flex items-center text-sm font-medium"><b className="mr-2">Quantidade de reembolsos: </b> ${charges?.length || 0}</div>
                        <div className="flex items-center text-sm font-medium"><b className="mr-2">Valor total Reembolsado: </b> {formatarParaReal(chargebacks)}</div>
                    </div>
                </div>

            </div>
        </div>
    )
}