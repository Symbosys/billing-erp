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
  customerId?: string | null;
  customer?: any;
  items?: BillItem[];
  totalAmount: number;
  paymentMethod: "CASH" | "CARD" | "UPI" | "OTHER";
  orderType: "DINE_IN" | "DELIVERY" | "PICK_UP";
  tableId?: string | null;
  table?: any;
  guestsCount: number;
  billStatus: "PENDING" | "PAID" | "CANCELLED";
  kotStatus: "PENDING" | "PREPARING" | "READY" | "SERVED" | "CANCELLED";
  kotNo?: string | null;
  isBogo: boolean;
  isComplimentary: boolean;
  waiterName?: string | null;
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

export const useBills = (filters: { billStatus?: string; kotStatus?: string; orderType?: string } = {}) => {
  const queryString = new URLSearchParams(filters as any).toString();
  return useQuery({
    queryKey: ["bills", filters],
    queryFn: async (): Promise<Bill[]> => {
      const { data } = await API.get<BillResponse>(`/bill?${queryString}`);
      return data.data.bills || [];
    },
  });
};

export interface CreateBillInput {
  customerId?: string | null;
  totalAmount: number;
  paymentMethod: "CASH" | "CARD" | "UPI" | "OTHER";
  orderType?: "DINE_IN" | "DELIVERY" | "PICK_UP";
  tableId?: string | null;
  guestsCount?: number;
  billStatus?: "PENDING" | "PAID";
  kotStatus?: "PENDING" | "PREPARING" | "READY" | "SERVED" | "CANCELLED";
  isBogo?: boolean;
  isComplimentary?: boolean;
  waiterName?: string | null;
  items: { productId: string; quantity: number; price: number }[];
}

export const useCreateBill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newBill: CreateBillInput) => {
      const { data } = await API.post<BillResponse>("/bill", newBill);
      return data.data.bill;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bills"] });
      queryClient.invalidateQueries({ queryKey: ["diningTables"] });
    },
  });
};

export const useUpdateKOTStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { data } = await API.put<BillResponse>(`/bill/${id}/kot-status`, { status });
      return data.data.bill;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bills"] });
    },
  });
};

export const useSettleBill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, paymentMethod }: { id: string; paymentMethod: string }) => {
      const { data } = await API.put<BillResponse>(`/bill/${id}/settle`, { paymentMethod });
      return data.data.bill;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bills"] });
      queryClient.invalidateQueries({ queryKey: ["diningTables"] });
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
      queryClient.invalidateQueries({ queryKey: ["diningTables"] });
    },
  });
};
