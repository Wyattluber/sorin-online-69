import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  getIPAddress,
  checkBlacklist,
  checkExistingKey,
  getLocationFromIP,
  generateRandomKey,
  saveNewKey,
} from "@/utils/keyUtils";

export type KeyPhase = "start" | "waiting" | "done" | "blocked";

export const useKeyGeneration = () => {
  const [key, setKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [phase, setPhase] = useState<KeyPhase>("start");
  const [isLoading, setIsLoading] = useState(false);
  const [requestCount, setRequestCount] = useState(0);
  const [lastRequestTime, setLastRequestTime] = useState(Date.now());
  const [isBlacklisted, setIsBlacklisted] = useState(false);

  // Function to handle redirection to the link
  const redirectToLink = async (redirectUrl: string, newKey: string) => {
    // Instead of using linkvertise, redirect directly to keygen with the key
    window.location.href = `/keygen/${newKey}`;
  };

  const handleGenerateKey = async (redirectUrl: string = "https://link-target.net/1345492/sorin-key1") => {
    setIsLoading(true);
    
    try {
      // If already blacklisted, deny access immediately
      if (isBlacklisted) {
        setError("Du bist auf der Blacklist. Zugriff verweigert.");
        setPhase("blocked");
        setIsLoading(false);
        return;
      }
      
      // Check rate limiting
      const now = Date.now();
      const timeDiff = now - lastRequestTime;
      
      // If requests are within 10 seconds window
      if (timeDiff < 10000) {
        setRequestCount(prev => prev + 1);
        
        // If more than 5 requests in 10 seconds, add to blacklist
        if (requestCount >= 4) {  // This will be the 5th request
          const ip = await getIPAddress();
          
          if (ip) {
            // Add to blacklist - including a placeholder value for the required hwid field
            await supabase
              .from('blacklist')
              .insert({
                ip_address: ip,
                reason: "Rate limit exceeded: Too many key requests",
                hwid: "placeholder"  // Adding a placeholder value for the required hwid field
              });
          }
          
          setError("Du hast zu viele Anfragen in kurzer Zeit gestellt. Deine IP-Adresse wurde gesperrt.");
          setPhase("blocked");
          setIsBlacklisted(true);
          setIsLoading(false);
          return;
        }
      } else {
        // Reset counter if outside 10 second window
        setRequestCount(1);
        setLastRequestTime(now);
      }
      
      // Get IP address
      const ip = await getIPAddress();
      
      // Check if blacklisted
      const blacklistReason = await checkBlacklist(ip);
      if (blacklistReason) {
        setError(`Zugriff verweigert: ${blacklistReason}`);
        setPhase("blocked");
        setIsBlacklisted(true);
        setIsLoading(false);
        return;
      }
      
      // Check if a valid key already exists for this IP
      const existingKey = await checkExistingKey(ip);
      
      if (existingKey) {
        // Use existing key
        setKey(existingKey);
        toast.success("Bestehender Key gefunden!");
        // Redirect with the existing key
        redirectToLink(redirectUrl, existingKey);
      } else {
        // Get location data
        const location = ip ? await getLocationFromIP(ip) : "Unknown";
        
        // Generate a new random key
        const newKey = generateRandomKey();
        
        // Save key to database
        const success = await saveNewKey(newKey, ip, location);
        
        if (!success) {
          throw new Error("Fehler beim Speichern des Keys.");
        }
        
        setKey(newKey);
        toast.success("Key wurde erfolgreich generiert");
        
        // Redirect with the new key
        redirectToLink(redirectUrl, newKey);
      }
      
      // Update phase
      setPhase("waiting");
      setError(null);
      
    } catch (err: any) {
      console.error(err);
      setError("Fehler beim Generieren des Keys. Bitte versuche es später erneut.");
      toast.error("Fehler beim Generieren des Keys");
    } finally {
      setIsLoading(false);
    }
  };

  // Expose only what's needed
  return {
    key,
    error,
    phase,
    isLoading,
    isBlacklisted,
    handleGenerateKey,
    setPhase,
    setIsBlacklisted,
    setError
  };
};
