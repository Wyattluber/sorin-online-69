
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
        
        const { data, error } = await supabase
          .from('key_containers')
          .select('*')
          .eq('active', true)
          .order('position', { ascending: true });
            
        if (error) {
          console.error("Error loading containers:", error);
          toast.error("Fehler beim Laden der Container");
          setContainers([]);
        } else {
          setContainers(data as KeyContainer[]);
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
