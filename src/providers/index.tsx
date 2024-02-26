'use client'
import { PropsWithChildren } from "react"
import TanstackProvider from "./tanstack-provider"

const Providers = ({ children }: PropsWithChildren) => {
    return (
        <TanstackProvider>
            {children}
        </TanstackProvider>
    )
}

export default Providers