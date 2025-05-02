
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { generateUniqueKey, getKeyExpirationDate } from "@/utils/keyUtils";

export default function useKeyGeneration() {
  const [isLoading, setIsLoading] = useState(false);
  const [key, setKey] = useState<string | null>(null);

  // Function to generate a new key
  const generateKey = async () => {
    setIsLoading(true);
    try {
      const newKey = generateUniqueKey();
      const expiresAt = getKeyExpirationDate();
      
      const { error } = await supabase
        .from("keys")
        .insert([{ key: newKey, expires_at: expiresAt, used: false }]);

      if (error) throw error;
      setKey(newKey);
      return newKey;
    } catch (error) {
      console.error("Error generating key:", error);
      toast.error("Fehler beim Generieren des Keys.");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle redirection to the link
  const redirectToLink = async (redirectUrl: string, newKey: string) => {
    // Generate the URL that users will be redirected to after Linkvertise
    const redirectBackUrl = `${window.location.origin}/keyredirect/${newKey}`;
    
    // Create the final URL with the redirect parameter
    const finalUrl = `${redirectUrl}?r=${encodeURIComponent(redirectBackUrl)}`;
    
    // Redirect to the link
    window.location.href = finalUrl;
  };

  const handleGenerateKey = async (redirectUrl: string = "https://link-target.net/1345492/sorin-key1") => {
    try {
      setIsLoading(true);
      const newKey = await generateKey();
      if (newKey) {
        redirectToLink(redirectUrl, newKey);
      }
    } catch (error) {
      console.error("Error in key generation process:", error);
      toast.error("Ein Fehler ist aufgetreten.");
    } finally {
      setIsLoading(false);
    }
  };

  return { handleGenerateKey, isLoading, key };
}
