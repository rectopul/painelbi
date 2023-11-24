import { FacebookPagesPayload } from "@/@types/facebook"
import { AdAccountsStatusDTO, CreateFaceAccountTDO, ErrorType, FacebookAccountsPayloadDTO, FacebookProfileComplete } from "@/@types/types"

const createFacebookAccounts = async (data: CreateFaceAccountTDO): Promise<FacebookAccountsPayloadDTO> => {
    try {
        const options = {
            method: `POST`,
            headers: {
                'Content-Type': `application/json`
            },
            body: JSON.stringify(data)
        }

        const req = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/campaign/account`, options)

        

        if(!req.ok){
            const res = await req.json()

            if(res.message) throw Error(res.message)

            throw Error(res)
        }

        const res: FacebookAccountsPayloadDTO = await req.json()
        return res

    } catch (error) {
        throw error
    }
}

const getFacebookPagesList = async (): Promise<FacebookPagesPayload[]> => {
    try {
        const url = new URL(`${process.env.NEXT_PUBLIC_BACK_URL}/facebook/pages`)
        const req = await fetch(url)

        if(!req.ok) {
            const dataError: ErrorType = await req.json()

            throw new Error(dataError.message)
        }

        const res: FacebookPagesPayload[] = await req.json()

        return res
    } catch (error) {
        throw error
    }
}

const updateFacebookAdAccounts = async (id: number, data: AdAccountsStatusDTO): Promise<AdAccountsStatusDTO> => {
    try {
        const options = {
            method: `PATCH`,
            headers: {
                'Content-Type': `application/json`
            },
            body: JSON.stringify(data)
        }

        const req = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/campaign/account/ad_account/${id}`, options)

        

        if(!req.ok){
            const res = await req.json()

            if(res.message) throw Error(res.message)

            throw Error(res)
        }

        const res: AdAccountsStatusDTO = await req.json()
        return res

    } catch (error) {
        throw error
    }
}
const getAllFacebookAccounts = async (): Promise<FacebookProfileComplete[]> => {
    try {
        const options = {
            method: `GET`,
            headers: {
                'Content-Type': `application/json`
            }
        }

        const req = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/campaign/ads_status`, options)

        

        if(!req.ok){
            const res = await req.json()

            if(res.message) throw Error(res.message)

            throw Error(res)
        }

        const res: FacebookProfileComplete[] = await req.json()
        return res

    } catch (error) {
        throw error
    }
}

export { createFacebookAccounts, updateFacebookAdAccounts, getAllFacebookAccounts, getFacebookPagesList }