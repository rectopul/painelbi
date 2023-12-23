import { AdAccount, CampaignStatusListDTO, FacebookProfileComplete, PlanilhasDTO } from "@/@types/types"
import { ChevronDown, Eye } from "lucide-react"
import { useState } from "react"
import { StatusCheck } from "./StatusCheck"
import { AdsItem } from "./AdsItem"

interface FacebookItemProps {
    data: AdAccount
}

export function FacebookItem({ data }: FacebookItemProps) {
    const [open, setOpen] = useState<boolean>(false)

    //const handleClickResume = () => console.log(dados)
    // const handleClickResume = () => onClickResume(dados)

    return (
        <div className="w-4/12 p-2 mb-2">
            <div className="w-full p-4 bg-white border-slate-200 border flex flex-col">
                <header className="flex items-center">
                    <StatusCheck status={data.status} />

                    {data.status}
                </header>
                <AdsItem ad={data} />
            </div>
        </div>
    )
}