import { ReactNode } from "react";

interface TableCellProps {
    children: ReactNode
    className?: string
}

export function TableCell({ children, className }: TableCellProps) {
    return (
        <th className={`pl-4 pr-2 py-3 text-left ${className}`}>
            <span>{children}</span>
        </th>
    )
}