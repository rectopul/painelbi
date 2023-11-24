import { ProjectMain, ResponseTask, TaskListMain } from "@/@types/asana"
import { ErrorType } from "@/@types/types"

const getProject = async (): Promise<ProjectMain> => {
    try {
        //NEXT_PUBLIC_ASANA_TOKEN
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${process.env.NEXT_PUBLIC_ASANA_TOKEN}`,
            }
        }
        const req = await fetch(`https://app.asana.com/api/1.0/projects/1205722184123511/sections/`, options)

        if(!req.ok) {
            const dataError: ErrorType = await req.json()

            throw new Error(dataError.message)
        }

        const res: ProjectMain = await req.json()

        return res
    } catch (error) {
        throw error
    }
}

interface GetSectionProps {
    section: string
    url?: string
}

const getSection = async ({ section, url }: GetSectionProps): Promise<TaskListMain> => {
    try {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${process.env.NEXT_PUBLIC_ASANA_TOKEN}`,
            }
        }
        const req = await fetch(url || `https://app.asana.com/api/1.0/sections/${section}/tasks?limit=100`, options)

        if(!req.ok) {
            console.log(`tem erros no asana`)
            const dataError: ErrorType = await req.json()

            if(dataError.errors) {
                
                throw new Error(dataError.errors[0].message)
            }else{
                throw new Error(dataError.message)
            }
            
        }

        const res: TaskListMain = await req.json()

        const tasks = res.data

        if (res.next_page && res.next_page.uri) {
            // Se houver um próximo link, faça uma chamada recursiva para obter mais tarefas
            const nextPageTasks: TaskListMain = await getSection({ section, url: res.next_page.uri});
            return { data: [...tasks, ...nextPageTasks.data], next_page: nextPageTasks.next_page };
        }

        return res

    } catch (error) {
        throw error
    }
}


const taskList = async (): Promise<ResponseTask[]> => {
    try {
        const sections = await getProject()

        if(!sections.data.length) throw new Error(`Não existem sections no projeto do asana`)

        const tasksPromises: Promise<ResponseTask>[] = sections.data.map(async (s) => {
            const taskList = await getSection({section: s.gid})

            const response: ResponseTask = {
                name: s.name,
                tasks: taskList
            }

            return response
        })

        const tasksResume = await Promise.all(tasksPromises)

        return tasksResume
    } catch (error) {
        throw error
    }
}

export { getProject, taskList, getSection }