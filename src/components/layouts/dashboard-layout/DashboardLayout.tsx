import React, { PropsWithChildren } from 'react'
import Sidebar from './sidebar/Sidebar'
import Header from './header/Header'

const DashboardLayout = ({ children }: PropsWithChildren<unknown>) => {
    return (
        <div className='grid min-h-screen 2xl:grid-cols-[1.1fr_6fr] grid-cols-[1.2fr_6fr] '>
            <Sidebar />
            <main className='p-9 overflow-x-hidden max-h-screen relative'>
                <Header />
                {children}
            </main>
        </div>
    )
}

export default DashboardLayout