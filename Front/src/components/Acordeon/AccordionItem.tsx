import { ChevronDown } from "lucide-react"
import React, { ReactNode, useState } from "react"

interface AccordionProps {
    Icon: ReactNode;
    title: string;
    items: AccordionItemProps[]
}

interface AccordionItemProps {
    title: string;
    link: string
}

export function AccordionItem({ Icon, items, title }: AccordionProps) {
    const [open, setOpen] = useState<boolean>(false)

    const handleOpen = () => open ? setOpen(false) : setOpen(true)

    return (
        <div 
                data-open={open}
                className="w-full data-[open=true]:max-h-full my-2 transition-all bg-blackBlue-100 rounded-lg overflow-hidden max-h-[40px]"
            >
                <div 
                    onClick={handleOpen} 
                    data-open={open}
                    className={`text-white text-[.9rem] p-2 data-[open=true]:text-black data-[open=true]:bg-white cursor-pointer flex justify-between hover:bg-white rounded-tl-lg rounded-tr-lg hover:text-black`}
                >
                    <span className="flex items-center">
                        {Icon}
                        {title}
                    </span>
                    <ChevronDown className={`text-gray-300 transition-all ${open ? `rotate-0`: `-rotate-90`}`} size={18} />
                </div>
                <ul className="pl-4 pb-2">
                    {items.map((i, k) => (
                        <li className="py-1 w-full" key={k}>
                            <a href={i.link} className="text-gray-400 text-[.90rem] hover:text-indigo-400">{i.title}</a>
                        </li>
                    ))}
                </ul>
            </div>
    )
}