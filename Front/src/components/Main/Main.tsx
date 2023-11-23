'use client'

import { useEffect, useState } from "react"
import { getDash } from "../Api/Dashboard"
import { CampaignPayload, DashboardPayload } from "../Types"
import { CardCampaign } from "./CardCampagn"

export function Main() {
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
        <div className="w-full md:w-[1200px] mx-auto md:mt-10">
            <h1 className="text-lg font-semibold">Dashboard</h1>

            <div className="w-full flex flex-wrap">
                {campanhas && (<CardCampaign campanha={campanhas} />) }
                {campanhas && (<CardCampaign campanha={campanhas} />) }
                {campanhas && (<CardCampaign campanha={campanhas} />) }
                {campanhas && (<CardCampaign campanha={campanhas} />) }
                {campanhas && (<CardCampaign campanha={campanhas} />) }
            </div>
        </div>
    )
}