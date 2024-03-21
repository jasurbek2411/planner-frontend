import { QUERY_KEYS } from "@/constants/query.constants";
import { pomodoroSession } from "@/service/pomodoro.service";
import { TypePomodoroRoundState } from "@/types/pomodoro.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export function useUpdateRounds() {
    const queryClient = useQueryClient()

    const { mutate: updateRound, isPending: isUpdateRoundPending } = useMutation({
        mutationKey: [QUERY_KEYS.UPDATE_ROUNDS],
        mutationFn: ({ id, data }: { id: string, data: TypePomodoroRoundState }) => pomodoroSession.updateRound(id, data),
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_TODAY_SESSION] })
        }
    })

    return {
        updateRound, isUpdateRoundPending
    }
}