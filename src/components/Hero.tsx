
import React from "react";
import { ArrowDown } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Hero = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="sorin-section flex items-center justify-center min-h-[70vh] pt-16 pb-12 relative overflow-hidden">
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
        {/*<h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-sorin-highlight sorin-glow mb-6">
          SORIN
        </h1>*/}
        
        <p className="text-xl sm:text-2xl font-medium text-sorin-text/90 mb-8">
  Das intergalaktische <span className="text-sorin-highlight">Roblox-Exploiting-Script</span>
</p>

        
        <div className="mt-10 flex justify-center">
          <a href="#games" className="flex items-center gap-2 bg-sorin-accent/20 hover:bg-sorin-accent/40 transition-colors px-4 py-2 rounded-md text-sorin-text">
            <span>Unterstützte Spiele entdecken</span>
            <ArrowDown className="h-4 w-4 animate-bounce" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
