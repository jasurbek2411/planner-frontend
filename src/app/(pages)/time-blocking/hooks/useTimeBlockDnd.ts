import { QUERY_KEYS } from "@/constants/query.constants";
import { timeBlockService } from "@/service/time-block.service";
import { ITimeBlockRespnose } from "@/types/time-block.types";
import { DragEndEvent, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";


export function useTimeBlockDnd(items: ITimeBlockRespnose[] | undefined, setItems: Dispatch<SetStateAction<ITimeBlockRespnose[] | undefined>>) {

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor)
    )

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationKey: [QUERY_KEYS.UPDATE_ORDER_TIME_BLOCK],
        mutationFn: (ids: string[]) => timeBlockService.updateOrderTimeBlock(ids),
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_TIME_BLOCKS] }) }
    })

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event

        if (active.id !== over?.id && items) {
            const oldIndex = items.findIndex(item => item.id === active.id)
            const newIndex = items.findIndex(item => item.id === (over?.id || ''))

            if (oldIndex !== -1 && newIndex !== -1) {
                const newItems = arrayMove(items, oldIndex, newIndex)
                setItems(newItems)
                mutate(newItems.map(item => item.id))
            }
        }
    }

    return { handleDragEnd, sensors }
}