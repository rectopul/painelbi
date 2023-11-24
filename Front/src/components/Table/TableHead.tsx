import { ReactNode } from "react";

interface TableHeadProps {
    children: ReactNode
}

export function TableHead({ children }: TableHeadProps) {
    return (
        <thead className="text-slate-500 dark:text-slate-400 border-b border-slate-200 uppercase font-[0.75rem] bg-grayLight-200">
            <tr>{children}</tr>
        </thead>
    )
}