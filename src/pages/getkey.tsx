import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AlertCircle, Check, Copy } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const GetKeyPage = () => {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");
  const keyParam = searchParams.get("key");
  
  const [key, setKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [phase, setPhase] = useState<"start" | "waiting" | "done" | "blocked">("start");
  const [isLoading, setIsLoading] = useState(false);
  const [requestCount, setRequestCount] = useState(0);
  const [lastRequestTime, setLastRequestTime] = useState(Date.now());
  const [copied, setCopied] = useState(false);
  const [isBlacklisted, setIsBlacklisted] = useState(false);

  const navigate = useNavigate();

  // Check for blacklist status as soon as the component mounts
  useEffect(() => {
    const checkBlacklistStatus = async () => {
      try {
        const ip = await getIPAddress();
        
        if (ip) {
          const blacklistReason = await checkBlacklist(ip);
          
          if (blacklistReason) {
            setIsBlacklisted(true);
            setPhase("blocked");
            setError(`Zugriff verweigert: ${blacklistReason}`);
          }
        }
      } catch (err) {
        console.error("Error checking blacklist status:", err);
      }
    };
    
    checkBlacklistStatus();
  }, []);

  const copyToClipboard = (textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      toast.success("Key wurde in die Zwischenablage kopiert");
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
      console.error("Failed to copy: ", err);
      toast.error("Kopieren fehlgeschlagen");
    });
  };

  // Generate a random key with the new format
  const generateRandomKey = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = 'SORIN_KEY_';
    for (let i = 0; i < 15; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  // Get approximate location based on IP (using a free API)
  const getLocationFromIP = async (ip: string) => {
    try {
      const response = await fetch(`https://ipapi.co/${ip}/json/`);
      if (!response.ok) return "Unknown";
      
      const data = await response.json();
      return `${data.city || "Unknown"}, ${data.country_name || "Unknown"}`;
    } catch (err) {
      console.error("Error getting location:", err);
      return "Unknown";
    }
  };

  // Get user's IP address
  const getIPAddress = async () => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      if (!response.ok) return null;
      
      const data = await response.json();
      return data.ip;
    } catch (err) {
      console.error("Error getting IP:", err);
      return null;
    }
  };

  // Check if IP is blacklisted
  const checkBlacklist = async (ip: string | null) => {
    try {
      if (!ip) return null;
      
      // Check by IP
      const { data: ipData, error: ipError } = await supabase
        .from('blacklist')
        .select('*')
        .eq('ip_address', ip)
        .maybeSingle();
      
      if (ipError && ipError.code !== 'PGRST116') {
        console.error("Error checking blacklist by IP:", ipError);
      }
      
      if (ipData) {
        return ipData.reason || "IP address is blacklisted";
      }
      
      // Not blacklisted
      return null;
    } catch (err) {
      console.error("Error checking blacklist:", err);
      return "Error checking blacklist status";
    }
  };

  // Check if a key already exists for this IP
  const checkExistingKey = async (ip: string | null) => {
    try {
      if (!ip) return null;
      
      // Look for a key associated with this IP
      const { data: ipData, error: ipError } = await supabase
        .from('keys')
        .select('key, expires_at')
        .eq('ip_adress', ip)
        .eq('used', false)
        .gt('expires_at', new Date().toISOString())
        .maybeSingle();
      
      if (ipError && ipError.code !== 'PGRST116') {
        console.error("Error checking existing key by IP:", ipError);
      }
      
      if (ipData?.key) {
        return ipData.key;
      }
      
      // No valid key found
      return null;
    } catch (err) {
      console.error("Error checking existing key:", err);
      return null;
    }
  };

  const redirectToLinkvertise = (newKey: string) => {
    // Generate the URL that users will be redirected to after Linkvertise
    const redirectUrl = `${window.location.origin}/keyredirect/${newKey}`;
    
    // Use the actual Linkvertise URL provided by the user
    const linkvertiseUrl = `https://link-target.net/1345492/sorin-key1?r=${encodeURIComponent(redirectUrl)}`;
    
    // Redirect to Linkvertise
    window.location.href = linkvertiseUrl;
  };

  const handleGenerateKey = async () => {
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
        // Redirect to Linkvertise with the existing key
        redirectToLinkvertise(existingKey);
      } else {
        // Get location data
        const location = ip ? await getLocationFromIP(ip) : "Unknown";
        
        // Generate a new random key
        const newKey = generateRandomKey();
        
        // Set expiration time (1 hour from now)
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 1);
        
        // Save key to Supabase with IP and location, with hwid as null
        const { error: saveError } = await supabase
          .from('keys')
          .insert({
            key: newKey,
            used: false,
            expires_at: expiresAt.toISOString(),
            ip_adress: ip, // Note: Column name has the typo in it ("adress" not "address")
            device_location: location,
            hwid: null
          });
          
        if (saveError) {
          throw new Error(saveError.message);
        }
        
        setKey(newKey);
        toast.success("Key wurde erfolgreich generiert");
        
        // Redirect to Linkvertise with the new key
        redirectToLinkvertise(newKey);
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

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex flex-col items-center justify-center p-6 flex-grow text-center mt-16">
        {/* If blacklisted, show denied access page */}
        {phase === "blocked" ? (
          <>
            <h1 className="text-3xl font-bold mb-4 text-red-500">Zugriff verweigert</h1>
            
            <Alert variant="destructive" className="mb-6 max-w-md">
              <AlertCircle className="h-5 w-5" />
              <AlertTitle>Blacklist Eintrag gefunden</AlertTitle>
              <AlertDescription>
                {error || "Deine IP-Adresse wurde gesperrt."}
              </AlertDescription>
            </Alert>
            
            <p className="text-gray-600 dark:text-sorin-muted mt-4">
              Wenn du glaubst, dass dies ein Fehler ist, kontaktiere bitte den Support.
            </p>
          </>
        ) : status === "success" && keyParam ? (
          // If we're on the key display page (accessed via URL with status and key params)
          <>
            <h1 className="text-3xl font-bold mb-4">Dein Key wurde generiert</h1>
            
            <Alert className="mb-6 max-w-md bg-white dark:bg-sorin-primary border-green-200 dark:border-sorin-accent/30">
              <Check className="h-5 w-5 text-green-500" />
              <AlertTitle className="text-gray-900 dark:text-sorin-text">Erfolg!</AlertTitle>
              <AlertDescription className="text-gray-700 dark:text-sorin-text/80">
                Dein persönlicher Key wurde erfolgreich erstellt.
              </AlertDescription>
            </Alert>
            
            <div className="bg-gray-100 dark:bg-sorin-accent/10 p-4 rounded-md border border-gray-200 dark:border-sorin-accent/30 mb-6">
              <p className="text-sm text-gray-700 dark:text-sorin-text mb-2">Dein Key:</p>
              <p className="font-mono text-lg font-bold text-gray-900 dark:text-sorin-highlight break-all">{keyParam}</p>
              <Button 
                onClick={() => copyToClipboard(keyParam)}
                className="mt-3 bg-purple-600 hover:bg-purple-700 dark:bg-sorin-primary dark:hover:bg-sorin-primary/80 dark:border dark:border-sorin-accent/30 text-white dark:text-sorin-text gap-2"
                size="sm"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Kopiert" : "Key kopieren"}
              </Button>
            </div>
            
            <div className="text-sm text-gray-600 dark:text-sorin-text/70 max-w-md">
              <p>Dieser Key läuft nach 1 Stunde ab.</p>
              <p className="mt-2">Kopiere den Key und füge ihn in die Sorin-Anwendung ein.</p>
            </div>
          </>
        ) : (
          // Default view - key generation form
          <>
            <h1 className="text-3xl font-bold mb-4">Sichere dir deinen persönlichen Key</h1>

            {phase === "start" && (
              <>
                <div className="max-w-lg mb-8 text-left">
                  <p className="mb-4 text-gray-700 dark:text-sorin-text">
                    Willkommen beim Sorin-Zugriffsportal
                  </p>
                  <p className="mb-4 text-gray-700 dark:text-sorin-text">
                    Hier kannst du einen temporären Zugangsschlüssel generieren, der dir testweise Zugriff auf Sorin gewährt.
                    Dein persönlicher Key bleibt für 1 Stunde aktiv, nachdem er erstellt wurde.
                  </p>
                  <p className="mb-6 text-gray-700 dark:text-sorin-text">
                    Wähle bitte eine der folgenden Methoden aus, um deinen Schlüssel zu erhalten.
                  </p>
                </div>
                <div className="bg-white dark:bg-sorin-primary p-6 rounded-lg shadow-md border border-gray-200 dark:border-sorin-accent/30 max-w-md">
                  <Button 
                    onClick={handleGenerateKey} 
                    disabled={isLoading}
                    className="bg-purple-600 hover:bg-purple-700 dark:bg-sorin-accent dark:text-sorin-dark dark:hover:bg-sorin-highlight flex justify-between items-center gap-4 p-6 w-full h-24"
                  >
                    <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                      <div className="text-sm text-gray-500 dark:text-gray-400">Logo</div>
                    </div>
                    <div className="flex-1 text-left">
                      <span className="block font-medium text-lg">
                        {isLoading ? "Generiere Key..." : "Container"}
                      </span>
                    </div>
                  </Button>
                </div>
              </>
            )}

            {phase === "waiting" && (
              <>
                <p className="mb-2 text-lg text-gray-900 dark:text-sorin-text">Key wurde erstellt!</p>
                <p className="mb-2 text-gray-800 dark:text-sorin-text">
                  Du wirst weitergeleitet...
                </p>
                <p className="text-sm text-gray-700 dark:text-sorin-text">
                  Bitte verlasse die Seite nicht.
                </p>
              </>
            )}

            {error && (
              <Alert variant="destructive" className="mt-6 max-w-md">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Fehler</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default GetKeyPage;
