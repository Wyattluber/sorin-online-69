
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";

const KeyRedirect = () => {
  const { key } = useParams<{ key: string }>();
  const navigate = useNavigate();
  const [isValidating, setIsValidating] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(8);
  const [referrer, setReferrer] = useState<string | null>(null);
  
  // Store the arrival time to ensure minimum 8 seconds have passed
  useEffect(() => {
    const arrivalTime = Date.now();
    // Store the referrer to check if user came from Linkvertise
    setReferrer(document.referrer);
    
    const validateAndRedirect = async () => {
      if (!key) {
        setError("Kein Key gefunden.");
        setIsValidating(false);
        return;
      }

      try {
        // Verify the key exists in the database
        const { data, error: keyError } = await supabase
          .from('keys')
          .select('*')
          .eq('key', key)
          .maybeSingle();
        
        if (keyError) {
          throw new Error("Fehler beim Überprüfen des Keys.");
        }
        
        if (!data) {
          throw new Error("Ungültiger Key.");
        }

        // Start countdown timer to ensure user waits minimum 8 seconds
        const countdownInterval = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(countdownInterval);
              
              // Check if the user has spent enough time or came from Linkvertise
              const timeSpent = Date.now() - arrivalTime;
              const cameFromLinkvertise = referrer && (referrer.includes('link-target.net') || referrer.includes('link-hub.net'));
              
              if (timeSpent >= 8000 || cameFromLinkvertise) {
                // Redirect to the key display page after validation
                navigate(`/keydisplay/${key}`);
              } else {
                setError("Du hast die Werbung übersprungen. Bitte gehe zurück und folge dem korrekten Prozess.");
                setIsValidating(false);
              }
              
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        
        return () => clearInterval(countdownInterval);
        
      } catch (err: any) {
        console.error("Error validating key:", err);
        setError(err.message || "Ein Fehler ist aufgetreten.");
        setIsValidating(false);
      }
    };
    
    validateAndRedirect();
  }, [key, navigate, referrer]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-sorin-dark dark:to-[#131b2e] transition-colors duration-500">
      <NavBar />
      <main className="flex flex-col items-center justify-center p-6 flex-grow">
        {isValidating ? (
          <div className="text-center">
            <Loader2 className="h-12 w-12 mx-auto animate-spin text-purple-600 dark:text-sorin-accent" />
            <h1 className="text-2xl font-semibold mt-4">Leite dich weiter zu deinem Key...</h1>
            <p className="mt-2 text-gray-600 dark:text-sorin-muted">
              Bitte hab einen Moment Geduld. Weiterleitung in {countdown} Sekunden.
            </p>
          </div>
        ) : (
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-red-500 mb-2">Fehler bei der Weiterleitung</h1>
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-5 w-5" />
              <AlertTitle>Ungültiger Zugriff</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
            <p className="mt-4">
              <a href="/getkey" className="text-purple-600 dark:text-sorin-accent underline">
                Zurück zur Key-Generierung
              </a>
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default KeyRedirect;
