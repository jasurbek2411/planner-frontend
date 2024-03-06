import React from 'react'
import Settings from './Settings'
import { Metadata } from 'next'
import { Heading } from '@/components/ui/Heading'

export const metadata: Metadata = {
    title: 'Settings'
}

const SettingPage = () => {
    return (
        <div>
            <Heading title='Settings' />
            <Settings />
        </div>
    )
}

export default SettingPage