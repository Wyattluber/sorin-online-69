
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Copy, Bug, MessageSquare } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import FeedbackForm from "@/components/FeedbackForm";

type Game = {
  id: string;
  name: string;
  image_url: string;
  description: string | null;
  script_available: boolean;
};

const GameDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("script");
  
  // Just the loadstring for the script
  const loadString = `loadstring(game:HttpGet("https://sorin.app/scripts/${id}.lua"))()`;

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const { data, error } = await supabase
          .from('games')
          .select('*')
          .eq('id', id)
          .single();
          
        if (error) throw error;
        setGame(data);
      } catch (error) {
        console.error("Error fetching game details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchGame();
    }
  }, [id]);

  const copyScript = () => {
    navigator.clipboard.writeText(loadString)
      .then(() => {
        toast.success("Script wurde in die Zwischenablage kopiert");
      })
      .catch((err) => {
        toast.error("Fehler beim Kopieren: " + err.message);
      });
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="mt-20">
            <Skeleton className="h-12 w-40 mb-4" />
            <Skeleton className="h-72 w-full mb-6" />
            <Skeleton className="h-8 w-full max-w-3xl mb-2" />
            <Skeleton className="h-8 w-full max-w-2xl mb-8" />
            <Skeleton className="h-16 w-48" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!game) {
    return (
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <main className="flex-grow container mx-auto px-4 py-16 mt-16">
          <div className="text-center">
            <h1 className="text-2xl text-sorin-text mb-4">Spiel nicht gefunden</h1>
            <Button onClick={() => navigate("/")} className="bg-sorin-accent hover:bg-sorin-highlight">
              Zurück zur Startseite
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow">
        {/* Hero section with game image */}
        <div className="relative h-[50vh] md:h-[60vh]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url("${game.image_url}")`,
              filter: 'brightness(0.3)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-sorin-dark to-transparent" />
          <div className="container mx-auto px-4 h-full flex items-end pb-12">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-sorin-highlight sorin-glow mb-4">{game.name}</h1>
              {game.description && (
                <p className="text-sorin-text/90 max-w-2xl text-lg">{game.description}</p>
              )}
            </div>
          </div>
        </div>

        {/* Content area */}
        <div className="container mx-auto px-4 py-8">
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="flex items-center gap-2 mb-8 bg-sorin-primary/50 text-sorin-text border-sorin-accent/20 hover:bg-sorin-accent/10"
          >
            <ArrowLeft className="h-4 w-4" />
            Zurück zur Spieleauswahl
          </Button>

          <div className="max-w-5xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 mb-8 bg-sorin-dark/70">
                <TabsTrigger 
                  value="script" 
                  className="data-[state=active]:bg-sorin-accent text-sorin-text"
                >
                  Script
                </TabsTrigger>
                <TabsTrigger 
                  value="bug" 
                  className="data-[state=active]:bg-sorin-accent text-sorin-text"
                >
                  <Bug className="mr-2 h-4 w-4" />
                  Bug melden
                </TabsTrigger>
                <TabsTrigger 
                  value="suggestion" 
                  className="data-[state=active]:bg-sorin-accent text-sorin-text"
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Vorschläge
                </TabsTrigger>
              </TabsList>

              <TabsContent value="script" className="border-none p-0">
                <div className="bg-sorin-primary/50 backdrop-blur-sm rounded-lg p-6 border border-sorin-accent/20">
                  <h2 className="text-xl font-semibold text-sorin-highlight mb-6">Script für {game.name}</h2>
                  
                  {game.script_available ? (
                    <div>
                      <p className="text-sorin-text/90 mb-6">
                        Kopiere den folgenden Code und füge ihn in deinen Executor ein.
                      </p>
                      
                      <div className="mb-6">
                        <Button 
                          className="bg-sorin-accent hover:bg-sorin-highlight flex items-center gap-2"
                          onClick={copyScript}
                        >
                          <Copy className="h-4 w-4" />
                          Script kopieren
                        </Button>
                      </div>
                      
                      <div className="bg-sorin-dark/70 p-4 rounded-md">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-sorin-muted">loadstring</span>
                          <Button 
                            variant="ghost" 
                            className="h-8 w-8 p-0 text-sorin-muted hover:text-sorin-highlight"
                            onClick={copyScript}
                          >
                            <Copy className="h-4 w-4" />
                            <span className="sr-only">Kopieren</span>
                          </Button>
                        </div>
                        <pre className="text-sm md:text-base text-sorin-text/90 overflow-x-auto p-4 bg-sorin-dark/50 rounded border border-sorin-accent/10">
                          <code>{loadString}</code>
                        </pre>
                      </div>

                      <div className="mt-8 border-t border-sorin-accent/10 pt-8">
                        <h2 className="text-xl font-semibold text-sorin-highlight mb-4">Installation</h2>
                        <ol className="list-decimal pl-5 space-y-2 text-sorin-text/90">
                          <li>Kopiere den Code mit dem Button oben.</li>
                          <li>Öffne deinen Roblox Executor.</li>
                          <li>Füge den Code in deinen Executor ein.</li>
                          <li>Starte das Spiel und führe den Code aus.</li>
                        </ol>
                      </div>

                      <div className="mt-8 border-t border-sorin-accent/10 pt-8">
                        <h2 className="text-xl font-semibold text-sorin-highlight mb-4">Features</h2>
                        <ul className="list-disc pl-5 space-y-2 text-sorin-text/90">
                          <li>Teleportieren</li>
                          <li>ESP</li>                        
                          <li>Player Secure (Anti Taser und weiteres)</li>
                          <li>Spielerstatistiken</li>
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sorin-text/90">Das Script ist derzeit in Entwicklung und wird bald verfügbar sein.</p>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="bug" className="border-none p-0">
                <div className="bg-sorin-primary/50 backdrop-blur-sm rounded-lg p-6 border border-sorin-accent/20">
                  <h2 className="text-xl font-semibold text-sorin-highlight mb-6">Bug melden für {game.name}</h2>
                  <p className="text-sorin-text/90 mb-6">
                    Hast du einen Fehler im Script entdeckt? Bitte beschreibe ihn so genau wie möglich, damit wir ihn beheben können.
                  </p>
                  <FeedbackForm type="bug" />
                </div>
              </TabsContent>

              <TabsContent value="suggestion" className="border-none p-0">
                <div className="bg-sorin-primary/50 backdrop-blur-sm rounded-lg p-6 border border-sorin-accent/20">
                  <h2 className="text-xl font-semibold text-sorin-highlight mb-6">Vorschläge für {game.name}</h2>
                  <p className="text-sorin-text/90 mb-6">
                    Hast du Ideen oder Verbesserungsvorschläge für das Script? Teile sie mit uns!
                  </p>
                  <FeedbackForm type="suggestion" />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GameDetails;
