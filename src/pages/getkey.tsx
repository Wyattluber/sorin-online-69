
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const GetKeyPage = () => {
  const [seconds, setSeconds] = useState(10);
  const [key, setKey] = useState<string | null>(null);
  const [active, setActive] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [phase, setPhase] = useState<"start" | "waiting" | "done">("start");

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

  // Generate a random key
  const generateRandomKey = () => {
    const characters = '0123456789';
    let result = 'SORIN_KEY_';
    for (let i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  // Collect device information
  const collectDeviceInfo = () => {
    const hwid = "HWID_" + btoa(navigator.userAgent + Date.now());
    
    // Get geolocation if available
    let location = "unknown";
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          location = `${position.coords.latitude},${position.coords.longitude}`;
        },
        () => {
          console.log("Geolocation permission denied or unavailable");
        }
      );
    }
    
    return {
      hwid,
      userAgent: navigator.userAgent,
      language: navigator.language,
      location,
      timestamp: new Date().toISOString()
    };
  };

  const handleGenerateKey = async () => {
    try {
      // Generate random key
      const newKey = generateRandomKey();
      
      // Collect device info
      const deviceInfo = collectDeviceInfo();
      
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
        
      if (saveError) throw new Error(saveError.message);
      
      // Set state for UI
      setKey(newKey);
      setPhase("waiting");
      
      // Start countdown
      toast.success("Key wurde erfolgreich generiert");
    } catch (err: any) {
      console.error(err);
      setError("Fehler beim Generieren des Keys. Bitte versuche es später erneut.");
      toast.error("Fehler beim Generieren des Keys");
    }
  };

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
            <Button onClick={handleGenerateKey}>Key generieren</Button>
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
          <p className="text-red-500 mt-6">{error}</p>
        )}
      </main>
      <Footer />
    </>
  );
};

export default GetKeyPage;
