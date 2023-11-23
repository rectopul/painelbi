'use client'

import { AlertTriangle, MessagesSquare, Search } from "lucide-react"

export function Header() {
    return (
        <header className="w-full z-30 fixed top-0 left-0 mx-auto bg-white border-b border-slate-200 dark:border-slate-400">
            <div className="flex w-full md:w-[1200px] mx-auto items-center">
                <h1 className="text-indigo-400 text-lg">Painel Administrativo</h1>
                <div className="flex h-[64px] items-center justify-end ml-auto">
                    <button className="flex ml-2 hover:bg-blue-200 justify-center items-center w-8 rounded-full h-8 bg-blueLight-100 text-blue-950">
                        <Search size={16} />
                    </button>

                    <button className="flex ml-4 hover:bg-blue-200 relative justify-center items-center w-8 rounded-full h-8 bg-blueLight-100 text-blue-950">
                        <MessagesSquare size={16} />
                        <span className="w-2 h-2 rounded-full bg-red-500 absolute top-0 right-1"></span>
                    </button>

                    <button className="flex ml-4 hover:bg-blue-200 relative justify-center items-center w-8 rounded-full h-8 bg-blueLight-100 text-blue-950">
                        <AlertTriangle size={16} />
                        <span className="w-2 h-2 rounded-full bg-red-500 absolute top-0 right-1"></span>
                    </button>
                </div>
            </div>
        </header>
    )
}