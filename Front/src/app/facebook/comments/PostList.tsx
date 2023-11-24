import { FacePosts } from "@/@types/facebook"
import { formatarData } from "@/components/util"

interface FacePostItem {
    posts: FacePosts
}

export function PostList({ posts }: FacePostItem) {
    return (
        <tr className="px-2 py-3 w-full" role="region">
            <td colSpan={10}>
                <div className="bg-slate-100 p-4 m-3 italic flex flex-col">
                    {posts.data.map(p => (
                        <>
                            {p.message && (
                                <div className="flex flex-col border-b border-slate-200 py-2">
                                    <h2 className="flex justify-between">
                                        <span>{p.message}</span>
                                        <span>{formatarData(p.created_time)}</span>
                                    </h2>
                                </div>
                            )}
                        </>
                    ))}
                </div>
            </td>
        </tr>
    )
}