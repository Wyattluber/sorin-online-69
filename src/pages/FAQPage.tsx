
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "🚀 Was ist Sorin?",
    answer: "Sorin ist ein erweitertes Script für Emergency Hamburg auf Roblox, das dir exklusive Funktionen und Vorteile bietet. Mit Sorin schaltest du spezielle Kommandos frei, die dir im Einsatz einen spürbaren Vorsprung verschaffen – bei Einsätzen, Koordination und Taktik."
  },
  {
    question: "🔒 Ist Sorin sicher zu verwenden?",
    answer: "Sorin nutzt moderne Schutztechniken wie Code-Verschleierung und sichere Aufrufe, um Entdeckung so schwierig wie möglich zu machen. Dennoch kann keine vollständige Sicherheit garantiert werden – ein gewisses Risiko bleibt immer bestehen, wenn Serverüberprüfungen stattfinden."
  },
  {
    question: "🧩 Wie erhalte ich Zugang zu Sorin?",
    answer: "Lade einfach den offiziellen Loadstring in deinen Executor und starte Sorin. Beim ersten Start wirst du aufgefordert, einen persönlichen Key zu generieren, um Zugang zu erhalten. Nach erfolgreicher Verifizierung steht dir der gesamte Funktionsumfang zur Verfügung."
  },
  {
    question: "⚙️ Wird Sorin regelmäßig aktualisiert?",
    answer: "Ja! Sorin wird ständig an Spielupdates angepasst und weiterentwickelt. Unser Entwicklerteam sorgt dafür, dass du immer Zugriff auf die neuesten Features und Schutzmechanismen hast."
  },
  {
    question: "🎯 Gibt es technischen Support?",
    answer: "Ja, natürlich! Als Sorin-Nutzer erhältst du Zugang zu unserem Discord Support-System, wo du schnelle Hilfe und Antworten auf alle deine Fragen bekommst."
  },
  {
    question: "🌐 Welche Roblox-Spiele unterstützt Sorin?",
    answer: "Sorin konzentriert sich speziell auf Emergency Hamburg. Dadurch können wir schnelle Updates und maßgeschneiderte Funktionen garantieren, die genau auf dieses Spiel abgestimmt sind."
  },
  {
    question: "🛠️ Brauche ich einen bestimmten Executor für Sorin?",
    answer: "Sorin funktioniert mit den meisten gängigen Roblox-Executors. Für beste Stabilität und volle Unterstützung empfehlen wir jedoch Xeno, um alle Features optimal nutzen zu können."
  },
  {
    question: "🖥️ Kann ich Sorin auf mehreren Geräten nutzen?",
    answer: "Aktuell ist Sorin für Windows-PCs optimiert. Die Erweiterung auf weitere Plattformen ist bereits in Planung, um noch mehr Spielern den Zugang zu ermöglichen."
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
