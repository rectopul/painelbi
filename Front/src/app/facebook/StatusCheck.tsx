import { Ban, Check } from "lucide-react"

interface StatusCheck {
    status: string
}

export function StatusCheck({ status }: StatusCheck) {
    return (
        <span 
            data-status={status}
            className="
                rounded-full text-white w-8 h-8 mr-2
                flex items-center justify-center
                data-[status=ACTIVE]:bg-green-500
                data-[status=CLOSED]:bg-red-500
            "
        >
            {status == 'ACTIVE' && <Check size={18} strokeWidth={2} />}
            {status == 'CLOSED' && <Ban size={18} strokeWidth={2} />}
        </span>
    )
}