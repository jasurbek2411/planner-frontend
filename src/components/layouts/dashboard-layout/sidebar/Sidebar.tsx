import { COLORS } from '@/constants/color.constants'
import { GanttChartSquare } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import LogOutButton from './Logout.button'
import { MENU } from './menu.data'
import MenuItem from './MenuItem'

const Sidebar = () => {
    return (
        <div className='border-r border-r-border h-full bg-sidebar flex flex-col '>
            <Link href={'/'} className='flex items-center gap-2.5  p-5 border-b-border ' draggable={false}>
                <GanttChartSquare color={COLORS.primary} size={28} />
                <span className='text-2xl font-bold  relative'>Planner</span>
            </Link>
            <div className='w-full h-[1px] bg-border my-2'></div>
            <div className='p-3 relative'>
                <LogOutButton />
                {
                    MENU.map((item) => (
                        <MenuItem item={item} key={item.link} />
                    ))
                }
            </div>

        </div>
    )
}

export default Sidebar