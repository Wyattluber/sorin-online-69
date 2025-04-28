
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "Überlegene Leistung",
    description: "Programmiert mit fortschrittlichen Algorithmen, die jeder Herausforderung gewachsen sind."
  },
  {
    title: "Kosmische Präzision",
    description: "Ausgeführt mit einer Genauigkeit, die an die Präzision planetarer Bahnen erinnert."
  },
  {
    title: "Universelle Anpassung",
    description: "Passt sich nahtlos jeder Umgebung an, wie ein Organismus aus einer höheren Dimension."
  },
  {
    title: "Quantengeschwindigkeit",
    description: "Reagiert mit einer Geschwindigkeit, die die Grenzen der wahrgenommenen Zeit überschreitet."
  }
];

const Features = () => {
  return (
    <div className="sorin-section py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-sorin-highlight sorin-glow mb-4">Überlegene Funktionen</h2>
          <p className="text-sorin-muted max-w-2xl mx-auto">
            Entdecke die exklusiven Fähigkeiten von Sorin, die es von gewöhnlichen Alternativen unterscheiden.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-sorin-primary/50 backdrop-blur-sm border-sorin-accent/20 hover:border-sorin-accent/40 transition-all duration-300 hover:shadow-md hover:shadow-sorin-accent/10">
              <CardHeader>
                <CardTitle className="text-sorin-highlight">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sorin-text/80">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-block sorin-border bg-sorin-primary/30 backdrop-blur-sm rounded-lg p-8 max-w-3xl">
            <h3 className="text-xl font-semibold mb-4 text-sorin-text">Sorin Script</h3>
            <div className="bg-sorin-dark/80 p-4 rounded text-left font-mono text-sm overflow-x-auto">
              <code className="text-sorin-accent">
                loadstring(game:HttpGet("https://raw.githubusercontent.com/sorin-dev/sorin/main/script", true))()
              </code>
            </div>
            <button className="mt-4 px-4 py-2 bg-sorin-primary hover:bg-sorin-primary/80 border border-sorin-accent/30 rounded text-sorin-text text-sm">
              Kopieren
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
