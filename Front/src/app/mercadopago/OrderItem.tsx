import { MpResult } from "@/@types/mercadopago"
import { ChevronDown } from "lucide-react"

interface MpOrderItemProps {
    data: MpResult
}

function formatarData(dataString: string): string {
    const data = new Date(dataString);
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(data);
  }

export function MpOrderItem({ data }: MpOrderItemProps) {
    return (
        <tbody className="border-b border-slate-200 text-[0.875rem] hover:bg-grayLight-200 cursor-pointer">
            <tr>
                <td className="px-2 py-3">
                    <span className="px-2 text-indigo-400">{data.id}</span>
                </td>

                <td className="pl-2 pr-4 py-3">
                    <span className="px-2">{data.metadata.seller_website}</span>
                </td>

                <td className="pl-2 pr-4 py-3">
                    <span className="px-2">{data.payer.email}</span>
                </td>

                <td className="pl-2 pr-4 py-3">
                    <span className="px-2">{data.transaction_details.total_paid_amount}</span>
                </td>

                <td className="pl-2 pr-4 py-3">
                    <span className="px-2">{data.transaction_details.installment_amount}</span>
                </td>

                <td className="pl-2 pr-4 py-3">
                    <span className="px-2">{data.payment_method.type}</span>
                </td>

                <td className="pl-2 pr-4 py-3">
                    <span className="px-2">{formatarData(data.date_created.toString())}</span>
                </td>
            </tr>
        </tbody>
    )
}