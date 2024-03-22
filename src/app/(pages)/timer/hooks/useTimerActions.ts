import { IPomodoroRoundResponse } from "@/types/pomodoro.types"
import { ITimerState } from "../timer.types"
import { useLoadSettings } from "./useLoadSettings"
import { useTodaySession } from "./useTodaySession"
import { useUpdateRounds } from "./useUpdateRounds"

type TypeUseTimerActions = ITimerState & {
    rounds: IPomodoroRoundResponse[] | undefined
}


export function useTimerActions({ activeRound, secondsLeft, setIsRunning, rounds, setActiveRound }: TypeUseTimerActions) {

    const { updateRound, isUpdateRoundPending } = useUpdateRounds()
    const { workInterval } = useLoadSettings()

    const pauseHandler = () => {
        setIsRunning(false)

        if (!activeRound?.id) return

        updateRound({
            id: activeRound?.id, data: {
                totalSeconds: secondsLeft,
                isCompleted: Math.floor(secondsLeft / 60) >= workInterval
            }
        })

    }

    const playHandler = () => {
        setIsRunning(true)
    }

    const nextRoundHandler = () => {
        if (!activeRound?.id) return

        updateRound({ id: activeRound?.id, data: { isCompleted: true, totalSeconds: workInterval * 60 } })
    }

    const prevRoundHandler = () => {
        const filterRounds = rounds?.filter(round => round.isCompleted)
        const lastCompletedRound = filterRounds && filterRounds[filterRounds?.length - 1]

        if (!lastCompletedRound?.id) return

        updateRound({ id: lastCompletedRound?.id, data: { isCompleted: false, totalSeconds: 0 } })
        setActiveRound(lastCompletedRound)
    }

    return { isUpdateRoundPending, pauseHandler, playHandler, nextRoundHandler, prevRoundHandler }
}