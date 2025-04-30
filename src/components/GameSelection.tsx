
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";

type Game = {
  id: string;
  name: string;
  image_url: string;
  description: string | null;
  script_available: boolean;
  script_url: string | null;
  detail_image_url: string | null;
};

const GameSelection = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const { data, error } = await supabase
          .from('games')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          throw new Error(error.message);
        }

        setGames(data || []);
      } catch (err) {
        console.error("Error loading games:", err);
        setError("Fehler beim Laden der Spiele");
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        {error}
      </div>
    );
  }

  return (
    <div id="games" className="sorin-section py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-sorin-highlight sorin-glow mb-4">Unterstützte Spiele</h2>
          <p className="text-sorin-muted max-w-2xl mx-auto">
            Entdecke die Spiele, für die Sorin derzeit optimiert ist oder bald Unterstützung erhält.
          </p>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, idx) => (
              <div key={idx} className="bg-sorin-primary/50 rounded-lg overflow-hidden border border-sorin-accent/20">
                <Skeleton className="h-48 w-full" />
                <div className="p-6">
                  <Skeleton className="h-6 w-2/3 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            ))}
          </div>
        ) : games.length === 0 ? (
          <div className="text-center text-sorin-muted">
            Noch keine Spiele verfügbar. Schau bald wieder vorbei!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {games.map((game) => (
              <Link
                to={`/game/${game.id}`}
                key={game.id}
                className="bg-sorin-primary/50 backdrop-blur-sm rounded-lg overflow-hidden border border-sorin-accent/20 hover:border-sorin-accent/40 transition-all duration-300 hover:shadow-lg hover:shadow-sorin-accent/10 block"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={game.image_url}
                    alt={game.name}
                    className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-105"
                  />
                  {game.script_available ? (
                    <span className="absolute top-2 right-2 bg-sorin-highlight/80 px-2 py-1 text-xs rounded-md text-white">
                      Script verfügbar
                    </span>
                  ) : (
                    <span className="absolute top-2 right-2 bg-sorin-primary/80 px-2 py-1 text-xs rounded-md text-sorin-text">
                      In Entwicklung
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-sorin-highlight">{game.name}</h3>
                  <p className="text-sorin-text/80 mb-4">{game.description || "Keine Beschreibung verfügbar."}</p>
                  <div className="flex justify-center">
                    <button 
                      className={`px-4 py-2 rounded-md flex items-center gap-2 ${
                        game.script_available 
                          ? "bg-sorin-accent hover:bg-sorin-highlight text-white" 
                          : "bg-sorin-primary/80 text-sorin-muted"
                      }`}
                    >
                      {game.script_available ? "Script ansehen" : "Bald verfügbar"}
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GameSelection;
