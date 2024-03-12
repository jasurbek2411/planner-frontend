import { QUERY_KEYS } from "@/constants/query.constants"
import { taskService } from "@/service/task.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useDeleteTask() {

    const queryClient = useQueryClient()

    const { mutate, isPending } = useMutation({
        mutationKey: [QUERY_KEYS.DELETE_TASK],
        mutationFn: (id: string) => taskService.deleteTask(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TASKS] })
        }
    })

    return {
        deleteTask: mutate,
        isDeletePending: isPending
    }
}