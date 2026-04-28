import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import API from "../api";
import type { BillItem } from "./useBill";

interface BillItemResponse {
  success: boolean;
  message: string;
  data: {
    items?: BillItem[];
    item?: BillItem;
  };
}

// ─────────────────────────────────────────────
// Hook: Fetch All Bill Items
// ─────────────────────────────────────────────
export const useBillItems = () => {
  return useQuery({
    queryKey: ["billItems"],
    queryFn: async (): Promise<BillItem[]> => {
      const { data } = await API.get<BillItemResponse>("/bill-item");
      return data.data.items || [];
    },
  });
};

// ─────────────────────────────────────────────
// Hook: Create Bill Item
// ─────────────────────────────────────────────
export const useCreateBillItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newItem: { billId: string; productId: string; quantity: number; price: number }) => {
      const { data } = await API.post<BillItemResponse>("/bill-item", newItem);
      return data.data.item;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["billItems"] });
      queryClient.invalidateQueries({ queryKey: ["bills"] });
    },
  });
};

// ─────────────────────────────────────────────
// Hook: Update Bill Item
// ─────────────────────────────────────────────
export const useUpdateBillItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updateData }: Partial<BillItem> & { id: string }) => {
      const { data } = await API.patch<BillItemResponse>(`/bill-item/${id}`, updateData);
      return data.data.item;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["billItems"] });
      queryClient.invalidateQueries({ queryKey: ["bills"] });
    },
  });
};

// ─────────────────────────────────────────────
// Hook: Delete Bill Item
// ─────────────────────────────────────────────
export const useDeleteBillItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await API.delete(`/bill-item/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["billItems"] });
      queryClient.invalidateQueries({ queryKey: ["bills"] });
    },
  });
};
