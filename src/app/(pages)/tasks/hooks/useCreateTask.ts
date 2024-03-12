import { QUERY_KEYS } from "@/constants/query.constants"
import { taskService } from "@/service/task.service"
import { TypeTaskFormState } from "@/types/task.types"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useCreateTask() {

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationKey: [QUERY_KEYS.UPDATE_TASK],
        mutationFn: (data: TypeTaskFormState) => taskService.createTask(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TASKS] })
        }
    })

    return {
        createTask: mutate
    }
}