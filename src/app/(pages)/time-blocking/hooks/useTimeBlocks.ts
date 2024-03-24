import { QUERY_KEYS } from "@/constants/query.constants"
import { timeBlockService } from "@/service/time-block.service"
import { ITimeBlockRespnose } from "@/types/time-block.types"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"


export function useTimeBlocks() {

    const { data, isLoading } = useQuery({
        queryKey: [QUERY_KEYS.GET_TIME_BLOCKS],
        queryFn: () => timeBlockService.getTimeBlock()
    })

    const [items, setItems] = useState<ITimeBlockRespnose[] | undefined>(data?.data)

    useEffect(() => {
        setItems(data?.data)
    }, [data?.data])

    return { items, setItems, isLoading }
}