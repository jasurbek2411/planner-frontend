import { Heading } from '@/components/ui/Heading'
import { Metadata } from 'next'
import React from 'react'
import Statistics from './Statistics'

export const metadata: Metadata = {
    title: 'Dashboard'
}

const DashboardPage = () => {
    return (
        <div>
            <Heading title='Statistics' />
            <Statistics />
        </div>
    )
}

export default DashboardPage