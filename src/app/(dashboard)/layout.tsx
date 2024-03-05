import DashboardLayout from '@/components/layouts/dashboard-layout/DashboardLayout'
import React, { PropsWithChildren } from 'react'

const Layout = ({ children }: PropsWithChildren<unknown>) => {
    return (
        <DashboardLayout>
            {children}
        </DashboardLayout>
    )
}

export default Layout