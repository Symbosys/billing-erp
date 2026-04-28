import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import API from "../api";

export interface BillItem {
  id: string;
  billId: string;
  productId: string;
  quantity: number;
  price: number;
  product?: any;
}

export interface Bill {
  id: string;
  customerId: string;
  customer?: any;
  items?: BillItem[];
  totalAmount: number;
  paymentMethod: "CASH" | "CARD" | "UPI" | "OTHER";
  createdAt: string;
  updatedAt: string;
}

interface BillResponse {
  success: boolean;
  message: string;
  data: {
    bills?: Bill[];
    bill?: Bill;
    pagination?: { total: number; page: number; limit: number; totalPages: number };
  };
}

export const useBills = (page = 1, limit = 100) => {
  return useQuery({
    queryKey: ["bills", page, limit],
    queryFn: async (): Promise<Bill[]> => {
      const { data } = await API.get<BillResponse>(`/bill?page=${page}&limit=${limit}`);
      return data.data.bills || [];
    },
  });
};

export const useCreateBill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newBill: { customerId: string; items: { productId: string; quantity: number; price: number }[]; totalAmount: number; paymentMethod: "CASH" | "CARD" | "UPI" | "OTHER" }) => {
      const { data } = await API.post<BillResponse>("/bill", newBill);
      return data.data.bill;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bills"] });
    },
  });
};

export const useDeleteBill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await API.delete(`/bill/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bills"] });
    },
  });
};
