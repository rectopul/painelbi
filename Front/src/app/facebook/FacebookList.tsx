'use client'

import { CampaignStatusListDTO, FacebookProfileComplete, PlanilhasDTO } from "@/@types/types";
import { FacebookItem } from "./FacebookItem";
import { getAllFacebookAccounts } from "@/components/Api/FacebookAccounts";
import { useEffect, useState } from "react";
import { useFaceInfos } from "@/providers/FacebookProvider";

interface ResumeProps {
    resume: CampaignStatusListDTO[]
    onClickResume: (data: PlanilhasDTO) => void
}

export function FacebookList() {
    const { facebookAccounts, error } = useFaceInfos()

    return (
        <div className="w-full flex flex-wrap items-center mt-7">
            {error && (
                <div className="bg-red-400 border border-red-500 rounded flex justify-center items-center leading-5 px-3 py-2 text-white font-medium text-sm">{error}</div>
            )}
            {facebookAccounts && facebookAccounts?.map(a => (<FacebookItem key={a.id} data={a} />))}
            
        </div>
    )
}