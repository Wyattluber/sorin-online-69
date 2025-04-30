
// src/pages/getkey.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const GetKeyPage = () => {
  const [seconds, setSeconds] = useState(5);
  const [key, setKey] = useState<string | null>(null);
  const [active, setActive] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [phase, setPhase] = useState<"start" | "waiting" | "done">("start");

  const navigate = useNavigate();

  useEffect(() => {
    const handleVisibility = () => setActive(!document.hidden);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

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

  const handleGenerateKey = async () => {
    const hwid = "HWID_" + btoa(navigator.userAgent + Date.now());

    try {
      const response = await fetch("https://68ccd275-1706-42c7-a6a5-93aeeb8fb046-00-3sesq19g6e2n1.kirk.replit.dev/api/getkey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ hwid }),
      });

      const result = await response.json();
      if (!response.ok || !result.key) throw new Error(result.error || "Unbekannter Fehler");
      setKey(result.key);
      setPhase("waiting");
    } catch (err: any) {
      console.error(err);
      setError("Fehler beim Abrufen des Keys.");
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
