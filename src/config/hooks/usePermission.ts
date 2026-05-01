import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import API from "../api";

export interface Permission {
  id: string;
  name: string;
  description?: string;
}

interface PermissionResponse {
  success: boolean;
  message: string;
  data: {
    permissions?: Permission[];
    permission?: Permission;
    count?: number;
  };
}

export const usePermissions = () => {
  return useQuery({
    queryKey: ["permissions"],
    queryFn: async (): Promise<Permission[]> => {
      const { data } = await API.get<PermissionResponse>("/permission");
      return data.data.permissions || [];
    },
  });
};

export const useCreatePermission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newPermission: Partial<Permission>) => {
      const { data } = await API.post<PermissionResponse>("/permission", newPermission);
      return data.data.permission;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["permissions"] });
    },
  });
};

export const useUpdatePermission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updateData }: Partial<Permission> & { id: string }) => {
      const { data } = await API.patch<PermissionResponse>(`/permission/${id}`, updateData);
      return data.data.permission;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["permissions"] });
    },
  });
};

export const useDeletePermission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await API.delete(`/permission/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["permissions"] });
    },
  });
};
