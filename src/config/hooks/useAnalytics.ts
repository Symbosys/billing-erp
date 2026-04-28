import { useQuery } from "@tanstack/react-query";
import API from "../api";

export interface AnalyticsMetric {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
}

export interface PerformanceIndex {
  overall: string;
  efficiency: string;
  velocity: string;
  chartData: string[];
}

export interface AnalyticsResponse {
  success: boolean;
  message: string;
  data: {
    performanceMetrics: AnalyticsMetric[];
    performanceIndex: PerformanceIndex;
  };
}

export const useAnalytics = () => {
  return useQuery({
    queryKey: ["analytics"],
    queryFn: async (): Promise<{ performanceMetrics: AnalyticsMetric[]; performanceIndex: PerformanceIndex }> => {
      const { data } = await API.get<AnalyticsResponse>("/analytics");
      return data.data;
    },
  });
};
