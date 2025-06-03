
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { useKeyContainers } from "@/hooks/useKeyContainers";
import KeyContainer from "@/components/key/KeyContainer";

const GetKeyPage = () => {
  const { containers, isLoading } = useKeyContainers();

  const handleContainerClick = (redirectUrl: string) => {
    window.open(redirectUrl, '_blank');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-sorin-dark dark:to-[#131b2e] transition-colors duration-500">
      <NavBar />
      <main className="flex flex-col items-center justify-center p-6 flex-grow text-center mt-16">
        <h1 className="text-3xl font-bold mb-4">Sichere dir deinen persönlichen Key</h1>
        
        <div className="max-w-lg mb-8 text-left">
          <p className="mb-4 text-gray-700 dark:text-sorin-text">
            Willkommen beim Sorin-Zugriffsportal
          </p>
          <p className="mb-4 text-gray-700 dark:text-sorin-text">
            Hier kannst du einen temporären Zugangsschlüssel generieren, der dir Zugriff auf unseren Script gewährt.
            Der Key bleibt für 12 Stunde aktiv, nachdem er erstellt wurde.
          </p>
          <p className="mb-6 text-gray-700 dark:text-sorin-text">
            Wähle bitte eine der folgenden Methoden aus, um deinen Schlüssel zu erhalten.
          </p>
        </div>

        <KeyContainer 
          containers={containers} 
          isLoading={isLoading}
          onSelectContainer={handleContainerClick}
          isGeneratingKey={false}
        />
      </main>
      <Footer />
    </div>
  );
};

export default GetKeyPage;
