'use client'
import { DASHBOARD_PAGES } from '@/config/pages-url.config'
import { authService } from '@/service/auth.service'
import { IAuthForm } from '@/types/user.types'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

const Auth = () => {
    const { register, handleSubmit, reset } = useForm<IAuthForm>({
        mode: 'onChange'
    })

    const [isLoginForm, setIsLoginForm] = useState(false)

    const { push } = useRouter()
    const { mutate } = useMutation({
        mutationKey: ['auth'],
        mutationFn: (data: IAuthForm) => authService.main(isLoginForm ? 'login' : 'register', data),
        onSuccess() {
            toast.success('Successfully login!')
            reset()
            push(DASHBOARD_PAGES.HOME)
        }
    })

    const onSubmit: SubmitHandler<IAuthForm> = (data) => { mutate(data) }
    return (
        <div className='flex min-h-screen'>
            <form className='w-1/4  m-auto shadow  bg-sidebar rounded-xl p-4' onSubmit={handleSubmit(onSubmit)}>
                {/* HEADING */}
                {/* Fields */}
                <div className='flex items-center gap-5 justify-center'>
                    {/* BUTTONS */}
                </div>
            </form>
        </div>
    )
}

export default Auth