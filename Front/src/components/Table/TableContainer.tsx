import { ReactNode } from "react";

interface TableContainerProps {
    children: ReactNode
}

export function TableContainer({ children }: TableContainerProps) {
    return (
        <div className="w-full mx-auto md:ml-auto md:mx-0">
            <div className="w-full mx-auto bg-white border border-slate-200">
                <table className="w-full table-auto text-xs">
                    {children}
                </table>
            </div>
        </div>
    )
}