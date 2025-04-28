
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const detailedFeatures = [
  {
    title: "Überlegene Leistung",
    description: "Das fortschrittlichste Skript seiner Klasse, entwickelt mit algorithmischer Perfektion.",
    details: [
      "Hochoptimierte Ausführung für maximale Effizienz",
      "Intelligente Anpassung an verschiedene Systemumgebungen",
      "Minimaler Ressourcenverbrauch bei maximaler Leistung"
    ]
  },
  {
    title: "Kosmische Präzision",
    description: "Erlebe eine beispiellose Genauigkeit, die selbst den anspruchsvollsten Anforderungen gerecht wird.",
    details: [
      "Pixelgenaue Interaktionen mit dynamischen Umgebungen",
      "Präzises Timing für kritische Operationen",
      "Konsistente Ergebnisse unter allen Bedingungen"
    ]
  },
  {
    title: "Universelle Anpassung",
    description: "Passt sich nahtlos an Veränderungen an - wie eine Entität aus einer höheren Dimension.",
    details: [
      "Automatische Anpassung an Systemupdates",
      "Flexibles Verhalten in unvorhersehbaren Szenarien",
      "Kompatibilität mit verschiedenen Konfigurationen"
    ]
  },
  {
    title: "Quantengeschwindigkeit",
    description: "Reagiert mit einer Geschwindigkeit, die die Grenzen der wahrgenommenen Zeit überschreitet.",
    details: [
      "Blitzschnelle Reaktionszeit auf alle Events",
      "Vorausschauende Verarbeitung für verzögerungsfreie Ausführung",
      "Optimierte Code-Pfade für kritische Funktionen"
    ]
  },
  {
    title: "Kosmischer Schutz",
    description: "Fortschrittliche Sicherheitsmaßnahmen, die deine Aktivitäten vor neugierigen Blicken schützen.",
    details: [
      "Mehrschichtige Verschlüsselungstechnologien",
      "Unsichtbare Operation auf Systemebene",
      "Selbstschützende Anti-Analyse-Mechanismen"
    ]
  },
  {
    title: "Dimensionsübergreifende Integration",
    description: "Verbinde dich nahtlos mit zusätzlichen Diensten und erweitere deine Fähigkeiten.",
    details: [
      "Nahtlose Kommunikation mit externen Ressourcen",
      "Modulare Architektur für einfache Erweiterbarkeit",
      "API-Integration mit bestehenden Systemen"
    ]
  }
];

const FeaturesPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow pt-16">
        <div className="sorin-section py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sorin-accent to-sorin-highlight mb-6">
                Fortschrittliche Funktionen
              </h1>
              <p className="text-sorin-muted max-w-2xl mx-auto">
                Entdecke die exklusiven Fähigkeiten von Sorin, die es zur ultimativen Exploiting-Lösung machen.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {detailedFeatures.map((feature, index) => (
                <Card key={index} className="bg-sorin-primary/40 backdrop-blur-sm border-sorin-accent/20 hover:shadow-md hover:shadow-sorin-accent/10 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-sorin-highlight">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sorin-text/90 mb-4">{feature.description}</p>
                    <ul className="text-sm text-sorin-muted space-y-2">
                      {feature.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-sorin-accent mr-2">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-16 text-center">
              <Button className="sorin-button group">
                Zugang Erhalten
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FeaturesPage;
