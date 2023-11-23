import { ResponseTask } from "@/@types/asana"
import { taskList } from "@/components/Api/Asana"
import { Loader } from "@/components/Loader"
import { useEffect, useState } from "react"
import { AsanaTaskItem } from "./TaskItem"

export function AsanaTaskList() {
    const [asanaTasks, setAsanaTasks] = useState<ResponseTask[] | null>(null)

    const handleGetTasks = async () => {
        try {
            const list = await taskList()
            setAsanaTasks(list)
        } catch (error) {
            console.log(`erro ao pegar tasks do asana: `, error)
        }
    }

    useEffect(() => {
        handleGetTasks()
    }, [])

    return (
        <div className="w-full mt-10 md:w-[calc(100%-350px)] mx-auto md:ml-auto md:mx-0 pb-20">
            <div className="w-[90%] mx-auto bg-white border border-slate-200">
                {!asanaTasks ? (<Loader />) : (
                    <>
                        <table className="w-full table-auto text-xs">
                            <thead className="text-slate-500 dark:text-slate-400 border-b border-slate-200 uppercase font-[0.75rem] bg-grayLight-200">
                            <tr>
                                <th className="pl-4 pr-2 py-3 text-left">
                                    <span>
                                        ID
                                    </span>
                                </th>

                                <th className="pl-4 pr-2 py-3 text-left">
                                    <span>
                                        NOME
                                    </span>
                                </th>

                                <th className="px-2 py-3 text-left">
                                    <span>
                                        Registros
                                    </span>
                                </th>
                            </tr>
                            </thead>

                            {asanaTasks.map((r, k) => (<AsanaTaskItem data={r} key={k} />))}
                            
                        </table>
                    </>
                )}
            </div>
        </div>
    )
}