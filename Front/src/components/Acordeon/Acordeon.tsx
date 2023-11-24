'use client'

import { APP_ROUTES } from "@/constants/app-routes"
import { ChevronDown, CircleDollarSign, Facebook, FileSpreadsheet, GaugeCircle, List, Package, Package2 } from "lucide-react"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { AccordionItem } from "./AccordionItem"
import { AsanaIcon } from "../Icons/Icons"

const dashboardItems = [
    {link: `/painel`, title: `main`},
    {link: `/campanhas`, title: `campanhas`},
]

const planilhasItems = [
    {link: `/planilhas`, title: `Resumo`},
]

const pedidosItems = [
    {link: `/pedidos`, title: `Lista`}
]

const facebookItems = [
    {link: `/facebook`, title: `Lista`},
    {link: `/facebook/comments`, title: `Comentários`}
]

const AsanaItems = [
    {link: `/asana`, title: `Resumo`}
]

const Mptems = [
    {link: `/mercadopago`, title: `Resumo`}
]

export function Acordeon () {

    return (
        <>
            <AccordionItem Icon={<GaugeCircle className="mr-2" />} title="Dashboard" items={dashboardItems} />
            <AccordionItem Icon={<FileSpreadsheet className="mr-2" />} title="Planilhas" items={planilhasItems} />
            <AccordionItem Icon={<Package2 className="mr-2" />} title="Pedidos" items={pedidosItems} />
            <AccordionItem Icon={<Facebook className="mr-2" />} title="Perfis" items={facebookItems} />
            <AccordionItem Icon={<AsanaIcon className="mr-2" size={18} fill="#FFFFFF" />} title="Asana" items={AsanaItems} />
            <AccordionItem Icon={<CircleDollarSign className="mr-2" size={18} />} title="Mercado Pago" items={Mptems} />
        </>
    )
}