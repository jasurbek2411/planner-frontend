import { QUERY_KEYS } from "@/constants/query.constants";
import { timeBlockService } from "@/service/time-block.service";
import { TypeTimeBlockForm } from "@/types/time-block.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateTimeBlock(key?: string) {

    const queryClient = useQueryClient()

    const { mutate: updateTimeBlock } = useMutation({
        mutationKey: [QUERY_KEYS.UPDATE_TIME_BLOCK, key],
        mutationFn: ({ id, data }: { id: string, data: TypeTimeBlockForm }) => timeBlockService.updateTimeBlock(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_TIME_BLOCKS] })
        }
    })

    return {
        updateTimeBlock
    }
}