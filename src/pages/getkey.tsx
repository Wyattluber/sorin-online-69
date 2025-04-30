
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AlertCircle, Check } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const GetKeyPage = () => {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");
  const keyParam = searchParams.get("key");
  
  const [seconds, setSeconds] = useState(10);
  const [key, setKey] = useState<string | null>(null);
  const [active, setActive] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [phase, setPhase] = useState<"start" | "waiting" | "done">("start");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // Track if the page is visible
  useEffect(() => {
    const handleVisibility = () => setActive(!document.hidden);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  // Timer effect that only runs when page is active
  useEffect(() => {
    if (!active || !key || phase !== "waiting") return;

    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setPhase("done");
          navigate(`/keygen/${key}`);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [active, key, navigate, phase]);

  // Generate a random key with the new format
  const generateRandomKey = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = 'SORIN_KEY_';
    for (let i = 0; i < 15; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  // Collect device information
  const collectDeviceInfo = () => {
    const hwid = "HWID_" + btoa(navigator.userAgent + Date.now());
    
    return {
      hwid,
      userAgent: navigator.userAgent,
      language: navigator.language,
      timestamp: new Date().toISOString()
    };
  };

  // Check if a key already exists for this device
  const checkExistingKey = async (hwid: string) => {
    try {
      const { data, error } = await supabase
        .from('keys')
        .select('key, expires_at')
        .eq('hwid', hwid)
        .eq('used', false)
        .gt('expires_at', new Date().toISOString())
        .maybeSingle();
      
      if (error && error.code !== 'PGRST116') {
        console.error("Error checking existing key:", error);
        return null;
      }
      
      return data?.key || null;
    } catch (err) {
      console.error("Error checking existing key:", err);
      return null;
    }
  };

  const handleGenerateKey = async () => {
    setIsLoading(true);
    try {
      // Collect device info
      const deviceInfo = collectDeviceInfo();
      
      // Check if a valid key already exists for this device
      const existingKey = await checkExistingKey(deviceInfo.hwid);
      
      if (existingKey) {
        // Use existing key
        setKey(existingKey);
        toast.success("Bestehender Key gefunden!");
      } else {
        // Generate a new random key
        const newKey = generateRandomKey();
        
        // Set expiration time (1 hour from now)
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 1);
        
        // Save key to Supabase
        const { error: saveError } = await supabase
          .from('keys')
          .insert({
            key: newKey,
            hwid: deviceInfo.hwid,
            used: false,
            expires_at: expiresAt.toISOString(),
          });
          
        if (saveError) {
          throw new Error(saveError.message);
        }
        
        setKey(newKey);
        toast.success("Key wurde erfolgreich generiert");
      }
      
      // Start countdown
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

  // If we're on the key display page (accessed via URL with status and key params)
  if (status === "success" && keyParam) {
    return (
      <>
        <NavBar />
        <main className="flex flex-col items-center justify-center p-6 min-h-[75vh] text-center">
          <h1 className="text-3xl font-bold mb-4">Dein Key wurde generiert</h1>
          
          <Alert className="mb-6 max-w-md">
            <Check className="h-5 w-5 text-green-500" />
            <AlertTitle>Erfolg!</AlertTitle>
            <AlertDescription>
              Dein persönlicher Key wurde erfolgreich erstellt.
            </AlertDescription>
          </Alert>
          
          <div className="bg-sorin-accent/10 p-4 rounded-md border border-sorin-accent/30 mb-6">
            <p className="text-sm text-sorin-text mb-2">Dein Key:</p>
            <p className="font-mono text-lg font-bold text-sorin-highlight break-all">{keyParam}</p>
          </div>
          
          <div className="text-sm text-sorin-text/70 max-w-md">
            <p>Dieser Key ist nur für dein Gerät gültig und läuft nach 1 Stunde ab.</p>
            <p className="mt-2">Kopiere den Key und füge ihn in die Sorin-Anwendung ein.</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <NavBar />
      <main className="flex flex-col items-center justify-center p-6 min-h-[75vh] text-center">
        <h1 className="text-3xl font-bold mb-4">Sichere dir deinen persönlichen Key</h1>

        {phase === "start" && (
          <>
            <p className="mb-6 text-sorin-text">
              Du bekommst einen Key, gültig für 1 Stunde – nur für dein Gerät.
            </p>
            <Button onClick={handleGenerateKey} disabled={isLoading}>
              {isLoading ? "Generiere Key..." : "Key generieren"}
            </Button>
          </>
        )}

        {phase === "waiting" && (
          <>
            <p className="mb-2 text-lg text-sorin-text">Key wurde erstellt!</p>
            <p className="mb-2 text-sorin-text">Bitte warte <strong>{seconds}</strong> Sekunden…</p>
            <p className="text-sm text-sorin-text">Die Weiterleitung startet automatisch. Verlasse die Seite nicht.</p>
            <p className="mt-4 text-xs text-sorin-text/70">Der Timer pausiert automatisch, wenn du zu einem anderen Tab wechselst.</p>
          </>
        )}

        {error && (
          <Alert variant="destructive" className="mt-6 max-w-md">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Fehler</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </main>
      <Footer />
    </>
  );
};

export default GetKeyPage;
