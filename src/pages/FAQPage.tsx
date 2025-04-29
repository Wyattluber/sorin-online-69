
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "Was ist Sorin?",
    answer: "Sorin ist ein erweitertes Script für Emergency Hamburg, das dir spezielle Spielfunktionen und Vorteile freischaltet.Damit erhältst du Zugriff auf exklusive Befehle und Features, die dir im Einsatz einen klaren Vorteil verschaffen – ob bei der Koordination, Reaktion oder taktischen Planung."
  },
  {
    question: "Ist Sorin sicher zu verwenden?",
    answer: "Sorin wurde entwickelt, um dir in Emergency Hamburg auf Roblox neue Funktionen und Vorteile bereitzustellen – mit besonderem Fokus auf Schutz vor Erkennung.Das Script nutzt Methoden wie Code-Verschleierung und sichere Aufrufe, um möglichst unauffällig zu bleiben.Trotz aller Schutzmaßnahmen kann niemals völlige Sicherheit garantiert werden: Es besteht immer das Risiko, dass Spielmoderatoren oder automatische Systeme Eingriffe erkennen."
  },
  {
    question: "Wie erhalte ich Zugang zu Sorin?",
    answer: "Um Sorin zu nutzen, musst du zunächst den offiziellen Loadstring in deinen Executor laden. Beim ersten Start wirst du aufgefordert, einen persönlichen Key zu generieren. Nach erfolgreicher Verifizierung wird der Zugriff auf alle Funktionen freigeschaltet."
  },
  {
    question: "Wird Sorin regelmäßig aktualisiert?",
    answer: "Ja, Sorin erhält kontinuierliche Updates, um seine Leistungsfähigkeit zu verbessern und sich an Änderungen im Roblox-Ökosystem anzupassen. Unsere Entwickler arbeiten unermüdlich daran, die fortschrittlichste Lösung auf dem Markt anzubieten."
  },
  {
    question: "Bietet Sorin technischen Support?",
    answer: "Benutzer von Sorin erhalten Zugang zu unserem Discord Support-System, das schnelle Hilfe und Lösungen für jede Herausforderung bietet."
  },
  {
    question: "Welche Roblox-Spiele werden unterstützt?",
    answer: "Sorin ist speziell auf Emergency Hamburg ausgerichtet, um dir stets aktuelle Features und Verbesserungen bieten zu können. Durch diese Fokussierung können Updates besonders schnell bereitgestellt und neue Funktionen zeitnah integriert werden."
  },
  {
    question: "Benötige ich einen speziellen Executor für Sorin?",
    answer: "Sorin funktioniert mit den meisten gängigen Roblox-Executors. Für optimale Leistung empfehlen wir jedoch Xeno, welcher alle Funktionen von Sorin voll unterstützen. Sollte"
  },
  {
    question: "Kann ich Sorin auf verschiedenen Geräten verwenden?",
    answer: "Aktuell ist Sorin hauptsächlich für Windows-PCs optimiert. Wir arbeiten jedoch an der Unterstützung weiterer Plattformen, um die Zugänglichkeit zu verbessern."
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

export default FAQPage;
