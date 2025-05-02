
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useKeyGeneration from "@/hooks/useKeyGeneration";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const KeyGenPage = () => {
  const { handleGenerateKey, isLoading, key } = useKeyGeneration();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  useEffect(() => {
    // If we have a key from direct navigation, redirect to the key display page
    if (id) {
      navigate(`/keydisplay/${id}`);
    }
    // If we have a key from generation, it means we need to redirect through linkvertise
    else if (!id && !key && !isLoading) {
      // Redirect to getkey if someone directly navigates to /keygen without a key
      navigate('/getkey');
    }
  }, [id, key, navigate, isLoading]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900 text-white p-4">
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
