'use client'
import { useForm, SubmitHandler } from "react-hook-form"
import { handleLogin, isTokenInLocalStorage, setTokenInLocalStorage } from "./Api/Login"
import { LoginDTO, LoginProps } from "./Types"
import { useState } from "react"
import { Alert } from "@mui/material"
import { useRouter } from "next/navigation"


export function FormLogin() {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginDTO>()
    const [fail, setFail] = useState<string | null>(null)
    const { push } = useRouter()

    const login = async (data: LoginProps) => {
        try {
            const dataLogin = await handleLogin(data)
            setTokenInLocalStorage(dataLogin.token)

            if(dataLogin && isTokenInLocalStorage()) {
                push('/painel')
            }else{
                setFail('Token não recebido')
            }

        } catch (error) {
            console.log(error)
            if(error instanceof Error) {
                setFail(error.message)
            }else{
                setFail("Ocorreu um erro desconhecido.")
            }

            setTimeout(() => {
                setFail(null)
            }, 2000);
        }
    }

    const onSubmit: SubmitHandler<LoginDTO> = data => {
        login({data: data})
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[500px] shadow rounded-lg flex flex-col py-6 px-3 md:mt-10 mx-auto">
            <h1 className="mb-5 text-lg text-black font-bold">Formulário de Login</h1>
            <div className="w-full flex flex-col mb-4">
                <label htmlFor="username" className="text-black text-xs font-semibold">Usuário</label>
                <input 
                    type="text" 
                    className="px-2 py-3 w-full rounded-lg border border-gray-300 text-black text-xs" 
                    placeholder="Usuário"
                    {...register('user', { required: true })}
                />
                {errors.user && <span className="bg-red-300 text-white text-xs p-2 w-full rounded-md mt-2">Informe o nome de usuário</span>}
            </div>

            <div className="w-full flex flex-col mb-4">
                <label htmlFor="" className="text-black text-xs font-semibold">Senha</label>
                <input 
                    type="password" 
                    className="px-2 py-3 w-full rounded-lg border border-gray-300 text-black text-xs" 
                    placeholder="Senha"
                    {...register('password', { required: true })}
                />
                {errors.password && <span className="bg-red-300 text-white text-xs p-2 w-full rounded-md mt-2">Informe sua senha</span>}
            </div>

            <button className="bg-indigo-500 mb-3 w-[160px] mx-auto border hover:bg-indigo-400 border-indigo-600 shadow text-white text-xs uppercase text-center p-3 rounded">Entrar</button>
            {fail && <Alert severity="error">{fail}</Alert>}
        </form>
    )
}