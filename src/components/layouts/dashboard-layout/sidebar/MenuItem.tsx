import React from 'react'
import { IMenuItem } from './menu.interface'
import Link from 'next/link'

const MenuItem = ({ item }: { item: IMenuItem }) => {
    return (
        <div className=''>
            <Link href={item.link}
                className='flex gap-2.5 items-center py-1.5 mt-2 px-5 transition-colors hover:bg-border rounded-lg'
            >
                <item.icon />
                <span>{item.name}</span>
            </Link>
        </div>
    )
}

export default MenuItem