import { QUERY_KEYS } from "@/constants/query.constants"
import { timeBlockService } from "@/service/time-block.service"
import type { TypeTimeBlockForm } from "@/types/time-block.types"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useCreateTimeBlock() {

    const queryClinet = useQueryClient()

    const { mutate: createTimeBlock, isPending } = useMutation({
        mutationKey: [QUERY_KEYS.CREATE_TIME_BLOCK],
        mutationFn: (data: TypeTimeBlockForm) => timeBlockService.createTimeBlock(data),
        onSuccess: () => {
            queryClinet.invalidateQueries({ queryKey: [QUERY_KEYS.GET_TIME_BLOCKS] })
        }
    })

    return {
        createTimeBlock,
        isPending
    }
}