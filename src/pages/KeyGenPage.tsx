
import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Copy, CheckCircle, XCircle, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const KeyGenPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [key, setKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const hash = searchParams.get('hash');
    
    if (!hash) {
      setError("Ungültiger Zugriff – du musst zuerst über den offiziellen Link gehen.");
      setLoading(false);
      return;
    }

    generateKey(hash);
  }, [searchParams]);

  const generateKey = async (hash: string) => {
    try {
      setLoading(true);
      
      // Make POST request to the edge function
      const response = await fetch(`https://iesugielppyhhvtdzsqq.supabase.co/functions/v1/keygen?hash=${hash}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imllc3VnaWVscHB5aGh2dGR6c3FxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4ODAyMDUsImV4cCI6MjA2MTQ1NjIwNX0.QQYxM6pz6h9IGWYGxysvW8p1KFmHk3O_RdqnpwJYE8w`,
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imllc3VnaWVscHB5aGh2dGR6c3FxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4ODAyMDUsImV4cCI6MjA2MTQ1NjIwNX0.QQYxM6pz6h9IGWYGxysvW8p1KFmHk3O_RdqnpwJYE8w'
        }
      });

      const responseText = await response.text();
      
      if (responseText.startsWith('KEY:')) {
        const generatedKey = responseText.substring(4); // Remove "KEY:" prefix
        setKey(generatedKey);
        setError(null);
      } else {
        setError("Dieser Zugang ist ungültig oder abgelaufen.");
        setKey(null);
      }
    } catch (err) {
      console.error('Error generating key:', err);
      setError("Dieser Zugang ist ungültig oder abgelaufen.");
      setKey(null);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (!key) return;
    
    try {
      await navigator.clipboard.writeText(key);
      setCopied(true);
      toast.success("Key wurde in die Zwischenablage kopiert!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
      toast.error("Kopieren fehlgeschlagen");
    }
  };

  const goHome = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1a1a1f] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#a78bfa] mx-auto mb-4"></div>
          <p className="text-white text-lg">Generiere deinen Key...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1a1f] flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full">
        {error ? (
          // Error State
          <div className="bg-gray-900/80 backdrop-blur-sm border border-red-500/30 rounded-lg p-8 text-center shadow-2xl">
            <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-4">❌ Fehler</h1>
            <p className="text-red-400 mb-6">{error}</p>
            <Button 
              onClick={goHome}
              className="bg-[#7f5cc7] hover:bg-[#6b46c1] text-white px-6 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-[#7f5cc7]/20"
            >
              <Home className="mr-2 h-4 w-4" />
              Zurück zur Startseite
            </Button>
          </div>
        ) : key ? (
          // Success State
          <div className="bg-gray-900/80 backdrop-blur-sm border border-[#a78bfa]/30 rounded-lg p-8 text-center shadow-2xl shadow-[#a78bfa]/10">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-6">✅ Key erfolgreich generiert!</h1>
            
            {/* Key Display Box */}
            <div className="bg-black/50 border border-[#a78bfa]/40 rounded-lg p-4 mb-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#a78bfa]/5 to-[#7f5cc7]/5"></div>
              <p className="text-sm text-[#a78bfa] mb-2 relative z-10">Dein Sorin Key:</p>
              <p className="font-mono text-lg font-bold text-white break-all relative z-10 tracking-wider">
                {key}
              </p>
            </div>
            
            {/* Copy Button */}
            <Button 
              onClick={copyToClipboard}
              className="bg-[#a78bfa] hover:bg-[#7f5cc7] text-white px-6 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-[#a78bfa]/20 mb-4 w-full"
            >
              {copied ? <CheckCircle className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
              {copied ? "Kopiert!" : "🔗 Key kopieren"}
            </Button>
            
            {/* Validity Notice */}
            <p className="text-sm text-gray-400 mb-4">
              Dieser Key ist 12 Stunden gültig und kann nur auf einem Gerät verwendet werden.
            </p>
          </div>
        ) : null}
        
        {/* Footer Discord Link */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            ❓ Brauchst du Hilfe? Join our Discord:{" "}
            <a 
              href="https://discord.gg/yXgtrQ4kPg" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#a78bfa] hover:text-[#7f5cc7] transition-colors duration-300 underline"
            >
              discord.gg/yXgtrQ4kPg
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default KeyGenPage;
