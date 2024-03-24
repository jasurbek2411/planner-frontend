import { QUERY_KEYS } from "@/constants/query.constants"
import { timeBlockService } from "@/service/time-block.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"


export function useDeletTimeBlock(itemId: string) {

    const queryClient = useQueryClient()

    const { mutate: deleteTimeBlock, isPending: isDeletePending } = useMutation({
        mutationKey: [QUERY_KEYS.DELETE_TIME_BLOCK, itemId],
        mutationFn: (id: string) => timeBlockService.deleteTimeBlock(itemId),
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_TIME_BLOCKS] }) }
    })

    return { deleteTimeBlock, isDeletePending }
}