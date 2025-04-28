
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, Users, Settings, Construction, Copy, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const features = [
  {
    title: "Überlegene Leistung",
    description: "Programmiert mit fortschrittlichen Algorithmen, die jeder Roblox-Herausforderung gewachsen sind.",
    icon: <Settings className="h-6 w-6 text-sorin-highlight" />
  },
  {
    title: "Kosmische Präzision",
    description: "Ausgeführt mit einer Genauigkeit, die selbst in den anspruchsvollsten Spielszenarien überzeugt.",
    icon: <Shield className="h-6 w-6 text-sorin-highlight" />
  },
  {
    title: "Universelle Anpassung",
    description: "Passt sich nahtlos an verschiedene Roblox-Spiele an, wie ein Organismus aus einer höheren Dimension.",
    icon: <Users className="h-6 w-6 text-sorin-highlight" />
  },
  {
    title: "Unsichtbare Sicherheit",
    description: "Fortschrittliche Schutzmaßnahmen, die deine Aktivitäten vor Erkennung und Bans schützen.",
    icon: <Lock className="h-6 w-6 text-sorin-highlight" />
  }
];

const Features = () => {
  const [copied, setCopied] = useState(false);
  
  const placeholderScript = 'loadstring(game:HttpGet("https://raw.githubusercontent.com/sorin-dev/sorin/main/script", true))()';
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(placeholderScript).then(() => {
      setCopied(true);
      toast({
        title: "Code kopiert",
        description: "Der Platzhalter-Script wurde in die Zwischenablage kopiert",
        duration: 3000,
      });
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div id="features" className="sorin-section py-24 relative">
      {/* Development Notice Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-[#1A1F2C]/80 border-2 border-sorin-accent/50 backdrop-blur-sm rounded-lg p-6 shadow-lg shadow-sorin-accent/10">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="bg-sorin-accent/20 p-3 rounded-full">
              <Construction className="h-10 w-10 text-sorin-highlight animate-pulse" />
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-sorin-highlight sorin-glow mb-2">
                Sorin ist derzeit nicht verfügbar
              </h2>
              <p className="text-sorin-text text-lg mb-2">
                Unser fortschrittliches Roblox-Script befindet sich noch in der Entwicklungsphase.
              </p>
              <p className="text-sorin-muted">
                Wir arbeiten mit Hochdruck daran, Sorin bald für dich verfügbar zu machen. Bleib dran für Updates!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-sorin-highlight sorin-glow mb-4">Überlegene Funktionen</h2>
          <p className="text-sorin-muted max-w-2xl mx-auto">
            Entdecke die exklusiven Fähigkeiten von Sorin, die es von gewöhnlichen Roblox-Alternativen unterscheiden.
          </p>
        </div>
        
        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-sorin-primary/50 backdrop-blur-sm border-sorin-accent/20 hover:border-sorin-accent/40 transition-all duration-300 hover:shadow-md hover:shadow-sorin-accent/10">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="p-2 rounded-full bg-sorin-accent/10 border border-sorin-accent/20">
                  {feature.icon}
                </div>
                <CardTitle className="text-sorin-highlight">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sorin-text/80">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Script Section - Placeholder with working copy button */}
        <div className="mt-16 text-center">
          <div className="inline-block sorin-border bg-sorin-primary/30 backdrop-blur-sm rounded-lg p-8 max-w-3xl">
            <h3 className="text-xl font-semibold mb-4 text-sorin-text">
              Sorin Script <span className="text-sorin-accent text-sm">(Platzhalter)</span>
            </h3>
            <div className="bg-sorin-dark/80 p-4 rounded text-left font-mono text-sm overflow-x-auto relative group">
              <code className="text-sorin-accent">
                {placeholderScript}
              </code>
            </div>
            <button 
              onClick={copyToClipboard} 
              className="mt-4 px-4 py-2 bg-sorin-primary hover:bg-sorin-primary/80 border border-sorin-accent/30 rounded text-sorin-text text-sm flex items-center justify-center mx-auto gap-2"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Kopiert</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Kopieren</span>
                </>
              )}
            </button>
            <p className="mt-4 text-sm text-sorin-muted">
              Dies ist ein Platzhalter-Script. Der echte Script wird bald verfügbar sein.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
