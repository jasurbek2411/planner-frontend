import { TypeTaskFormState } from "@/types/task.types"
import debounce from "lodash.debounce"
import { useCallback, useEffect } from "react"
import { useCreateTask } from "./useCreateTask"
import { useUpdateTask } from "./useUpdateTask"
import { UseFormWatch } from "react-hook-form"

interface IUseTaskDebounce {
    watch: UseFormWatch<TypeTaskFormState>
    itemId: string
}

export function useTaskDebounce({ watch, itemId }: IUseTaskDebounce) {

    const { createTask } = useCreateTask()
    const { updateTask } = useUpdateTask()

    const debounceCreateTask = useCallback(
        debounce((formData: TypeTaskFormState) => {
            createTask(formData)
        }, 500), [])

    const debounceUpdateTask = useCallback(
        debounce((formData: TypeTaskFormState) => {
            updateTask({ id: itemId, data: formData })
        }, 500), [])

    useEffect(() => {
        const { unsubscribe } = watch(formData => {

            if (itemId) {
                debounceUpdateTask({ ...formData, priority: formData.priority || undefined })
            } else {
                debounceCreateTask(formData)
            }

        })

        return () => {
            unsubscribe()
        }
    }, [watch(), debounceUpdateTask, debounceCreateTask])


}