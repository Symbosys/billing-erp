import { useQuery } from "@tanstack/react-query";
import API from "../api";

export interface DashboardStats {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  detail: string;
}

export interface RecentTransaction {
  id: string;
  customer: string;
  amount: string;
  date: string;
  status: string;
  type: string;
}

interface DashboardResponse {
  success: boolean;
  message: string;
  data: {
    stats: DashboardStats[];
    recentTransactions: RecentTransaction[];
  };
}

export const useDashboard = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: async (): Promise<{ stats: DashboardStats[]; recentTransactions: RecentTransaction[] }> => {
      const { data } = await API.get<DashboardResponse>("/dashboard");
      return data.data;
    },
  });
};
