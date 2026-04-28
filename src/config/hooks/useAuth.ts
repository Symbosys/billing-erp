import { useMutation, useQueryClient } from "@tanstack/react-query";
import API from "../api";

export const useUpdatePassword = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { currentPassword: string; newPassword: string }) => {
      const response = await API.patch("/auth/me/password", data);
      return response.data;
    },
    onSuccess: () => {
      // Force user profile refresh if needed, though usually not strictly required for a password change.
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};
