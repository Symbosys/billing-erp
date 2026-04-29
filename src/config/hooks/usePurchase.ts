import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import API from "../api";

export interface Purchase {
  id: string;
  supplierId: string;
  total: number;
}

interface PurchaseResponse {
  success: boolean;
  message: string;
  data: {
    purchases?: Purchase[];
    purchase?: Purchase;
    count?: number;
  };
}

// ─────────────────────────────────────────────
// Hook: Fetch All Purchases
// ─────────────────────────────────────────────
export const usePurchases = () => {
  return useQuery({
    queryKey: ["purchases"],
    queryFn: async (): Promise<Purchase[]> => {
      const { data } = await API.get<PurchaseResponse>("/purchase");
      return data.data.purchases || [];
    },
  });
};

// ─────────────────────────────────────────────
// Hook: Create Purchase
// ─────────────────────────────────────────────
export const useCreatePurchase = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newPurchase: Partial<Purchase>) => {
      const { data } = await API.post<PurchaseResponse>("/purchase", newPurchase);
      return data.data.purchase;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["purchases"] });
    },
  });
};

// ─────────────────────────────────────────────
// Hook: Update Purchase
// ─────────────────────────────────────────────
export const useUpdatePurchase = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updateData }: Partial<Purchase> & { id: string }) => {
      const { data } = await API.patch<PurchaseResponse>(`/purchase/${id}`, updateData);
      return data.data.purchase;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["purchases"] });
    },
  });
};

// ─────────────────────────────────────────────
// Hook: Delete Purchase
// ─────────────────────────────────────────────
export const useDeletePurchase = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await API.delete(`/purchase/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["purchases"] });
    },
  });
};
