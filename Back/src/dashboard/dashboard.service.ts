import { Injectable } from "@nestjs/common";
import { CampaignsDTO } from "./dashboard.tdo";

interface CampaignsPROPS {
    resume_all: CampaignsDTO
    resume_day: CampaignsDTO
}

@Injectable()
export class DashboardService {
    async getCampaigns(): Promise<CampaignsPROPS> {
        try {
            const data = new Date(); // Cria uma instância da data atual
            const ano = data.getFullYear(); // Obtém o ano (por exemplo, 2023)
            const mes = (data.getMonth() + 1).toString().padStart(2, '0'); // Obtém o mês (0-11), adiciona 1 e formata com dois dígitos (01-12)
            const dia = data.getDate().toString().padStart(2, '0'); // Obtém o dia do mês e formata com dois dígitos (01-31)
            const time_range = `{"since":"2023-01-01","until":"2023-12-31"}`
            const dataFormatada = `${ano}-${mes}-${dia}`; // Combina as partes para formar a data no formato desejado
            const time_range_day = `{"since":"${dataFormatada}","until":"${dataFormatada}"}`



            const fields = `campaign_name,campaign_id,adset_name,spend,impressions,clicks,cpc,ctr`
            const level = `adset`

            const urlday = `https://graph.facebook.com/v18.0/act_1433314434157959/insights?time_range=${time_range_day}&access_token=${process.env.FACE_TOKEN}&level=${level}&fields=${fields}`


            const reqCampaignDay = await fetch(urlday)
            const res_campaign_day = await reqCampaignDay.json()




            const url = `https://graph.facebook.com/v18.0/act_1433314434157959/insights?time_range=${time_range}&access_token=${process.env.FACE_TOKEN}&level=${level}&fields=${fields}`
            const req = await fetch(url)

            const res = await req.json()

            return { resume_all: res, resume_day: res_campaign_day }
        } catch (error) {
            console.log(`erro ao recuperar campanhas`)
        }
    }
}