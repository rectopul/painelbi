import { Campaigns } from "@prisma/client"

export class CreateCampaignDto {
    facebook_account: number
    name: string
    objective: string
    status: string
    special_ad_categories: string
}

export interface CampaignPayloadDTO extends Campaigns {
}

export interface ErrorHandleFacebook {

}

export interface BusinessReturnDTO {
    access_token: string
    category: string
    name: string
    id: string
}

export interface FacebookAccountsPayloadDTO {
    accounts: {
        data: BusinessReturnDTO[]
    }
    name: string
    id: string
}

export interface AdAccountsStatusDTO {
    account_status: number
    name: string
    facebook_id: number
    id: string
    unic_code: string
}

export interface AdAccountsPayloadsPDTO {
    account_status: number
    name: string
    facebook_id: number
    account_id: string
    unic_code: string
}

export interface AdAccountsStatusListDTO {
    data: AdAccountsStatusDTO[]
}

export interface AccountFacebookCreateDTO {
    token: string
    unic_code: string
    name?: string
    status?: string
}

export interface CampaignRecommendationDTO {
    title: string
    message: string
    code: number
    importance: string
    confidence: string
    blame_field: string
}

export interface CampaignStatusDTO {
    effective_status: string
    account_id: string
    campaign_id: string
    id: string
    name: string
    recommendations: CampaignRecommendationDTO[]
}

export interface CampaignStatusListDTO {
    data: CampaignStatusDTO[]
}

export interface adsInsights {
    spend: string
    date_start: string
    date_stop: string
}

export interface adsData {
    effective_status: string
    ad_active_time: string
    id: string
    name: string
    status: string
    insights: {
        data: adsInsights[]
    }
}

export interface AdAccountsItem {
    balance: string
    account_status: number
    amount_spent: string
    business: {
        id: string
        name: string
    }
    currency: string
    business_name: string
    name: string
    id: string
    owner: string
    ads: {
        data: adsData[]
    }
}

export interface AdAccountsConsultDTO {
    adaccounts: {
        data: AdAccountsItem[]
    }
}
