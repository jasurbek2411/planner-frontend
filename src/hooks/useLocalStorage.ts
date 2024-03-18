import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

interface IUseLocalStorage<T> {
    key: string
    defaultValue: T
}

export function useLocalStorage<T>({ defaultValue, key }: IUseLocalStorage<T>): [
    T, Dispatch<SetStateAction<T>>, boolean
] {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [value, setValue] = useState<T>(defaultValue)

    const isMounted = useRef(false)

    useEffect(() => {
        try {
            const item = window.localStorage.getItem(key)
            if (item) {
                setValue(JSON.parse(item))
            }
        } catch (e) {
            const error = e as Error
            console.log(error.message)
        } finally {
            setIsLoading(false)
        }
        return () => {
            isMounted.current = false
        }
    }, [key])

    useEffect(() => {
        if (isMounted.current) {
            window.localStorage.setItem(key, JSON.stringify(value))
        } else {
            isMounted.current = true
        }
    }, [key, value])

    return [value, setValue, isLoading]
}