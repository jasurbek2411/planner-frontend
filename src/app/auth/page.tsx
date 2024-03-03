import { Metadata } from 'next'
import React from 'react'
import Auth from './Auth'

export const metadata: Metadata = {
    title: 'Auth'
}


const AuthPage = () => {
    return (
        <Auth />
    )
}

export default AuthPage