
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "Was macht Sorin besonders?",
    answer: "Sorin ist nicht nur ein gewöhnliches Skript. Es wurde mit fortschrittlichen Algorithmen entwickelt, die Leistung, Präzision und Zuverlässigkeit auf ein neues Niveau heben. Seine überlegene Architektur ermöglicht Funktionen, die mit herkömmlichen Lösungen nicht möglich sind."
  },
  {
    question: "Ist Sorin sicher zu verwenden?",
    answer: "Absolute Sicherheit ist ein Grundprinzip von Sorin. Das Skript nutzt mehrschichtige Verschlüsselungstechnologien und fortschrittliche Anti-Erkennungsmechanismen, um deine Aktivitäten zu schützen und unsichtbar zu bleiben."
  },
  {
    question: "Wie erhalte ich Zugang zu Sorin?",
    answer: "Sorin ist exklusiv und nur für ausgewählte Benutzer verfügbar. Der Zugang wird nach einem strengen Auswahlverfahren gewährt, um die Qualität und Exklusivität des Dienstes zu gewährleisten."
  },
  {
    question: "Wird Sorin regelmäßig aktualisiert?",
    answer: "Ja, Sorin erhält kontinuierliche Updates, um seine Leistungsfähigkeit zu verbessern und sich an Änderungen anzupassen. Unsere Entwickler arbeiten unermüdlich daran, die fortschrittlichste Lösung auf dem Markt anzubieten."
  },
  {
    question: "Bietet Sorin technischen Support?",
    answer: "Benutzer von Sorin erhalten Zugang zu einem exklusiven Support-System, das schnelle Hilfe und Lösungen für jede Herausforderung bietet."
  },
  {
    question: "Kann ich Sorin auf verschiedenen Systemen verwenden?",
    answer: "Sorin wurde entwickelt, um auf verschiedenen Plattformen und in verschiedenen Umgebungen zu funktionieren. Seine adaptive Natur ermöglicht eine nahtlose Integration in die meisten Systeme."
  }
];

const FAQPage = () => {
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
                Finde Antworten auf Fragen über Sorins fortschrittliche Fähigkeiten und exklusive Funktionen.
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
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQPage;
