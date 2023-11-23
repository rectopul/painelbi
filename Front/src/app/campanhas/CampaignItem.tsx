'use client'

import { CampaignInsight } from "@/components/Types"
import { ArrowDown, ChevronDown, Copy, Eye, Trash2 } from "lucide-react"
import { useState } from "react"

interface CampaignItemProps {
    campaign: CampaignInsight
}

export function CampaignItem({ campaign }:CampaignItemProps) {
    const [open, setOpen] = useState<boolean>(false)

    return (
        <tbody className="border-b border-slate-200 text-[0.875rem]">
            <tr>
                <td className="px-2 py-3">
                    <span className="px-2 text-indigo-400">#{campaign.campaign_id}</span>
                </td>

                <td className="pl-2 pr-4 py-3">
                    <span className="px-2">{campaign.clicks}</span>
                </td>

                <td className="pr-7 pl-2 py-3">
                    <span className="px-2">{campaign.impressions}</span>
                </td>

                <td className="px-2 py-3 font-[500] text-left">
                    <span>{campaign.campaign_name}</span>
                </td>

                <td className="pl-2 pr-4 py-3">
                    <div className="flex items-center mr-auto">
                        <button className="rounded-lg mr-2 border-indigo-700 bg-indigo-500 text-white hover:bg-white hover:text-black border flex justify-center items-center w-8 h-8">
                            <Copy size={14} strokeWidth={2} />
                        </button>

                        <button className="rounded-lg mr-2 border-indigo-700 bg-indigo-500 text-white hover:bg-white hover:text-black border flex justify-center items-center w-8 h-8">
                            <Eye size={14} />
                        </button>

                        <button className="rounded-lg border-indigo-700 bg-indigo-500 text-white hover:bg-white hover:text-black border flex justify-center items-center w-8 h-8">
                            <Trash2 size={14} />
                        </button>

                        <button 
                            data-open={open}
                            onClick={() => open ? setOpen(false) : setOpen(true)}
                            className="text-slate-400 ml-auto hover:text-slate-600 data-[open=true]:rotate-180"
                        >
                            <ChevronDown />
                        </button>
                    </div>
                </td>
            </tr>
            {open && (
                <tr className="px-2 py-3 w-full" role="region">
                    <td colSpan={10}>
                        <div className="bg-grayLight-200 p-4 m-3 italic">
                            Anúncio: {campaign.adset_name}
                        </div>
                    </td>
                </tr>
            )}
        </tbody>
    )
}