
import React from "react";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="sorin-section flex items-center justify-center min-h-screen pt-16 pb-32">
      <div className="absolute inset-0 bg-gradient-radial from-sorin-accent/5 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-sorin-dark to-transparent"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-float mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-sorin-accent to-sorin-highlight mb-6">
            SORIN
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl font-medium text-sorin-text/90 mb-8">
            Die ultimative <span className="text-sorin-highlight">Roblox-Exploiting-Lösung</span> aus einer anderen Dimension
          </p>
        </div>
        
        <p className="text-sorin-muted max-w-2xl mx-auto mb-12">
          Entdecke eine Leistungsfähigkeit jenseits des Bekannten. Sorin ist nicht nur ein Skript – es ist die Synthese aus technologischer Perfektion und kosmischer Präzision für deine Roblox-Erfahrung.
        </p>
        
        <div className="mt-16 flex justify-center">
          <a href="#features" className="flex items-center text-sorin-accent hover:text-sorin-highlight transition-colors">
            <span className="mr-2">Entdecke die Features</span>
            <ArrowRight className="h-4 w-4 animate-pulse" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
