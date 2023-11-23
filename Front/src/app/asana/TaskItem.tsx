import { ResponseTask } from "@/@types/asana"
import { ChevronDown } from "lucide-react"

interface AsanaTaskItemProps {
    data: ResponseTask
}

export function AsanaTaskItem({ data }: AsanaTaskItemProps) {
    return (
        <tbody className="border-b border-slate-200 text-[0.875rem] hover:bg-grayLight-200 cursor-pointer">
            <tr>
                <td className="px-2 py-3">
                    <span className="px-2 text-indigo-400">1</span>
                </td>

                <td className="pl-2 pr-4 py-3">
                    <span className="px-2">{data.name}</span>
                </td>

                <td className="px-2 py-3 font-[500] text-left whitespace-nowrap">
                    <span className="flex justify-between">
                        {data.tasks.data.length}

                        <button 
                            className="text-slate-400 ml-auto hover:text-slate-600 data-[open=true]:rotate-180"
                        >
                            <ChevronDown />
                        </button>
                    </span>
                </td>
            </tr>
        </tbody>
    )
}