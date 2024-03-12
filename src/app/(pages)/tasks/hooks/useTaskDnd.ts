import { FILTERS } from "../columns.data";
import { useUpdateTask } from "./useUpdateTask";
import { DropResult } from "@hello-pangea/dnd";

export function useTaskDnd() {
  const { updateTask } = useUpdateTask();

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const destinationComunId = result.destination.droppableId;

    if (destinationComunId === result.source.droppableId) return;

    if (destinationComunId === "completed") {
      updateTask({
        id: result.draggableId,
        data: {
          isCompleted: true,
        },
      });

      return;
    }

    const newCreatedAt = FILTERS[destinationComunId].format();

    updateTask({
      id: result.draggableId,
      data: {
        createdAt: newCreatedAt,
        isCompleted: false,
      },
    });
  };

  return {
    onDragEnd,
  };
}
