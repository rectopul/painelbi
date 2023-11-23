import { AdAccount } from "@/@types/types"
import { formatDate } from "@/functions/FilterDates"
import { Eye } from "lucide-react"

interface AdsItemProps {
    ad: AdAccount
}

export function AdsItem({ ad }: AdsItemProps) {
    return (
        <>
            {ad.Ads.length > 0 && ad.Ads.map(a => (
                <article key={a.id}>
                    <h2 className="text-lg text-slate-800 font-medium mt-4">{a.name}</h2>
                    <span className="text-sm text-slate-800">Conta: {ad.name}</span>
                    <div className="flex items-center mt-2">
                        <span className="text-slate-500 text-sm font-medium">{`${formatDate(a.date_start)} -> ${formatDate(a.date_stop)}`}</span>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                        <span className="bg-green-200 text-green-800 rounded-full py-1 px-3 text-xs font-normal capitalize">{a.status}</span>

                        <a href="" className="text-indigo-500 text-sm hover:underline"><Eye size={18} /></a>
                    </div>
                </article>
            ))}
            
        </>
    )
}