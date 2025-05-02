
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Loader2 } from "lucide-react";

const KeyGenPage = () => {
  const { key } = useParams<{ key?: string }>();
  const navigate = useNavigate();
  
  useEffect(() => {
    // If we have a key, redirect directly to the key display page
    if (key) {
      navigate(`/keydisplay/${key}`);
    } else {
      // If no key is provided, redirect to getkey page
      navigate('/getkey');
    }
  }, [key, navigate]);
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-sorin-dark dark:to-[#131b2e] transition-colors duration-500">
      <NavBar />
      <main className="flex flex-col items-center justify-center p-6 flex-grow">
        <div className="text-center">
          <Loader2 className="h-16 w-16 mx-auto animate-spin text-purple-600 dark:text-sorin-accent" />
          <h1 className="text-2xl font-semibold mt-6">Verarbeite deinen Key...</h1>
          <p className="mt-2 text-gray-600 dark:text-sorin-muted">
            Du wirst automatisch weitergeleitet.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default KeyGenPage;
