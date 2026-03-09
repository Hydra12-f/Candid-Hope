import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useCauses = () => {
  return useQuery({
    queryKey: ["causes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("causes")
        .select("*")
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data;
    },
    refetchInterval: 30000, // Auto-refresh every 30s
  });
};
