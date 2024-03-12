import { Heading } from '@/components/ui/Heading'
import { Metadata } from 'next'
import React from 'react'
import TasksView from './TasksView'

export const metadata: Metadata = {
    title: "Tasks"
}

const TaskPage = () => {
    return (
        <div>
            <Heading title='Tasks' />
            <TasksView />
        </div>
    )
}

export default TaskPage