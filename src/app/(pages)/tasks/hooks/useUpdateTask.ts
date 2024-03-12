import { QUERY_KEYS } from "@/constants/query.constants";
import { taskService } from "@/service/task.service";
import { TypeTaskFormState } from "@/types/task.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateTask(key?: string) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: [QUERY_KEYS.UPDATE_TASK, key],
    mutationFn: ({ id, data }: { id: string; data: TypeTaskFormState }) =>
      taskService.updateTask(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.TASKS],
      });
    },
  });

  return {
    updateTask: mutate,
  };
}
