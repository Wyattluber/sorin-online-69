
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

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
        <div className="relative h-[40vh] md:h-[50vh]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url("${game.image_url}")`,
              filter: 'brightness(0.4)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-sorin-dark to-transparent" />
          <div className="container mx-auto px-4 h-full flex items-end pb-12">
            <h1 className="text-4xl font-bold text-sorin-highlight sorin-glow">{game.name}</h1>
          </div>
        </div>

        {/* Back button */}
        <div className="container mx-auto px-4 py-6">
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="flex items-center gap-2 mb-6 bg-sorin-primary/50 text-sorin-text border-sorin-accent/20 hover:bg-sorin-accent/10"
          >
            <ArrowLeft className="h-4 w-4" />
            Zurück zur Spieleauswahl
          </Button>

          <div className="bg-sorin-primary/50 backdrop-blur-sm rounded-lg p-6 border border-sorin-accent/20 mb-12">
            {game.description && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-sorin-highlight mb-4">Beschreibung</h2>
                <p className="text-sorin-text/90">{game.description}</p>
              </div>
            )}

            <h2 className="text-xl font-semibold text-sorin-highlight mb-4">Script Status</h2>
            {game.script_available ? (
              <div>
                <p className="text-sorin-text/90 mb-4">Das Script ist verfügbar und bereit zum Download.</p>
                <Button className="bg-sorin-accent hover:bg-sorin-highlight flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Script herunterladen
                </Button>
              </div>
            ) : (
              <p className="text-sorin-text/90">Das Script ist derzeit in Entwicklung und wird bald verfügbar sein.</p>
            )}

            <div className="mt-8 border-t border-sorin-accent/10 pt-8">
              <h2 className="text-xl font-semibold text-sorin-highlight mb-4">Installation</h2>
              <ol className="list-decimal pl-5 space-y-2 text-sorin-text/90">
                <li>Downloade das Script über den Download-Button.</li>
                <li>Öffne deinen Roblox Executor.</li>
                <li>Kopiere den Inhalt der Datei oder lade sie direkt in deinen Executor.</li>
                <li>Starte das Spiel und führe das Script aus.</li>
              </ol>
            </div>

            <div className="mt-8 border-t border-sorin-accent/10 pt-8">
              <h2 className="text-xl font-semibold text-sorin-highlight mb-4">Features</h2>
              <ul className="list-disc pl-5 space-y-2 text-sorin-text/90">
                <li>Automatisches Teleportieren zu Einsätzen</li>
                <li>ESP für aktive Einsätze</li>
                <li>Fahrzeug-Modifikationen für höhere Geschwindigkeit</li>
                <li>Admin-Befehle Umgehung</li>
                <li>Anti-Kick Schutz</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GameDetails;
