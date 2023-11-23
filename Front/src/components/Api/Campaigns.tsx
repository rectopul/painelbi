import { CampaignStatusListDTO } from "@/@types/types"
import { AudiencePayload, CreateCampaignsDTO, CreateCampaignsPayload } from "../Types"

interface createCampaignsProps {
    data: CreateCampaignsDTO
}

const createCampaignAPI = async ({ data }: createCampaignsProps): Promise<CreateCampaignsPayload> => {
    try {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        const req = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/campaign`, options)

        const res = await req.json()

        if(!req.ok) throw Error(res)

        return res
    } catch (error) {
        throw error
    }
}

const searchTerms = async (term: string): Promise<AudiencePayload> => {
    try {
        ///campaign/:terms
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const req = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/campaign/terms?q=${term}`, options)

        

        if(!req.ok){
            const res = await req.json()
            throw Error(res)
        }

        const res: AudiencePayload = await req.json()
        return res
    } catch (error) {
        throw error
    }
}

const getCampaignsStatus = async (): Promise<CampaignStatusListDTO[]> => {
    try {
        ///campaign/:terms
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const req = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/campaign/ads_status`, options)

        

        if(!req.ok){
            const res = await req.json()
            throw Error(res)
        }

        const res: CampaignStatusListDTO[] = await req.json()
        return res
    } catch (error) {
        throw error
    }
}

export { createCampaignAPI, searchTerms, getCampaignsStatus }