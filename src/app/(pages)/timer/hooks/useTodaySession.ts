import { useEffect } from "react";
import { QUERY_KEYS } from "@/constants/query.constants";
import { pomodoroSession } from "@/service/pomodoro.service";
import { useQuery } from "@tanstack/react-query";
import { useLoadSettings } from "./useLoadSettings";
import { ITimerState } from "../timer.types";


export function useTodaySession({ setActiveRound, setSecondsLeft }: ITimerState) {

    const { workInterval } = useLoadSettings()

    const { data: sessionResponse, isLoading, isSuccess } = useQuery({
        queryKey: [QUERY_KEYS.GET_TODAY_SESSION],
        queryFn: () => pomodoroSession.getTodaySession()
    })

    const rounds = sessionResponse?.data.rounds

    useEffect(() => {
        if (isSuccess && rounds) {
            const activeRound = rounds?.find(round => !round.isCompleted)
            setActiveRound(activeRound)

            if (activeRound && activeRound.totalSeconds !== 0) {
                setSecondsLeft(activeRound.totalSeconds)
            }
        }

    }, [isSuccess, rounds])

    return { sessionResponse, isLoading, workInterval }
}