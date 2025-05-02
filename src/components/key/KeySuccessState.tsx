
import React, { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type KeySuccessStateProps = {
  keyParam: string;
}

const KeySuccessState = ({ keyParam }: KeySuccessStateProps) => {
  const [copied, setCopied] = useState(false);

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

  return (
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
  );
};

export default KeySuccessState;
