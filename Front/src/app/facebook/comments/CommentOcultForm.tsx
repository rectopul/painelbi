import { CreateComments } from "@/@types/Comments"
import { createComment } from "@/components/Api/Comments"
import { useFaceInfos } from "@/providers/FacebookProvider"
import { Alert } from "evergreen-ui"
import { X } from "lucide-react"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

interface CommentOcultFormProps {
    open: boolean
    onClose: (data: boolean) => void
}

export function CommentOcultForm({ open, onClose }: CommentOcultFormProps) {
    const { register, formState: { errors }, handleSubmit, reset } = useForm<CreateComments>()
    const [hasError, setHasError] = useState<string | null>(null)

    const { updateComments } = useFaceInfos()

    const onSubmit: SubmitHandler<CreateComments> = async (data) => {
        try {
            const comment = await createComment(data)

            if(comment) updateComments([comment])
            reset()
        } catch (error) {
            if (error instanceof Error) {
                setHasError(error.message);

                setTimeout(() => {
                    setHasError(null);
                }, 5000);
            } else {
                // Tratar o erro de outra forma
                console.log(error)
            }
            console.log(`Erro ao cadastrar palavra de comentário`, error)
        }
    }

    return (
        <>
            {hasError && (
                <Alert
                    intent="warning"
                    title="Erro ao inserir palavra la lista de comentários ocultos"
                >
                    {hasError}
                </Alert>
            )}
            <div 
                data-open={open}
                className="w-[90%] data-[open=false]:hidden md:max-w-[500px] bg-white rounded p-3 border-slate-200 shadow fixed flex flex-col top-0 md:top-[80px] left-[50%] translate-x-[-50%]"
            >
                <div 
                    onClick={() => onClose(false)}
                    className="absolute w-7 top-3 right-3 h-7 cursor-pointer flex justify-center rounded items-center bg-red-500 text-white leading-5 p-1"
                >
                    <X size={16} />
                </div>

                <h2 className="text-lg text-slate-800 font-semibold border-b border-slate-200 pb-2 mb-2">Ocultar Palavras</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="w-full py-2 flex flex-col">
                    <div className="w-full flex flex-col">
                        <label htmlFor="" className="text-sm font-normal text-slate-800">Comentário</label>

                        <input 
                            type="text" 
                            className="py-2 px-3 border rounded outline-none mt-2 border-slate-500 text-sm text-slate-800 font-medium" 
                            placeholder="Informe a palavra á ser ocultada"
                            {...register('word', { required: true})}
                        />
                    </div>

                    <button className="bg-indigo-500 w-[200px] my-3 mx-auto hover:bg-indigo-400 text-white text-sm rounded border border-indigo-600 font-medium text-center leading-5 px-3 py-2">Inserir</button>
                </form>
            </div>
        </>
    )
}