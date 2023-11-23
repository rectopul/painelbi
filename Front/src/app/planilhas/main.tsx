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
        <div className="w-full mt-60 md:w-[1200px] mx-auto md:mt-28 bg-white border-slate-200 border">
            <header className="p-4">
                <h1 className="font-semibold text-slate-700">Planilha de resumo <span className="text-gray-300">{resume?.length}</span></h1>
            </header>
            {dados && (<PlanilhaDetail handleCloseDetail={() => setResumeOpen(false)} open={resumeOpen} dados={dados} />)}
            {resume && (<PlanilhaResumeList onClickResume={handleOpenResume} resume={resume} />)}
        </div>
    )
}