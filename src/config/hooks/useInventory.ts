import { useQuery } from "@tanstack/react-query";
import API from "../api";

export interface InventoryStat {
  label: string;
  value: string;
  trend: string;
}

interface InventoryStatsResponse {
  success: boolean;
  message: string;
  data: {
    stats: InventoryStat[];
  };
}

export const useInventoryStats = () => {
  return useQuery({
    queryKey: ["inventoryStats"],
    queryFn: async (): Promise<InventoryStat[]> => {
      const { data } = await API.get<InventoryStatsResponse>("/inventory/stats");
      return data.data.stats;
    },
  });
};
