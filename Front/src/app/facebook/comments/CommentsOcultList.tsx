import { useFaceInfos } from "@/providers/FacebookProvider"
import { X } from "lucide-react"

interface CommentsOcultListProps {
    open: boolean
    onClose: (data: boolean) => void
}

export function CommentsOcultList({ onClose, open }: CommentsOcultListProps) {
    const { comments } = useFaceInfos()

    return (
        <div 
            data-open={open}
            className="fixed data-[open=false]:hidden p-3 w-full md:max-w-[600px] left-[50%] translate-x-[-50%] top-0 md:top-[80px] bg-white border border-slate-200 rounded"
        >
            <button 
            onClick={() => onClose(false)}
            className="absolute w-7 top-3 right-3 h-7 cursor-pointer flex justify-center rounded items-center bg-red-500 text-white leading-5 p-1"
            >
                <X size={16} />
            </button>

            <div className="flex flex-col text-slate-800 font-medium text-sm">
                <h2 className="text-lg font-semibold mb-3">Lista de palavras ocultas nos comentários</h2>

                {comments && (
                    <div className="w-full flex flex-col">
                        {comments.map(c => (
                            <div key={c.id} className="w-full py-2 border-b border-slate-200 leading-5">{c.word}</div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}