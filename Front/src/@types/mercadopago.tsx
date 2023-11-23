export interface MercadoPagoToken {
    access_token: string;
    token_type:   string;
    expires_in:   number;
    scope:        string;
    user_id:      number;
    live_mode:    boolean;
}


export interface MercadoPagoMain {
    results: MpResult[];
    paging:  Paging;
}

export interface Paging {
    total:  number;
    limit:  number;
    offset: number;
}

export interface MpResult {
    metadata:                    Metadata;
    corporation_id:              null;
    operation_type:              string;
    point_of_interaction:        PointOfInteraction;
    fee_details:                 FeeDetail[];
    notification_url:            string;
    date_approved:               Date | null;
    money_release_schema:        null;
    payer:                       ResultPayer;
    transaction_details:         TransactionDetails;
    statement_descriptor:        null | string;
    call_for_authorize_id:       null;
    installments:                number;
    pos_id:                      null;
    external_reference:          string;
    date_of_expiration:          Date | null;
    charges_details:             ChargesDetail[];
    id:                          number;
    payment_type_id:             string;
    barcode?:                    Barcode;
    payment_method:              PaymentMethod;
    order:                       Order;
    counter_currency:            null;
    money_release_status:        string;
    brand_id:                    null;
    status_detail:               string;
    tags:                        null;
    differential_pricing_id:     null;
    additional_info:             AdditionalInfo;
    live_mode:                   boolean;
    marketplace_owner:           null;
    card:                        Card;
    integrator_id:               null;
    status:                      string;
    accounts_info:               null;
    transaction_amount_refunded: number;
    transaction_amount:          number;
    description:                 string;
    financing_group:             null;
    money_release_date:          Date | null;
    merchant_number:             null;
    refunds:                     any[];
    expanded:                    Expanded;
    authorization_code:          null | string;
    captured:                    boolean;
    collector_id:                number;
    merchant_account_id:         null;
    taxes_amount:                number;
    date_last_updated:           Date;
    coupon_amount:               number;
    store_id:                    null;
    build_version:               string;
    date_created:                Date;
    acquirer_reconciliation:     any[];
    sponsor_id:                  number;
    shipping_amount:             number;
    issuer_id:                   string;
    payment_method_id:           string;
    binary_mode:                 boolean;
    platform_id:                 null;
    deduction_schema:            null;
    processing_mode:             string;
    currency_id:                 string;
    shipping_cost:               number;
}

export interface AdditionalInfo {
    authentication_code: null;
    nsu_processadora:    null;
    available_balance:   null;
    items:               Item[];
    payer:               AdditionalInfoPayer;
    shipments:           Shipments;
}

export interface Item {
    quantity:    string;
    category_id: null;
    picture_url: null;
    description: string;
    id:          string;
    title:       string;
    unit_price:  string;
}


export interface AdditionalInfoPayer {
    phone:      PurplePhone;
    last_name:  string;
    first_name: string;
}

export interface PurplePhone {
    number:    string;
    area_code: string;
}

export interface Shipments {
    receiver_address: ReceiverAddress;
}

export interface ReceiverAddress {
    street_number: string;
    street_name:   string;
    zip_code:      string;
}

export interface Barcode {
    content: string;
}


export interface Card {
    first_six_digits?:  string;
    expiration_year?:   number;
    bin?:               string;
    date_created?:      Date;
    expiration_month?:  number;
    id?:                null;
    cardholder?:        Cardholder;
    last_four_digits?:  string;
    date_last_updated?: Date;
}

export interface Cardholder {
    identification: Identification;
    name:           string;
}

export interface Identification {
    number: null | string;
    type:   string | null;
}


export interface ChargesDetail {
    refund_charges: any[];
    last_updated:   Date;
    metadata:       Order;
    amounts:        Amounts;
    date_created:   Date;
    name:           string;
    reserve_id:     null;
    accounts:       Accounts;
    id:             string;
    type:           string;
    client_id:      number;
}

export interface Accounts {
    from: string;
    to:   string;
}

export interface Amounts {
    original: number;
    refunded: number;
}

export interface Order {
}

export interface Expanded {
    gateway: Gateway | null;
}

export interface Gateway {
    buyer_fee:            number;
    finance_charge:       number;
    date_created:         Date;
    merchant:             null;
    reference:            null | string;
    statement_descriptor: null | string;
    issuer_id:            string;
    usn:                  null;
    installments:         number;
    soft_descriptor:      string;
    authorization_code:   null | string;
    payment_id:           number;
    profile_id:           string;
    options:              string;
    connection:           string;
    id:                   string;
    operation:            string;
}

export interface FeeDetail {
    amount:    number;
    fee_payer: string;
    type:      string;
}

export interface Metadata {
    seller_website: string;
}

export interface ResultPayer {
    entity_type:    null;
    identification: Identification;
    phone:          FluffyPhone;
    operator_id:    null;
    last_name:      null;
    id:             string;
    type:           null;
    first_name:     null;
    email:          null | string;
}

export interface FluffyPhone {
    number:    null;
    extension: null;
    area_code: null;
}

export interface PaymentMethod {
    issuer_id:     string;
    data:          Data;
    forward_data?: ForwardData;
    id:            string;
    type:          string;
}

export interface Data {
    paid_date?:    Date;
    routing_data?: RoutingData;
}

export interface RoutingData {
    merchant_account_id: string;
}

export interface ForwardData {
    agreement_number: string;
    ticket_number:    string;
}

export interface PointOfInteraction {
    business_info:    BusinessInfo;
    transaction_data: Order;
    type:             string;
}

export interface BusinessInfo {
    unit:     string;
    sub_unit: string;
}

export interface TransactionDetails {
    total_paid_amount:           number;
    acquirer_reference:          null | string;
    installment_amount:          number;
    financial_institution:       null | string;
    net_received_amount:         number;
    overpaid_amount:             number;
    digitable_line?:             string;
    external_resource_url:       null | string;
    barcode?:                    Barcode;
    payable_deferral_period:     null;
    payment_method_reference_id: null | string;
    verification_code?:          string;
}

export interface ChargeBack {
    id: number;
    payment_id: number;
    amount: number;
    metadata: Record<string, any>[]; // Array de objetos vazios, mas pode ser de outro tipo específico
    source: ChargeBackSource[];
    date_created: string;
    unique_sequence_number: null | number; // Pode ser nulo ou um número
    refund_mode: string;
    adjustment_amount: number;
    status: string;
    reason: null | string; // Pode ser nulo ou uma string
    label: Record<string, any>[]; // Array de objetos vazios, mas pode ser de outro tipo específico
    partition_details: Record<string, any>[]; // Array de objetos vazios, mas pode ser de outro tipo específico
}

export interface ChargeBackSource {
    name: {
        en: string;
        pt: string;
        es: string;
    };
    id: string;
    type: string;
}
  
