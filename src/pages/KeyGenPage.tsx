
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useKeyGeneration from "@/hooks/useKeyGeneration";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const KeyGenPage = () => {
  const { isLoading, key } = useKeyGeneration();
  const { key: keyParam } = useParams<{ key: string }>();
  const navigate = useNavigate();
  
  useEffect(() => {
    // If we have a key from direct navigation, redirect to the key display page
    if (keyParam) {
      navigate(`/keydisplay/${keyParam}`);
      return;
    }

    // If someone navigates directly to this page without going through Linkvertise
    if (!keyParam && !key && !isLoading) {
      toast.error("Bitte generiere zuerst einen Key.");
      navigate('/getkey');
    }
  }, [keyParam, key, navigate, isLoading]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sorin-dark to-[#131b2e] text-white p-4">
      <div className="text-center">
        {isLoading ? (
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="animate-spin h-12 w-12" />
            <p className="text-lg">Generiere deinen Key...</p>
          </div>
        ) : (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Key Generator</h1>
            <p className="text-lg">Du wirst weitergeleitet...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default KeyGenPage;
