import { QUERY_KEYS } from "@/constants/query.constants";
import { userService } from "@/service/user.service";
import { TypeUserForm } from "@/types/user.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUpdateSettings() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: [QUERY_KEYS.UPDATE_SETTINGS],
    mutationFn: (data: TypeUserForm) => userService.update(data),
    onSuccess: () => {
      toast.success("Successfully update profile!");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PROFILE] });
    },
  });
  return {
    mutate,
    isPending,
  };
}
