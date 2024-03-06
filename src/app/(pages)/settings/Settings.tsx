'use client'

import { TypeUserForm } from "@/types/user.types"
import { SubmitHandler, useForm } from "react-hook-form"
import { useInitialData } from "./hooks/useInitialData"
import { useUpdateSettings } from "./hooks/useUpdateSettings"
import { Field } from "@/components/ui/fields/Field"
import { Button } from "@/components/ui/buttons/Button"

const Settings = () => {

    const { register, handleSubmit, reset } = useForm<TypeUserForm>({
        mode: 'onChange'
    })

    useInitialData(reset)
    const { isPending, mutate } = useUpdateSettings()

    const onSubmit: SubmitHandler<TypeUserForm> = data => {
        const { password, ...reset } = data

        mutate({
            ...reset,
            password: password || undefined
        })
    }

    return (
        <form className="w-2/4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-10">
                <div>
                    <Field
                        id='email'
                        label='Email:'
                        placeholder='Enter email:'
                        type='email'
                        extra='mb-4'
                        {...register('email', { required: 'Email is required!' })}
                    />
                    <Field
                        id='name'
                        label='Name:'
                        placeholder='Enter name:'
                        type='text'
                        extra='mb-4'
                        {...register('name')}
                    />
                    <Field
                        id='password'
                        label='Password:'
                        placeholder='Enter password:'
                        type='password'
                        extra='mb-4'
                        {...register('password')}
                    />
                </div>
                <div>
                    <Field
                        id='workInterval'
                        label='Work interval (min.):'
                        placeholder='Enter work interval (min.):'
                        isNumber
                        extra='mb-4'
                        {...register('workInterval', { valueAsNumber: true })}
                    />
                    <Field
                        id='breakInterval'
                        label='Break interval (min.):'
                        placeholder='Enter break interval (min.):'
                        isNumber
                        extra='mb-4'
                        {...register('breakInterval', { valueAsNumber: true })}
                    />
                    <Field
                        id='intervalsCount'
                        label='Intervals count (max 10):'
                        placeholder='Enter intervals count (max 10):'
                        isNumber
                        extra='mb-4'
                        {...register('intervalsCount', { valueAsNumber: true })}
                    />
                </div>
            </div>
            <Button type="submit" disabled={isPending}>
                Save
            </Button>
        </form>
    )
}

export default Settings