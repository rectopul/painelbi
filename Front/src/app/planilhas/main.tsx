'use client'

import { PlanilhasDTO } from "@/@types/types"
import { getPlanilhaResume } from "@/components/Api/Planilha"
import { useEffect, useState } from "react"
import { PlanilhaResumeList } from "./resume/List"
import { PlanilhaDetail } from "./resume/PlanilhaDetail"


export function MainPlanilhas() {
    const [resume, setResume] = useState<PlanilhasDTO[]>()
    const [dados, setDados] = useState<PlanilhasDTO | null>(null)
    const [resumeOpen, setResumeOpen] = useState<boolean>(false)

    const handleOpenResume = (dados: PlanilhasDTO) => {
        setResumeOpen(true)
        setDados(dados)
    }

    const getResume = async () => {
        try {
            const res = await getPlanilhaResume();
            setResume(res);
        } catch (error) {
            console.log(error);
        }
    }
    
    useEffect(() => {
        !resume && getResume();
    }, [resume]);

    return (
        <div className="w-full md:w-[calc(100%-300px)] ml-auto p-2 md:p-5">
            <div className="w-full mt-60 md:mt-28 shadow-lg">
                <header className="p-4 bg-white border border-b-0 border-slate-200">
                    <h1 className="font-semibold text-slate-700">Planilha de resumo <span className="text-gray-300">{resume?.length}</span></h1>
                </header>
                {dados && (<PlanilhaDetail handleCloseDetail={() => setResumeOpen(false)} open={resumeOpen} dados={dados} />)}
                {resume && (<PlanilhaResumeList onClickResume={handleOpenResume} resume={resume} />)}
            </div>
        </div>
    )
}