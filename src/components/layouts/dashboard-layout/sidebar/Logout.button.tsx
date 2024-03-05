'use client'

import { authService } from "@/service/auth.service"
import { useMutation } from "@tanstack/react-query"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

const LogOutButton = () => {

    const router = useRouter()

    const { mutate } = useMutation({
        mutationKey: ['logout'],
        mutationFn: () => authService.logOut(),
        onSuccess: () => {
            router.push('/auth')
        }
    })
    return (
        <div className="absolute top-1 right-1">
            <button className="opacity-20 hover:opacity-100 transition-opacity duration-300" onClick={() => mutate()}>
                <LogOut size={20} />
            </button>
        </div>
    )
}

export default LogOutButton