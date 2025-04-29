
import React from "react";
import { ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Hero = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="sorin-section flex items-center justify-center min-h-screen pt-16 pb-32 relative overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0 z-0">
        {isMobile ? (
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ 
              backgroundImage: `url("/lovable-uploads/52b3b98a-55b1-4524-8434-c0c323b708a3.png")`,
              filter: 'brightness(0.4)'
            }}
          />
        ) : (
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ 
              backgroundImage: `url("/lovable-uploads/74f89b9e-5961-43ee-864e-dfa21ab29871.png")`,
              filter: 'brightness(0.4)'
            }}
          />
        )}
      </div>
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-radial from-sorin-accent/5 to-transparent z-1"></div>
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-sorin-dark to-transparent z-1"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-12">
          <p className="text-xl sm:text-2xl md:text-3xl font-medium text-sorin-text/90 mb-8">
            Die ultimative <span className="text-sorin-highlight">Roblox-Exploiting-Lösung</span> aus einer anderen Dimension
          </p>
        </div>
        
        <p className="text-sorin-muted max-w-2xl mx-auto mb-12">
          Entdecke eine Leistungsfähigkeit jenseits des Bekannten. Sorin ist nicht nur ein Skript – es ist die Synthese aus technologischer Perfektion und kosmischer Präzision für deine Roblox-Erfahrung.
        </p>
        
        <div className="mt-16 flex justify-center">
          <a href="#games" className="flex items-center text-sorin-accent hover:text-sorin-highlight transition-colors">
            <span className="mr-2">Unterstützte Spiele entdecken</span>
            <ArrowRight className="h-4 w-4 animate-pulse" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
