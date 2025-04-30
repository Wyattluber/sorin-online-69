
import React from "react";
import { useParams, Navigate } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Check } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const KeyDisplay = () => {
  const { key } = useParams<{ key: string }>();
  
  // Redirect to home if no key is provided
  if (!key) {
    return <Navigate to="/getkey" replace />;
  }

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
          <p className="font-mono text-lg font-bold text-sorin-highlight break-all">{key}</p>
        </div>
        
        <div className="text-sm text-sorin-text/70 max-w-md">
          <p>Dieser Key ist nur für dein Gerät gültig und läuft nach 1 Stunde ab.</p>
          <p className="mt-2">Kopiere den Key und füge ihn in die Sorin-Anwendung ein.</p>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default KeyDisplay;
