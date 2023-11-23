'use client'
import { Authenticated } from "@/Auth/Authentication";
import { checkIsPublicRouter } from "@/functions/checkIsPublicRouter";
import { usePathname } from "next/navigation";
import React from "react";

 

export default function Authentication({ children }: { children: React.ReactNode}) {
    const pathname = usePathname()
    const isPublicRoute = checkIsPublicRouter(pathname)
    

    return (
        <div>
            {isPublicRoute && children}
            {!isPublicRoute && (
                <Authenticated>{children}</Authenticated>
            )}
        </div>
    )
}