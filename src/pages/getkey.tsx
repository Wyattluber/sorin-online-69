import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const getkey = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow pt-16">
        <div className="sorin-section py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sorin-accent to-sorin-highlight mb-6">
                Häufig Gestellte Fragen
              </h1>
              <p className="text-sorin-muted max-w-2xl mx-auto">
                Finde Antworten auf Fragen über Sorins fortschrittliche Fähigkeiten und exklusive Funktionen für Roblox.
              </p>
            </div>
            
            <div className="bg-sorin-primary/30 backdrop-blur-sm sorin-border rounded-lg p-6">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-sorin-accent/20">
                    <AccordionTrigger className="text-sorin-text hover:text-sorin-highlight">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sorin-muted">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            
            <div className="mt-16 text-center">
              <p className="text-sorin-muted mb-4">
                Hast du weitere Fragen?
              </p>
              <a href="mailto:contact@sorin-script.com" className="text-sorin-accent hover:text-sorin-highlight underline">
                Kontaktiere uns
              </a>
              <p className="mt-4 text-sorin-muted text-sm">
                Oder besuche bald unseren Discord-Server für direkten Support
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default getkey;