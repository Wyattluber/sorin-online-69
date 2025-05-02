
import React from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

// Define container type from the getkey page
export type KeyContainer = {
  id: string;
  name: string;
  image_url: string | null;
  redirect_url: string;
  active: boolean;
  position: number;
}

type KeyContainerProps = {
  containers: KeyContainer[];
  isLoading: boolean;
  onSelectContainer: (redirectUrl: string) => void;
  isGeneratingKey: boolean;
}

const KeyContainer = ({ containers, isLoading, onSelectContainer, isGeneratingKey }: KeyContainerProps) => {
  if (isLoading) {
    return (
      <div className="space-y-4 w-full max-w-md mx-auto">
        <Skeleton className="h-24 w-full bg-gray-200 dark:bg-sorin-primary/40" />
        <Skeleton className="h-24 w-full bg-gray-200 dark:bg-sorin-primary/40" />
      </div>
    );
  }

  if (containers.length === 0) {
    return (
      <div className="bg-white dark:bg-sorin-primary p-6 rounded-lg shadow-md border border-gray-200 dark:border-sorin-accent/30 max-w-md">
        <p className="text-gray-700 dark:text-sorin-text">
          Derzeit sind keine Key-Generierungs-Optionen verfügbar. Bitte versuche es später erneut.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-sorin-primary p-6 rounded-lg shadow-md border border-gray-200 dark:border-sorin-accent/30 w-full md:w-[70%] max-w-lg mx-auto space-y-4">
      {containers.map((container) => (
        <Button 
          key={container.id}
          onClick={() => onSelectContainer(container.redirect_url)}
          disabled={isGeneratingKey}
          className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 dark:from-sorin-accent dark:to-sorin-accent/80 dark:text-sorin-dark dark:hover:from-sorin-highlight dark:hover:to-sorin-highlight/90 flex justify-between items-center gap-4 p-6 w-full h-24"
        >
          <div className="w-16 h-16 flex items-center justify-center overflow-hidden bg-transparent">
            {container.image_url ? (
              <img 
                src={container.image_url} 
                alt={`${container.name} logo`} 
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="text-sm text-gray-100 dark:text-sorin-dark/70">Logo</div>
            )}
          </div>
          <div className="flex-1 text-left">
            <span className="block font-medium text-lg">
              {isGeneratingKey ? "Generiere Key..." : container.name}
            </span>
          </div>
        </Button>
      ))}
    </div>
  );
};

export default KeyContainer;
