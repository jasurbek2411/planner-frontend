import { Heading } from '@/components/ui/Heading'
import { Metadata } from 'next'
import Pomodoro from './Pomodoro'

export const metadata: Metadata = {
    title: 'Pomodor timer',
}

const TimerPage = () => {
    return (
        <div>
            <Heading title='Pomodor title' />
            <Pomodoro />
        </div>
    )
}

export default TimerPage