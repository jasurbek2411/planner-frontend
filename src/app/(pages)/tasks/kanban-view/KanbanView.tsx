'use client'

import { DragDropContext } from "@hello-pangea/dnd"
import { useTasks } from "../hooks/useTasks"
import { useTaskDnd } from "../hooks/useTaskDnd"
import styles from './KanbanView.module.scss'
import KanbanColumn from "./KanbanColumn"
import { COLUMNS } from "../columns.data"


const KanbanView = () => {

  const { items, setItems } = useTasks()
  const { onDragEnd } = useTaskDnd()



  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.board}>
        {
          COLUMNS.map((column) => (
            <KanbanColumn key={column.id} value={column.id} label={column.label} items={items} setItems={setItems} />)
          )
        }
      </div>
    </DragDropContext>
  )
}

export default KanbanView