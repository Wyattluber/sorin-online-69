
import React, { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const detailedFeatures = [
  {
    title: "Free to Use",
    description: "Keine Paywall bei uns",
    details: [
      "Da wir am Anfang stehen, ist unser Angebot kostenlos",
      "Möglicherweise kann man in Zukunft mit Sorin Plus von einigen Vorteilen wie ein No-Key-System profitieren",
    ]
  },
  {
    title: "Support",
    description: "Auf unserem eigenen Discord Server, steht dir unser Support immer zur Verfügung",
    details: [
      "Unser Discord ist derzeit noch in Entwicklung"
    ]
  },
  {
    title: "Regelmäßige Updates",
    description: "Anpassung an Spieleupdates",
    details: [
      "Wir versuchen immer so schnell wie möglich, das unser Script mit dem Game mithalten kann."
    ]
  }
];

const FeaturesPage = () => {
  const [executionCount, setExecutionCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchExecutionCount = async () => {
      try {
        setLoading(true);
        // Use a direct query to the executions table instead of RPC
        const { data, error } = await supabase
          .from('executions')
          .select('count')
          .single();

        if (error) {
          console.error("Error fetching execution count:", error);
        } else if (data !== null) {
          setExecutionCount(data.count);
        }
      } catch (err) {
        console.error("Failed to fetch execution count:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchExecutionCount();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow pt-16 bg-white dark:bg-transparent transition-colors duration-500">
        <div className="sorin-section py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sorin-accent to-sorin-highlight mb-6">
                Fortschrittliche Funktionen
              </h1>
              <p className="text-gray-700 dark:text-sorin-muted max-w-2xl mx-auto transition-colors duration-300">
                Entdecke die exklusiven Fähigkeiten von Sorin, die es zur ultimativen Exploiting-Lösung machen.
              </p>
            </div>
            
            {/* Execution Stats Container */}
            <div className="bg-gray-100 dark:bg-sorin-primary/40 backdrop-blur-sm border border-gray-200 dark:border-sorin-accent/20 hover:shadow-md hover:shadow-gray-200 dark:hover:shadow-sorin-accent/10 rounded-lg p-6 mb-12 transition-all duration-300">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center gap-4 mb-4 md:mb-0">
                  <div className="p-3 rounded-full bg-purple-100 dark:bg-sorin-accent/20 transition-colors duration-300">
                    <Users className="h-6 w-6 text-purple-700 dark:text-sorin-highlight transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-purple-700 dark:text-sorin-highlight transition-colors duration-300">Script Nutzungsstatistik</h3>
                    <p className="text-gray-700 dark:text-sorin-text/70 transition-colors duration-300">Gesamtausführungen des Sorin Scripts</p>
                  </div>
                </div>
                <div className="bg-purple-100 dark:bg-sorin-accent/10 px-6 py-3 rounded-lg border border-gray-200 dark:border-sorin-accent/30 transition-colors duration-300">
                  <span className="text-2xl font-bold text-purple-700 dark:text-sorin-highlight transition-colors duration-300">
                    {loading ? "Wird geladen..." : executionCount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {detailedFeatures.map((feature, index) => (
                <Card key={index} className="bg-gray-100 dark:bg-sorin-primary/40 backdrop-blur-sm border-gray-200 dark:border-sorin-accent/20 hover:shadow-md hover:shadow-gray-200 dark:hover:shadow-sorin-accent/10 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-purple-700 dark:text-sorin-highlight transition-colors duration-300">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-800 dark:text-sorin-text/90 mb-4 transition-colors duration-300">{feature.description}</p>
                    <ul className="text-sm text-gray-700 dark:text-sorin-muted space-y-2 transition-colors duration-300">
                      {feature.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-purple-700 dark:text-sorin-accent mr-2 transition-colors duration-300">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-16 text-center">
              <a href="https://berlinrpvc.de" target="_blank" rel="noopener noreferrer">
                <Button>
                  Zugang Erhalten
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FeaturesPage;
