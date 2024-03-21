import { QUERY_KEYS } from "@/constants/query.constants"
import { pomodoroSession } from "@/service/pomodoro.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"


export function useCreateSession() {

    const queryClient = useQueryClient()

    const { mutate, isPending } = useMutation({
        mutationKey: [QUERY_KEYS.CREATE_SESSION],
        mutationFn: () => pomodoroSession.createSession(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_TODAY_SESSION] })
        }
    })

    return { mutate, isPending }
}