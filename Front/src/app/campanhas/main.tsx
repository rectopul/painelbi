'use client'

import { getDash } from "@/components/Api/Dashboard"
import { CampaignPayload, DashboardPayload } from "@/components/Types"
import { useEffect, useState } from "react"
import ListCampanhas from "./ListCampaigns"
import { CreateCampaign } from "./CreateCampaign"


export default function MainCampanhas() {
    const [dataDash, setDataDash] = useState<DashboardPayload | null>(null)
    const [campanhas, setCampanhas] = useState<CampaignPayload | null>(null)

    const getDashboard = async () => {
        try {
            const dash = await getDash()
            setDataDash(dash)

            if(dash) {
                setCampanhas(dash.campanhas)
            }

        } catch (error) {
            console.log(`Erro ao pegar dados do dashboard`, error)
        }
    }

    useEffect(() => {
        getDashboard()
    }, [])

    return (
        <>
            <CreateCampaign />
            <div className="w-full md:w-[1200px] mx-auto md:mt-10 bg-white border-slate-200 border">
                <header className="p-4">
                    <h1 className="font-semibold text-slate-700">Campanhas <span className="text-gray-300">{campanhas?.data.length}</span></h1>
                </header>
                <div className="w-full flex flex-wrap">
                    {campanhas && (<ListCampanhas campanhas={campanhas} />)}
                </div>
            </div>
        </>
    )
  }
  