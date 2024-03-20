import type { ITaskResponse, TypeTaskFormState } from "@/types/task.types"
import type { Dispatch, SetStateAction } from "react"
import { Controller, useForm } from "react-hook-form"
import { useTaskDebounce } from "../hooks/useTaskDebounce"
import { GripVertical, Loader, Trash } from "lucide-react"
import Checkbox from "@/components/ui/checkbox"
import { TransparentField } from "@/components/ui/fields/TransparentField"
import { DatePicker } from "@/components/ui/task-edit/date-picker/DatePicker"
import { SingleSelect } from "@/components/ui/task-edit/SingleSelect"
import { useDeleteTask } from "../hooks/useDeleteTask"
import cn from 'clsx'
import styles from './KanbanView.module.scss'


interface IKanbanCard {
  item: ITaskResponse
  setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}


const KanbanCard = ({ item, setItems }: IKanbanCard) => {

  const { deleteTask, isDeletePending } = useDeleteTask()

  const { register, control, watch } = useForm<TypeTaskFormState>({
    defaultValues: {
      name: item.name,
      isCompleted: item.isCompleted,
      createdAt: item.createdAt,
      priority: item.priority
    }
  })

  useTaskDebounce({ watch, itemId: item.id })

  return (
    <div className={
      cn(styles.card,
        {
          [styles.completed]: watch('isCompleted')
        },
        'animation-opacity'
      )
    }>

      <div className={styles.cardHeader}>
        <button aria-describedby="todo-item">
          <GripVertical className={styles.grip} />
        </button>

        <Controller
          control={control}
          name='isCompleted'
          render={({ field: { value, onChange } }) => (
            <Checkbox onChange={onChange} value={value} />
          )}
        />

        <TransparentField {...register('name')} />
      </div>

      <div className={styles.cardBody}>

        <Controller
          control={control}
          name="createdAt"
          render={({ field: { onChange, value } }) => (
            <DatePicker onChange={onChange} value={value || ''} position="left" />
          )}
        />

        <Controller
          control={control}
          name="priority"
          render={({ field: { onChange, value } }) => (
            <SingleSelect data={['high', 'medium', 'low'].map((item) => ({ value: item, label: item }))} onChange={onChange} value={value || ''} />
          )}
        />

      </div>

      <div className={styles.cardActions}>
        <button className="opacity-50 transition-opacity hover:opacity-100" onClick={() => item.id ? deleteTask(item.id) : setItems(prev => prev?.slice(0, -1))}>
          {
            isDeletePending ? <Loader size={15} /> : <Trash size={15} />
          }
        </button>

      </div>

    </div>
  )
}

export default KanbanCard