
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CallToAction = () => {
  return (
    <div className="sorin-section py-20 relative">
      <div className="absolute inset-0 bg-gradient-radial from-sorin-accent/10 to-transparent"></div>
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sorin-accent to-sorin-highlight mb-6">
          Beherrsche neue Dimensionen
        </h2>
        
        <p className="text-sorin-muted max-w-2xl mx-auto mb-12">
          Schließe dich einer exklusiven Gemeinschaft an und erlange Zugang zu Fähigkeiten, die anderen verborgen bleiben.
        </p>
        
        <Button className="sorin-button group animate-pulse-slow">
          Jetzt Beitreten
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
        
        <p className="mt-8 text-sm text-sorin-muted">
          Begrenzte Verfügbarkeit. Nur für ausgewählte Benutzer.
        </p>
      </div>
    </div>
  );
};

export default CallToAction;
