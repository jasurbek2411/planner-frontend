'use client'
import Loader from "@/components/ui/Loader"
import { formatTime } from "./format-time"
import { useTimer } from "./hooks/useTimer"
import { useTimerActions } from "./hooks/useTimerActions"
import { useTodaySession } from "./hooks/useTodaySession"
import PomodoroRounds from "./rounds/PomodoroRounds"
import { Pause, Play, RefreshCcw } from "lucide-react"
import { useDeleteSession } from "./hooks/useDeleteSession"
import { Button } from "@/components/ui/buttons/Button"
import { useCreateSession } from "./hooks/useCereteSession"
import { useLoadSettings } from "./hooks/useLoadSettings"

const Pomodoro = () => {

    const timerState = useTimer()
    const { sessionResponse, isLoading, workInterval } = useTodaySession(timerState)
    const { deleteSession, isDeletePending } = useDeleteSession(() => timerState.setSecondsLeft(workInterval * 60))
    const { isPending, mutate } = useCreateSession()

    const rounds = sessionResponse?.data.rounds
    const actions = useTimerActions({ ...timerState, rounds })

    return (
        <div className="relative w-80 text-center">
            {!isLoading && (
                <div className="text-7xl font-semibold">{formatTime(timerState.secondsLeft)}</div>
            )}
            {isLoading ? (
                <Loader />
            ) : sessionResponse?.data ? (
                <>
                    <PomodoroRounds activeRound={timerState.activeRound} nextRoundHandler={actions.nextRoundHandler} prevRoundHandler={actions.prevRoundHandler} rounds={sessionResponse.data.rounds} />
                    <button className="mt-6 opacity-80 hover:opacity-100 transition-opacity" onClick={timerState.isRunning ? actions.pauseHandler : actions.playHandler} disabled={actions.isUpdateRoundPending}>
                        {timerState.isRunning ? <Pause size={30} /> : <Play size={30} />}
                    </button>
                    <button onClick={() => {
                        timerState.setIsRunning(false)
                        deleteSession(sessionResponse.data.id)
                    }}
                        className="absolute top-0 right-0 opacity-40 hover:opacity-100 transition-opacity" disabled={isDeletePending}>
                        <RefreshCcw size={19} />
                    </button>
                </>
            ) : (
                <Button onClick={() => mutate()} className="mt-1" disabled={isPending}>
                    Create session
                </Button>
            )}
        </div>
    )
}

export default Pomodoro