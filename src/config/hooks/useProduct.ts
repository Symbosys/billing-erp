import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import API from "../api";

export interface Product {
  id: string;
  name: string;
  brand?: string;
  price: number;
  stock: number;
  category: string;
  createdAt: string;
  updatedAt: string;
}

interface ProductResponse {
  success: boolean;
  message: string;
  data: {
    products?: Product[];
    product?: Product;
    count?: number;
  };
}

// ─────────────────────────────────────────────
// Hook: Fetch All Products
// ─────────────────────────────────────────────
export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async (): Promise<Product[]> => {
      const { data } = await API.get<ProductResponse>("/product");
      return data.data.products || [];
    },
  });
};

// ─────────────────────────────────────────────
// Hook: Create Product
// ─────────────────────────────────────────────
export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newProduct: Partial<Product>) => {
      const { data } = await API.post<ProductResponse>("/product", newProduct);
      return data.data.product;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

// ─────────────────────────────────────────────
// Hook: Update Product
// ─────────────────────────────────────────────
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updateData }: Partial<Product> & { id: string }) => {
      const { data } = await API.patch<ProductResponse>(`/product/${id}`, updateData);
      return data.data.product;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

// ─────────────────────────────────────────────
// Hook: Delete Product
// ─────────────────────────────────────────────
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await API.delete(`/product/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
