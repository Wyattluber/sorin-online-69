
import React from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type BlockedStateProps = {
  error: string | null;
}

const BlockedState = ({ error }: BlockedStateProps) => {
  return (
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
  );
};

export default BlockedState;
