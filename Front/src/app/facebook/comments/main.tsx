'use client'

import { CommentsOcult } from "./Ocult"
import { FacebookPageList } from "./PagesList"

export function FacebookCommentsMain() {

    return (
        <div className="w-full mt-10 md:w-[calc(100%-350px)] mx-auto md:ml-auto md:mx-0 px-2 md:mt-40 xl:md-20 2xl:mt-20 flex flex-col justify-between">
            <CommentsOcult />
            <FacebookPageList />
        </div>
    )
}