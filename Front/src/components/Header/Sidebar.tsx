'use client'

import Image from "next/image"
import pizza from '../../Icons/Pizza.svg'
import { Acordeon } from "../Acordeon/Acordeon"


export function Sidebar() {

    return (
        <aside className="w-full md:w-[250px] fixed left-0 top-0 z-50 flex flex-col bg-blueDark-100 h-full px-4 py-6">
            <figure className="w-full">
                <Image src={pizza} alt="pizza" />
            </figure>

            <div className="flex flex-col mt-10">
                <h4 className="text-xs text-grayLight-100 font-semibold uppercase mb-3">Páginas</h4>

                <Acordeon />
            </div>
        </aside>
    )
}