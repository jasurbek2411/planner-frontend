import { useQuery } from "@tanstack/react-query";
import { userService } from "@/service/user.service";

export function useProfile() {
  const { data, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => await userService.getProfile(),
  });

  return { data, isLoading };
}
