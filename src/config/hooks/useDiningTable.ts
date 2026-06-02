import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import API from "../api";

export interface DiningTable {
  id: string;
  tableName: string;
  capacity: number;
  available: boolean;
  status: "Active" | "Inactive";
  createdAt: string;
  updatedAt: string;
}

interface DiningTableResponse {
  success: boolean;
  message: string;
  data: {
    tables?: DiningTable[];
    table?: DiningTable;
  };
}

export const useDiningTables = () => {
  return useQuery({
    queryKey: ["diningTables"],
    queryFn: async (): Promise<DiningTable[]> => {
      const { data } = await API.get<DiningTableResponse>("/dining-table");
      return data.data.tables || [];
    },
  });
};

export const useCreateDiningTable = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newTable: { tableName: string; capacity: number; status?: "Active" | "Inactive" }) => {
      const { data } = await API.post<DiningTableResponse>("/dining-table", newTable);
      return data.data.table;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["diningTables"] });
    },
  });
};

export const useUpdateDiningTable = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updateData }: { id: string; tableName?: string; capacity?: number; available?: boolean; status?: "Active" | "Inactive" }) => {
      const { data } = await API.patch<DiningTableResponse>(`/dining-table/${id}`, updateData);
      return data.data.table;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["diningTables"] });
    },
  });
};

export const useDeleteDiningTable = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await API.delete(`/dining-table/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["diningTables"] });
    },
  });
};
