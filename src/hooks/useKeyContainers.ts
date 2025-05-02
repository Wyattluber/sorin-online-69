
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { KeyContainer } from "@/components/key/KeyContainer";

export const useKeyContainers = () => {
  const [containers, setContainers] = useState<KeyContainer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadContainers = async () => {
      try {
        setIsLoading(true);
        
        // First try to fetch containers directly from a regular table query
        try {
          const { data: directData, error: directError } = await supabase
            .from('key_containers')
            .select('*')
            .eq('active', true)
            .order('position', { ascending: true });
            
          if (!directError && directData && directData.length > 0) {
            setContainers(directData as KeyContainer[]);
            setIsLoading(false);
            return;
          }
        } catch (err) {
          console.log("Direct table access failed, trying edge function:", err);
        }
        
        // If direct query fails, try the edge function
        try {
          const { data: functionData, error: functionError } = await supabase
            .functions.invoke('get-key-containers');
            
          if (functionError) {
            console.error("Edge function error:", functionError);
            setContainers([]);
          } else if (functionData?.data) {
            setContainers(functionData.data as KeyContainer[]);
          } else {
            setContainers([]);
          }
        } catch (err) {
          console.error("Edge function call failed:", err);
          setContainers([]);
        }
      } catch (err) {
        console.error("Error loading containers:", err);
        toast.error("Fehler beim Laden der Container");
        setContainers([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadContainers();
  }, []);

  return { containers, isLoading };
};
