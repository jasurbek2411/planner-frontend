'use client'

import { Kanban, ListTodo } from 'lucide-react'
import type { TypeView } from './TasksView'
import cn from 'clsx'
import { Dispatch, SetStateAction } from 'react'

interface ISwitcherView {
    type: TypeView
    setType: Dispatch<SetStateAction<TypeView>>
}

const SwitcherView = ({ type, setType }: ISwitcherView) => {
    return (
        <div className='flex items-center gap-4 mb-5'>
            <button className={cn(
                'flex items-center gap-1', {
                'opacity-40': type === "kanban"
            }
            )} onClick={() => setType('list')}>
                <ListTodo />
            </button>

            <button className={cn(
                'flex items-center gap-1', {
                'opacity-40': type === 'list'
            }
            )} onClick={() => setType("kanban")}>
                <Kanban />
            </button>
        </div >
    )
}

export default SwitcherView