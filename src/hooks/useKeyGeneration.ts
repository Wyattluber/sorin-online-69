import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { generateRandomKey } from "@/utils/keyUtils";

// Define a KeyPhase type to be exported - now includes "blocked"
export type KeyPhase = "start" | "waiting" | "blocked";

export default function useKeyGeneration() {
  const [isLoading, setIsLoading] = useState(false);
  const [key, setKey] = useState<string | null>(null);
  const [phase, setPhase] = useState<KeyPhase>("start");
  const [error, setError] = useState<string | null>(null);
  const [isBlacklisted, setIsBlacklisted] = useState(false);

  // Function to get key expiration date (1 hour from now)
  const getKeyExpirationDate = () => {
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);
    return expiresAt.toISOString();
  };

  // Function to generate a new key
  const generateKey = async () => {
    setIsLoading(true);
    try {
      const newKey = generateRandomKey(); // Use generateRandomKey from keyUtils
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
      setPhase("waiting");
      const newKey = await generateKey();
      if (newKey) {
        redirectToLink(redirectUrl, newKey);
      }
    } catch (error) {
      console.error("Error in key generation process:", error);
      toast.error("Ein Fehler ist aufgetreten.");
      setPhase("start");
      setError("Ein Fehler ist aufgetreten. Bitte versuche es erneut.");
    } finally {
      setIsLoading(false);
    }
  };

  return { handleGenerateKey, isLoading, key, phase, error, isBlacklisted, setPhase, setIsBlacklisted, setError };
}
