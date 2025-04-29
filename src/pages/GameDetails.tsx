
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Copy, Link } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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
  const [scriptContent, setScriptContent] = useState(`-- Sorin Script für Notruf Hamburg
-- Version 1.0

local Players = game:GetService("Players")
local LocalPlayer = Players.LocalPlayer
local Character = LocalPlayer.Character or LocalPlayer.CharacterAdded:Wait()

-- Hauptfunktionen
local function teleportToEmergency()
    local emergencies = workspace:FindFirstChild("Einsätze")
    if emergencies then
        for _, emergency in pairs(emergencies:GetChildren()) do
            if emergency:IsA("Model") then
                local primaryPart = emergency:FindFirstChild("PrimaryPart")
                if primaryPart then
                    Character:SetPrimaryPartCFrame(CFrame.new(primaryPart.Position + Vector3.new(0, 5, 0)))
                    return true
                end
            end
        end
    end
    return false
end

-- ESP Funktionen
local function createESP()
    local emergencies = workspace:FindFirstChild("Einsätze")
    if emergencies then
        for _, emergency in pairs(emergencies:GetChildren()) do
            if emergency:IsA("Model") then
                local highlight = Instance.new("Highlight")
                highlight.FillColor = Color3.fromRGB(255, 0, 0)
                highlight.OutlineColor = Color3.fromRGB(255, 255, 0)
                highlight.FillTransparency = 0.5
                highlight.OutlineTransparency = 0
                highlight.Parent = emergency
            end
        end
    end
end

-- Fahrzeug-Modifikationen
local function boostVehicles()
    local vehicles = workspace:FindFirstChild("Fahrzeuge")
    if vehicles then
        for _, vehicle in pairs(vehicles:GetChildren()) do
            if vehicle:IsA("Model") and vehicle:FindFirstChild("Engine") then
                local engine = vehicle.Engine
                if engine:FindFirstChild("MaxSpeed") then
                    engine.MaxSpeed.Value = engine.MaxSpeed.Value * 1.5
                end
            end
        end
    end
end

-- Anti-Kick Schutz
local function setupAntiKick()
    local oldNamecall
    oldNamecall = hookmetamethod(game, "__namecall", function(self, ...)
        local method = getnamecallmethod()
        if method == "Kick" or method == "Teleport" then
            print("Kick/Teleport verhindert")
            return wait(9e9)
        end
        return oldNamecall(self, ...)
    end)
end

-- Befehle
local commands = {
    ["/tp"] = teleportToEmergency,
    ["/esp"] = createESP,
    ["/boost"] = boostVehicles,
    ["/antikick"] = setupAntiKick
}

-- Chat-Hook für Befehle
LocalPlayer.Chatted:Connect(function(message)
    for cmd, func in pairs(commands) do
        if message:lower():sub(1, #cmd) == cmd:lower() then
            local success = func()
            print(cmd .. " ausgeführt: " .. (success and "Erfolgreich" or "Fehlgeschlagen"))
        end
    end
end)

print("Sorin Script für Notruf Hamburg wurde geladen!")
print("Verfügbare Befehle: /tp, /esp, /boost, /antikick")
`);

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
    navigator.clipboard.writeText(scriptContent)
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
                <p className="text-sorin-text/90 mb-4">Das Script ist verfügbar und bereit zum Kopieren.</p>
                <div className="mb-8">
                  <Button 
                    className="bg-sorin-accent hover:bg-sorin-highlight flex items-center gap-2"
                    onClick={copyScript}
                  >
                    <Copy className="h-4 w-4" />
                    Script kopieren
                  </Button>
                </div>
                
                <div className="mt-4">
                  <div className="bg-sorin-dark/70 p-4 rounded-md">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-sorin-muted">script-{game.name.toLowerCase().replace(/\s+/g, '-')}.lua</span>
                      <Button 
                        variant="ghost" 
                        className="h-8 w-8 p-0 text-sorin-muted hover:text-sorin-highlight"
                        onClick={copyScript}
                      >
                        <Copy className="h-4 w-4" />
                        <span className="sr-only">Kopieren</span>
                      </Button>
                    </div>
                    <pre className="text-xs md:text-sm text-sorin-text/90 overflow-x-auto p-4 bg-sorin-dark/50 rounded border border-sorin-accent/10">
                      <code>{scriptContent}</code>
                    </pre>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-sorin-text/90">Das Script ist derzeit in Entwicklung und wird bald verfügbar sein.</p>
            )}

            <div className="mt-8 border-t border-sorin-accent/10 pt-8">
              <h2 className="text-xl font-semibold text-sorin-highlight mb-4">Installation</h2>
              <ol className="list-decimal pl-5 space-y-2 text-sorin-text/90">
                <li>Kopiere das Script mit dem Button oben.</li>
                <li>Öffne deinen Roblox Executor.</li>
                <li>Füge das Script in deinen Executor ein.</li>
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
