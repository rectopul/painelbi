'use client'

export interface LoginDTO {
    user: string
    password: string
}

export interface TokenDTO {
    token: string
}

export interface LoginProps {
    data: LoginDTO
}

export interface CampaignInsight {
    account_id: string
    date_start: string
    campaign_id: string
    date_stop: string
    impressions: string
    spend: string
    campaign_name: string
    adset_name: string
    clicks: string
    cpc: string
    ctr: string
}


export interface CampaignPayload {
    data: CampaignInsight[]
    paging: {
        cursors: {
            before: string
            after: string
        }
    }
}

interface UserType {
    id: number
    type: string
    name: string
    user: string
    created_at: string
    updated_at: string
    UserImage: null
}

export interface DashboardPayload {
    pageClasses: string
    page: string
    title: string
    user: UserType
    panel: boolean
    campanhas: CampaignPayload
    accounts: UserType
    message?: string
}

export interface PayloadCampaignCreated {
    id: string
}

export interface BevahiorsProps {
    id: string
    name: string
}

export interface CreateAdSetDto {
    name: string;
    campaign_id: string; // O ID da campanha à qual o conjunto de anúncios pertence
    daily_budget: number | string // Orçamento diário
    start_time: Date | string | null // Data e hora de início no formato ISO8601
    end_time: string; // Data e hora de término no formato ISO8601
    billing_event: string
    bid_strategy: string
    targeting: {
        behaviors: BevahiorsProps[]
    }
}

export interface CreateCampaignsPayload {
    id: number
    name: string
    objective: string
    campaign_id: string
    status: string
    special_ad_categories: string
}

export interface AudienceValuesTypes {
    audience_size_lower_bound: number
    audience_size_upper_bound: number
    id: string
    description: string | null
    name: string
    topic: string
    path: string[]
}

export interface AudiencePayload {
    data: AudienceValuesTypes[]
}

export interface CreateCampaignsDTO {
    name: string
    objective: string
    status: string
    special_ad_categories: string
}

export interface FilterOptionsProps {
    filter: {
        nome_status?: string
        product_code?: string
        date?: string
        numero_pedido?: string
    }
}

export interface FacebookCreatePayloadDTO {
    token:    string 
    unic_code: string
}