import { QUERY_KEYS } from "@/constants/query.constants";
import { taskService } from "@/service/task.service";
import { ITaskResponse } from "@/types/task.types";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export function useTasks() {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.TASKS],
    queryFn: () => taskService.getTasks(),
  });

  const [items, setItems] = useState<ITaskResponse[] | undefined>(data?.data);

  useEffect(() => {
    setItems(data?.data);
  }, [data?.data]);

  return {
    data,
    isLoading,
    setItems,
  };
}
