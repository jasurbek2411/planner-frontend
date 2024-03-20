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
import styles from './ListView.module.scss'


interface IListRow {
  item: ITaskResponse
  setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}


const ListRow = ({ item, setItems }: IListRow) => {

  const { deleteTask, isDeletePending } = useDeleteTask()

  const { register, control, watch } = useForm<TypeTaskFormState>({
    defaultValues: {
      name: item.name,
      isCompleted: item.isCompleted,
      createdAt: item.createdAt,
      priority: item.priority
    }
  })

  useTaskDebounce({ watch, itemId: item?.id })

  return (
    <div className={
      cn(styles.row,
        watch('isCompleted') ? styles.completed : '', 'animation-opacity')
    }>

      <div>
        <span className="inline-flex itmes-center gap-2.5 w-full">
          <button className="flex items-center gap-3" aria-describedby="todo-item">
            <GripVertical className={styles.grip} />
            <Controller control={control}
              name="isCompleted" render={({ field: { value, onChange } }) => (
                <Checkbox checked={value} onChange={onChange} />
              )} />
          </button>
          <TransparentField {...register('name')} />
        </span>
      </div>

      <div>
        <Controller control={control} name="createdAt" render={({ field: { value, onChange } }) => (
          < DatePicker onChange={onChange} value={value || ''} />
        )} />
      </div>

      <div className="capitalize">
        <Controller
          control={control}
          name="priority"
          render={({ field: { value, onChange } }) => (
            <SingleSelect data={['high', 'medium', 'low'].map((item) => ({
              value: item,
              label: item
            }))}
              onChange={onChange}
              value={value || ''}
            />
          )}
        />
      </div>

      <div>
        <button className="opacity-50 transition-opacity  hover:opacity-100" onClick={() => item.id ? deleteTask(item.id) : setItems(prev => prev?.slice(0, -1))}>
          {
            isDeletePending ? <Loader size={15} className="animate-spin" /> : <Trash size={15} />
          }
        </button>
      </div>

    </div>
  )
}

export default ListRow