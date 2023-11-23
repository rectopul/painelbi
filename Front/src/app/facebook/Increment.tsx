import { Plus } from "lucide-react";
import { FaceFormCreate } from "./FormCreate";
import { useState } from "react";

export function FacebookIncrement() {
    const [openForm, setOpenForm] = useState<boolean>(false)
    return (
        <div className="w-full mt-24 md:w-[1200px] mx-auto flex flex-col">
            <FaceFormCreate onCloseForm={() => setOpenForm(false)} onOpen={openForm} />
            <div className="w-full flex justify-end">
                <button className="leading-5 bg-indigo-600 flex justify-center items-center hover:bg-indigo-500 text-white rounded text-sm font-medium text-center px-4 py-2">
                    <Plus className="mr-1 opacity-70" size={17} />Adicionar conta
                </button>
            </div>
        </div>
    )
}