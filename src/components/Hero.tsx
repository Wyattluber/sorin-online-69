
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="sorin-section flex items-center justify-center min-h-screen pt-16 pb-32">
      <div className="absolute inset-0 bg-gradient-radial from-sorin-accent/5 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-sorin-dark to-transparent"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-float">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-sorin-accent to-sorin-highlight mb-6">
            SORIN
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl font-medium text-sorin-text/90 mb-8">
            Die ultimative <span className="text-sorin-highlight">Exploiting-Lösung</span> aus einer anderen Dimension
          </p>
        </div>
        
        <p className="text-sorin-muted max-w-2xl mx-auto mb-12">
          Entdecke eine Leistungsfähigkeit jenseits des Bekannten. Sorin ist nicht nur ein Skript – es ist die Synthese aus technologischer Perfektion und kosmischer Präzision.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="sorin-button group">
            Download Starten
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button variant="outline" className="border-sorin-accent/30 text-sorin-text hover:bg-sorin-accent/10">
            Features Entdecken
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
