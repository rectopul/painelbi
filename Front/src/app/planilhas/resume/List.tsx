'use client'

import { PlanilhasDTO } from "@/@types/types";
import { PlanilhaResumeItem } from "./Item";
import { TableContainer } from "@/components/Table/TableContainer";
import { TableHead } from "@/components/Table/TableHead";
import { TableCell } from "@/components/Table/TableCell";

interface ResumeProps {
    resume: PlanilhasDTO[]
    onClickResume: (data: PlanilhasDTO) => void
}

export function PlanilhaResumeList({ resume, onClickResume }: ResumeProps) {


    return (
        <TableContainer>
            <TableHead>
                <TableCell>
                    Numero do pedido
                </TableCell>

                <TableCell>
                    Data
                </TableCell>

                <TableCell>
                    Nome do status
                </TableCell>

                <TableCell>
                    Alias do Produto
                </TableCell>

                <TableCell>
                    Nome Completo
                </TableCell>

                <TableCell className="whitespace-nowrap">
                    Código do produto
                </TableCell>
            </TableHead>

            {resume.map((r, k) => (<PlanilhaResumeItem onClickResume={onClickResume} dados={r} key={k} />))}
        </TableContainer>
    )
}