import { useIsFetching, useIsMutating } from '@tanstack/react-query'
import React from 'react'

const GlobalLoader = () => {
    const isMutating = useIsMutating()
    const isFetching = useIsFetching()
    return isMutating || isFetching ? (
        <div className='fixed top-5 right-5 z-50'></div>
    ) : null
}

export default GlobalLoader