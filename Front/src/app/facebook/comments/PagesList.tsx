import { useFaceInfos } from "@/providers/FacebookProvider"
import { FacebookPageItem } from "./PageItem"
import { FacebookPagesData } from "@/@types/facebook"

export function FacebookPageList() {
    const { facebookPages } = useFaceInfos()

    if(facebookPages !== null) {
    
        return (
            <div className="w-full mt-10 mx-auto md:ml-auto md:mx-0 px-2 md:mt-40 xl:md-20 2xl:mt-20 flex">
                <div className="bg-white w-full border border-slate-200">
                    <table className="w-full table-auto text-xs">
                        <thead className="text-slate-500 dark:text-slate-400 border-b border-slate-200 uppercase font-[0.75rem] bg-grayLight-200">
                        <tr>
                            <th className="px-2 py-3 text-left">
                                <span>
                                    ID Página
                                </span>
                            </th>
    
                            <th className="pl-4 pr-2 py-3 text-left">
                                <span>
                                    Conta
                                </span>
                            </th>
    
                            <th className="pl-4 pr-2 py-3 text-left">
                                <span>
                                    Nome da página
                                </span>
                            </th>
    
                            <th className="px-2 py-3 text-left">
                                <span>
                                    Categoria
                                </span>
                            </th>
    
                            <th className="px-2 py-3 text-left">
                                <span>
                                    Comentários
                                </span>
                            </th>
                        </tr>
                        </thead>
    
                        {facebookPages !== null && facebookPages.map((p, k) => (<FacebookPageItem key={k} account={p} />)) }
                        
                    </table>
                </div>
            </div>
        )

    }
}