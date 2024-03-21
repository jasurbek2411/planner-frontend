import { QUERY_KEYS } from "@/constants/query.constants"
import { pomodoroSession } from "@/service/pomodoro.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"


export function useDeleteSession(onDeleteSuccess: () => void) {

    const queryClient = useQueryClient()

    const { mutate: deleteSession, isPending: isDeletePending } = useMutation({
        mutationKey: [QUERY_KEYS.DELETE_SESSON],
        mutationFn: (id: string) => pomodoroSession.deleteSession(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_TODAY_SESSION] })
            onDeleteSuccess()
        }
    })

    return { deleteSession, isDeletePending }
}