'use client'

import { ProjectMain, ResponseTask } from "@/@types/asana";
import { getProject, taskList } from "@/components/Api/Asana";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

interface ContextData {
    project: ProjectMain | null
    tasks: ResponseTask[] | null
    error: string | null
}

const defaultContextData: ContextData = {
    project: null,
    tasks: null,
    error: null
};

type AsanaProviderProps = {
    children: ReactNode;
};

const context = createContext<ContextData>(defaultContextData)

export default function AsanaProvider({ children }: AsanaProviderProps) {
    const [project, setProject] = useState<ProjectMain | null>(null)
    const [tasks, setTasks] = useState<ResponseTask[] | null>(null)
    const [error, setError] = useState<string | null>(null)

    const handleGetProject = async () => {
        try {
            const proj  = await getProject()

            setProject(proj)

            const taskLists = await taskList()

            taskLists && setTasks(taskLists)

            console.log(`informaçoes asana: `, taskLists)
        } catch (error: any) {
            setError(error.message);
        }
    }

    useEffect(() => {
        handleGetProject()
    }, [])

    const defaultContextData: ContextData = {
        project,
        tasks,
        error
    };

    return (
        <context.Provider value={defaultContextData} >
            {children}
        </context.Provider>
    )
}

export function useAsanaInfos() {
    return useContext(context);
}