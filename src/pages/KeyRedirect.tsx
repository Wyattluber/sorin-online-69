
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const KeyRedirect = () => {
  const { key } = useParams<{ key: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const validateAndRedirect = async () => {
      if (!key) {
        navigate('/getkey');
        return;
      }
      
      try {
        // Verify that the key exists and is valid
        const { data, error } = await supabase
          .from('keys')
          .select('*')
          .eq('key', key)
          .eq('used', false)
          .gt('expires_at', new Date().toISOString())
          .maybeSingle();
        
        if (error) {
          console.error("Error validating key:", error);
          toast.error("Fehler beim Validieren des Keys.");
          navigate('/getkey');
          return;
        }
        
        // If key is valid, redirect to KeyDisplay with the key and success status
        if (data) {
          navigate(`/keydisplay/${key}`);
        } else {
          toast.error("Dein Key ist ungültig oder abgelaufen.");
          navigate('/getkey');
        }
      } catch (err) {
        console.error("Error in key validation process:", err);
        toast.error("Ein unerwarteter Fehler ist aufgetreten.");
        navigate('/getkey');
      }
    };
    
    validateAndRedirect();
  }, [key, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sorin-dark to-[#131b2e]">
      <div className="text-center text-white p-8">
        <h2 className="text-2xl font-bold mb-4">Verifiziere deinen Key...</h2>
        <p className="text-sorin-text">Bitte warte, während wir deinen Key überprüfen.</p>
      </div>
    </div>
  );
};

export default KeyRedirect;
