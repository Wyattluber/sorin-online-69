
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useKeyContainers } from "@/hooks/useKeyContainers";
import useKeyGeneration, { KeyPhase } from "@/hooks/useKeyGeneration";
import { getIPAddress, checkBlacklist } from "@/utils/keyUtils";
import BlockedState from "@/components/key/BlockedState";
import KeyContainer from "@/components/key/KeyContainer";
import KeySuccessState from "@/components/key/KeySuccessState";
import WaitingState from "@/components/key/WaitingState";

const GetKeyPage = () => {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");
  const keyParam = searchParams.get("key");
  
  const { containers, isLoading: isLoadingContainers } = useKeyContainers();
  const { 
    error, 
    phase, 
    isLoading, 
    isBlacklisted,
    handleGenerateKey, 
    setPhase, 
    setIsBlacklisted, 
    setError 
  } = useKeyGeneration();

  // Check for blacklist status when the component mounts
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
  }, [setIsBlacklisted, setPhase, setError]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-sorin-dark dark:to-[#131b2e] transition-colors duration-500">
      <NavBar />
      <main className="flex flex-col items-center justify-center p-6 flex-grow text-center mt-16">
        {/* If blacklisted, show denied access page */}
        {phase === "blocked" && (
          <BlockedState error={error} />
        )}
        
        {status === "success" && keyParam ? (
          // If we're on the key display page (accessed via URL with status and key params)
          <KeySuccessState keyParam={keyParam} />
        ) : phase !== "blocked" && (
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

                <KeyContainer 
                  containers={containers} 
                  isLoading={isLoadingContainers}
                  onSelectContainer={handleGenerateKey}
                  isGeneratingKey={isLoading}
                />
              </>
            )}

            {phase === "waiting" && <WaitingState />}

            {error && phase !== "blocked" && (
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
