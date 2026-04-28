import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import API from "../api";

export interface Customer {
  id: string;
  name: string;
  phone: string;
  price: number;
  createdAt: string;
  updatedAt: string;
}

interface CustomerResponse {
  success: boolean;
  message: string;
  data: {
    customers?: Customer[];
    customer?: Customer;
    count?: number;
  };
}

// ─────────────────────────────────────────────
// Hook: Fetch All Customers
// ─────────────────────────────────────────────
export const useCustomers = () => {
  return useQuery({
    queryKey: ["customers"],
    queryFn: async (): Promise<Customer[]> => {
      const { data } = await API.get<CustomerResponse>("/customer");
      return data.data.customers || [];
    },
  });
};

// ─────────────────────────────────────────────
// Hook: Create Customer
// ─────────────────────────────────────────────
export const useCreateCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newCustomer: Partial<Customer>) => {
      const { data } = await API.post<CustomerResponse>("/customer", newCustomer);
      return data.data.customer;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });
};

// ─────────────────────────────────────────────
// Hook: Update Customer
// ─────────────────────────────────────────────
export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updateData }: Partial<Customer> & { id: string }) => {
      const { data } = await API.patch<CustomerResponse>(`/customer/${id}`, updateData);
      return data.data.customer;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });
};

// ─────────────────────────────────────────────
// Hook: Delete Customer
// ─────────────────────────────────────────────
export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await API.delete(`/customer/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });
};
