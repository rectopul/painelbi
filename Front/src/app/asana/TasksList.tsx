import { ResponseTask } from "@/@types/asana"
import { taskList } from "@/components/Api/Asana"
import { Loader } from "@/components/Loader"
import { useEffect, useState } from "react"
import { AsanaTaskItem } from "./TaskItem"
import { Alert } from "evergreen-ui"
import { TableContainer } from "@/components/Table/TableContainer"
import { TableHead } from "@/components/Table/TableHead"
import { TableCell } from "@/components/Table/TableCell"

export function AsanaTaskList() {
    const [asanaTasks, setAsanaTasks] = useState<ResponseTask[] | null>(null)
    const [hasError, setHasError] = useState<string | null>(null)

    const handleGetTasks = async () => {
        try {
            const list = await taskList()
            setAsanaTasks(list)
        } catch (error) {
            if (error instanceof Error) {
                setHasError(`Erro ao pegar tasks do asana`);

                setTimeout(() => {
                    setHasError(null);
                }, 5000);
            } else {
                // Tratar o erro de outra forma
                console.log(error)
            }
            
            console.log(`erro ao pegar tasks do asana: `)
        }
    }

    useEffect(() => {
        handleGetTasks()
    }, [])

    return (
        <>
            {hasError && (
                <div className="fixed w-full md:w-[400px] left-[50%] translate-x-[-50%] bottom-0 md:bottom-5">
                    <Alert title="Erro ao listar Asana" intent="warning" >
                        {hasError}
                    </Alert>
                </div>
            )}
            <TableContainer>
                <TableHead>
                    <TableCell>ID</TableCell>
                    <TableCell>NOME</TableCell>
                    <TableCell>Registros</TableCell>
                </TableHead>

                {!asanaTasks ? (<Loader />) : asanaTasks.map((r, k) => (<AsanaTaskItem data={r} key={k} />))}
            </TableContainer>
        </>
    )
}