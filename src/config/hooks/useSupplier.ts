import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import API from "../api";

export interface Supplier {
  id: string;
  name: string;
  phone: string;
}

interface SupplierResponse {
  success: boolean;
  message: string;
  data: {
    suppliers?: Supplier[];
    supplier?: Supplier;
    count?: number;
  };
}

// ─────────────────────────────────────────────
// Hook: Fetch All Suppliers
// ─────────────────────────────────────────────
export const useSuppliers = () => {
  return useQuery({
    queryKey: ["suppliers"],
    queryFn: async (): Promise<Supplier[]> => {
      const { data } = await API.get<SupplierResponse>("/supplier");
      return data.data.suppliers || [];
    },
  });
};

// ─────────────────────────────────────────────
// Hook: Create Supplier
// ─────────────────────────────────────────────
export const useCreateSupplier = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newSupplier: Partial<Supplier>) => {
      const { data } = await API.post<SupplierResponse>("/supplier", newSupplier);
      return data.data.supplier;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
    },
  });
};

// ─────────────────────────────────────────────
// Hook: Update Supplier
// ─────────────────────────────────────────────
export const useUpdateSupplier = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updateData }: Partial<Supplier> & { id: string }) => {
      const { data } = await API.patch<SupplierResponse>(`/supplier/${id}`, updateData);
      return data.data.supplier;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
    },
  });
};

// ─────────────────────────────────────────────
// Hook: Delete Supplier
// ─────────────────────────────────────────────
export const useDeleteSupplier = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await API.delete(`/supplier/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
    },
  });
};
