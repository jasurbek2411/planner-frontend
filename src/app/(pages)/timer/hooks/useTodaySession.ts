import { Dispatch, SetStateAction, useEffect } from "react";
import { QUERY_KEYS } from "@/constants/query.constants";
import { pomodoroSession } from "@/service/pomodoro.service";
import { useQuery } from "@tanstack/react-query";
import { IPomodoroSessionResponse } from "@/types/pomodoro.types";
import { useLoadSettings } from "./useLoadSettings";

interface IUseTodaySession {
    setActiveRound: Dispatch<SetStateAction<IPomodoroSessionResponse | undefined>>
    setSecondsLeft: Dispatch<SetStateAction<number>>
    workInterval: number
}


export function useTodaySession({ setActiveRound, setSecondsLeft, workInterval }: IUseTodaySession) {

    const { data: sessionResponse, isLoading, refetch, isSuccess } = useQuery({
        queryKey: [QUERY_KEYS.GET_TODAY_SESSION],
        queryFn: () => pomodoroSession.getTodaySession()
    })

    const rounds = sessionResponse?.data.rounds

    useEffect(() => {
        if (isSuccess && rounds) {
            const activeRound = rounds?.find(round => !round.isCompleted)
            setActiveRound(activeRound)

            if (activeRound && activeRound.totalSeconds !== 0) {
                setSecondsLeft(workInterval - activeRound.totalSeconds)
            }
        }

    }, [isSuccess, rounds])

    return { sessionResponse, isLoading, refetch, isSuccess }
}