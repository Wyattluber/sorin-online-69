
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Loader2 } from "lucide-react";

const KeyRedirect = () => {
  const { key } = useParams<{ key: string }>();
  const navigate = useNavigate();
  const [isValidating, setIsValidating] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
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
        
        // Redirect to the key display page
        navigate(`/keygen/${key}`);
      } catch (err: any) {
        console.error("Error validating key:", err);
        setError(err.message || "Ein Fehler ist aufgetreten.");
        setIsValidating(false);
      }
    };
    
    validateAndRedirect();
  }, [key, navigate]);

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex flex-col items-center justify-center p-6 flex-grow">
        {isValidating ? (
          <div className="text-center">
            <Loader2 className="h-12 w-12 mx-auto animate-spin text-purple-600 dark:text-sorin-accent" />
            <h1 className="text-2xl font-semibold mt-4">Leite dich weiter zu deinem Key...</h1>
            <p className="mt-2 text-gray-600 dark:text-sorin-muted">Bitte hab einen Moment Geduld.</p>
          </div>
        ) : (
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-red-500 mb-2">Fehler bei der Weiterleitung</h1>
            <p className="text-gray-700 dark:text-sorin-muted">{error}</p>
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
