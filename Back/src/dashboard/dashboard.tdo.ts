interface CampaignInsight {
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

export interface CampaignsDTO {
    data: CampaignInsight[]
    paging: {
        cursors: {
            before: string
            after: string
        }
    }
}