import { useQuery } from "@tanstack/react-query";
import { userService } from "@/service/user.service";
import { QUERY_KEYS } from "@/constants/query.constants";

export function useProfile() {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: [QUERY_KEYS.PROFILE],
    queryFn: async () => await userService.getProfile(),
  });

  return { data, isLoading, isSuccess };
}
