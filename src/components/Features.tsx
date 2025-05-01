
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, Users, Settings, Construction, Copy, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const features = [
  {
    title: "Überlegene Leistung",
    description: "Programmiert mit fortschrittlichen Algorithmen, die jeder Roblox-Herausforderung gewachsen sind.",
    icon: <Settings className="h-6 w-6 text-purple-700 dark:text-sorin-highlight transition-colors duration-300" />
  },
  {
    title: "Kosmische Präzision",
    description: "Ausgeführt mit einer Genauigkeit, die selbst in den anspruchsvollsten Spielszenarien überzeugt.",
    icon: <Shield className="h-6 w-6 text-purple-700 dark:text-sorin-highlight transition-colors duration-300" />
  },
  {
    title: "Universelle Anpassung",
    description: "Passt sich nahtlos an verschiedene Roblox-Spiele an, wie ein Organismus aus einer höheren Dimension.",
    icon: <Users className="h-6 w-6 text-purple-700 dark:text-sorin-highlight transition-colors duration-300" />
  },
  {
    title: "Unsichtbare Sicherheit",
    description: "Fortschrittliche Schutzmaßnahmen, die deine Aktivitäten vor Erkennung und Bans schützen.",
    icon: <Lock className="h-6 w-6 text-purple-700 dark:text-sorin-highlight transition-colors duration-300" />
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
        <div className="bg-gray-100/90 dark:bg-[#1A1F2C]/80 border-2 border-purple-400/50 dark:border-sorin-accent/50 backdrop-blur-sm rounded-lg p-6 shadow-lg shadow-gray-200/50 dark:shadow-sorin-accent/10 transition-all duration-300">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="bg-purple-100 dark:bg-sorin-accent/20 p-3 rounded-full transition-colors duration-300">
              <Construction className="h-10 w-10 text-purple-700 dark:text-sorin-highlight animate-pulse transition-colors duration-300" />
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-purple-700 dark:text-sorin-highlight transition-colors duration-300 dark:sorin-glow mb-2">
                Sorin ist derzeit nicht verfügbar
              </h2>
              <p className="text-gray-800 dark:text-sorin-text text-lg mb-2 transition-colors duration-300">
                Unser fortschrittliches Roblox-Script befindet sich noch in der Entwicklungsphase.
              </p>
              <p className="text-gray-600 dark:text-sorin-muted transition-colors duration-300">
                Wir arbeiten mit Hochdruck daran, Sorin bald für dich verfügbar zu machen. Bleib dran für Updates!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-purple-700 dark:text-sorin-highlight transition-colors duration-300 dark:sorin-glow mb-4">Überlegene Funktionen</h2>
          <p className="text-gray-700 dark:text-sorin-muted max-w-2xl mx-auto transition-colors duration-300">
            Entdecke die exklusiven Fähigkeiten von Sorin, die es von gewöhnlichen Roblox-Alternativen unterscheiden.
          </p>
        </div>
        
        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-gray-100 dark:bg-sorin-primary/50 backdrop-blur-sm border-gray-200 dark:border-sorin-accent/20 hover:border-purple-300 dark:hover:border-sorin-accent/40 transition-all duration-300 hover:shadow-md hover:shadow-gray-200 dark:hover:shadow-sorin-accent/10">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="p-2 rounded-full bg-purple-100 dark:bg-sorin-accent/10 border border-purple-200 dark:border-sorin-accent/20 transition-colors duration-300">
                  {feature.icon}
                </div>
                <CardTitle className="text-purple-700 dark:text-sorin-highlight transition-colors duration-300">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-700 dark:text-sorin-text/80 transition-colors duration-300">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Script Placeholder Section */}
        <div className="mt-16 text-center">
          <div className="inline-block sorin-border bg-gray-100 dark:bg-sorin-primary/30 backdrop-blur-sm rounded-lg p-8 max-w-3xl transition-colors duration-300">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-sorin-text transition-colors duration-300">
              Sorin Script <span className="text-purple-700 dark:text-sorin-accent text-sm transition-colors duration-300">(Platzhalter)</span>
            </h3>
            <div className="bg-gray-900 dark:bg-sorin-dark/80 p-4 rounded text-left font-mono text-sm overflow-x-auto relative group transition-colors duration-300">
              <code className="text-purple-400 dark:text-sorin-accent transition-colors duration-300">
                {placeholderScript}
              </code>
            </div>
            <button 
              onClick={copyToClipboard} 
              className="mt-4 px-4 py-2 bg-gray-200 dark:bg-sorin-primary hover:bg-gray-300 dark:hover:bg-sorin-primary/80 border border-gray-300 dark:border-sorin-accent/30 rounded text-gray-800 dark:text-sorin-text text-sm flex items-center justify-center mx-auto gap-2 transition-colors duration-300"
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
            <p className="mt-4 text-sm text-gray-600 dark:text-sorin-muted transition-colors duration-300">
              Dies ist ein Platzhalter-Script. Der echte Script wird bald verfügbar sein.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
