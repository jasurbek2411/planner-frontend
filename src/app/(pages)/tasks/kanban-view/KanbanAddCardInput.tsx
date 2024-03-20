import type { ITaskResponse } from "@/types/task.types"
import type { Dispatch, SetStateAction } from "react"


interface IKanbanAddRowInput {
    setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
    filterDate?: string
}

const KanbanAddCardInput = ({ filterDate, setItems }: IKanbanAddRowInput) => {

    const addCard = () => {
        setItems(prev => {
            if (!prev) return

            return [
                ...prev,
                {
                    id: '',
                    name: '',
                    isCompleted: false,
                    createdAt: filterDate
                }
            ]
        })
    }

    return (
        <div className='mt-5 '>
            <button onClick={addCard} className="italic opacity-40 text-sm">
                Add task...
            </button>
        </div>
    )
}

export default KanbanAddCardInput