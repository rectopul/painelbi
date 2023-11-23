export interface PlanilhasDTO {
    data: string
    data_hora: string
    nome_status: string
    utm_medium: string
    status_produto: string
    alias_produto: string
    numero_pedido: string
    valor_c_desconto: string
    desconto: string
    utm_source: string
    utm_campaign: string
    utm_content: string
    utm_id: string
    utm_term: string
    utm_rede: string
    nome_completo: string
    email: string
    cpf: string
    celular: string
    link_whatsapp: string
    ip: string
    cep: string
    rua: string
    numero: string
    cidade: string
    estado: string
    pais: string
    cupom_desconto: string
    qtd_parcelado: string
    valor_parcela: string
    numero_cartao: string
    nome_cartao: string
    cpf_cartao: string
    forma_pagamento: string
    codigo_produto: string
}

export interface CreateFaceAccountTDO {
    token: string
    unic_code: string
}

export interface BusinessReturnDTO {
    id: number
    access_token: string
    unic_code: string
    name: string
    business_id: string
    facebook_account: number
}

export interface FacebookAccountsPayloadDTO {
    BusinessAccount: BusinessReturnDTO[]
    AdAccount: AdAccountsStatusDTO[]
    name: string
    id: number
    unic_code: string
    status: string | null
    token: string
}

export interface AdAccountsStatusDTO {
    status?: string
    name?: string
    id: number
    account_id?: string
    facebook_id?: number
    unic_code?: string
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
    facebook: {
        id: number
        unic_code: string
        name: string
        status: string | null
    }
    data: CampaignStatusDTO[]
}

export interface AdAccountProps {
    id: number
    name: string
    account_id: string
    unic_code: string
    status: string
    facebook_id: number
    Ads: AdsProps[]
}

export interface AdsProps {
    id: number
    name: string
    ad_active_time: string
    status: string
    spend: string
    date_start: string
    date_stop: string
    unic_code: string
    adAccountId: number
}

export interface FacebookProfileComplete {
    id:        number;
    token:     string;
    unic_code: string;
    name:      string;
    status:    string;
    AdAccount: AdAccount[];
}

export interface IconsProps {
    size?: number
    className?: string
    fill?: string
}

export interface MainFaceAccounts {
    id:        number;
    token:     string;
    unic_code: string;
    name:      string;
    status:    null;
    AdAccount: AdAccount[];
}

export interface AdAccount {
    id:          number;
    name:        string;
    account_id:  string;
    unic_code:   string;
    status:      string;
    facebook_id: number;
    Ads:         Ad[];
}

export interface Ad {
    id:             number;
    name:           string;
    ad_active_time: string;
    status:         string;
    spend:          string;
    date_start:     Date;
    date_stop:      Date;
    unic_code:      string;
    adAccountId:    number;
}

export interface ErrorType {
    message: string
}
