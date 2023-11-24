import { FacebookPagesData, FacebookPagesPayload } from "@/@types/facebook";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { PostList } from "./PostList";

interface FacebookPageItemProps {
    account: FacebookPagesPayload
}

export function FacebookPageItem({ account }: FacebookPageItemProps) {
    const [open, setOpen] = useState<boolean>(false)

    return (
        <>
            {account.pages.data.map(p => (
                <tbody className="border-b border-slate-200 text-[0.875rem] hover:bg-grayLight-200 cursor-pointer">
                    <tr>
                        <td className="px-2 py-3">
                            <span className="px-2 text-indigo-400">{p.id}</span>
                        </td>

                        <td className="pl-2 pr-4 py-3">
                            <span className="px-2">{account.name}</span>
                        </td>

                        <td className="pr-7 pl-2 py-3">
                            <span className="px-2">{p.name}</span>
                        </td>

                        <td className="px-2 py-3 font-[500] text-left">
                            <span>{p.category}</span>
                        </td>

                        <td className="px-2 py-3 font-[500] text-left whitespace-nowrap">
                            <span className="flex justify-between">
                                Comentários (2)

                                <button 
                                    data-open={open}
                                    onClick={() => open ? setOpen(false) : setOpen(true)}
                                    className="text-slate-400 ml-auto hover:text-slate-600 data-[open=true]:rotate-180"
                                >
                                    <ChevronDown />
                                </button>
                            </span>
                        </td>
                    </tr>
                    {open && (
                        <>
                            {p.posts.posts && <PostList posts={p.posts.posts} />}
                        </>
                    )}
                </tbody>
            ))}
            
        </>
    )
}