"use client"

import { IconsProps } from "@/@types/types"
//enable-background:new 0 0 512 512

const MainCalendar = ({ size, className, fill }: IconsProps) => {
    return (
        <svg 
            className={className} 
            width={size || 512}
            height={size || 512}
            viewBox="0 0 16 16"
        >
            <path d="M15 2h-2V0h-2v2H9V0H7v2H5V0H3v2H1a1 1 0 00-1 1v12a1 1 0 001 1h14a1 1 0 001-1V3a1 1 0 00-1-1zm-1 12H2V6h12v8z" fill={fill} ></path>
        </svg>
    )
}

const AsanaIcon = ({ size, className, fill }: IconsProps) => {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            version="1.1" 
            width={size || 512}
            height={size || 512}
            x="0" 
            y="0" 
            viewBox="0 0 24 24"
            className={className}
        >
            <g><g fill="#000"><path d="M12 3.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zM7 12.5a3.75 3.75 0 1 0 0 7.498A3.75 3.75 0 0 0 7 12.5zM17 12.5a3.75 3.75 0 1 0 0 7.499 3.75 3.75 0 0 0 0-7.499z" fill={fill || `#000000`} opacity="1" data-original={fill || `#000000`} className=""></path></g></g>
        </svg>
    )
}
const FaceIcon = ({ size, className,fill }: IconsProps) => {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            version="1.1" 
            width={size || 512} 
            height={size || 512} 
            x="0" 
            y="0" 
            viewBox={`0 0 512 512`}
            className={className}
        >
            <g><path d="M448 0H64C28.704 0 0 28.704 0 64v384c0 35.296 28.704 64 64 64h384c35.296 0 64-28.704 64-64V64c0-35.296-28.704-64-64-64z"  fill="#1976d2" data-original="#1976d2"></path><path d="M432 256h-80v-64c0-17.664 14.336-16 32-16h32V96h-64c-53.024 0-96 42.976-96 96v64h-64v80h64v176h96V336h48l32-80z" fill={fill || `#fafafa`} data-original={fill || `#fafafa`}></path></g>
        </svg>
    )
}

export { FaceIcon, AsanaIcon, MainCalendar }