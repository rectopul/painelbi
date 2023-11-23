export class CreatePlanilhaDto {
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

export interface QueriesDTO {
    nome_status?: string
    product_code?: string
    date?: string
    numero_pedido?: string
}