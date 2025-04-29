
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow container mx-auto px-4 py-16 mt-16">
        <div className="bg-sorin-primary/50 backdrop-blur-sm rounded-lg p-6 border border-sorin-accent/20 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-sorin-highlight sorin-glow mb-8">Nutzungsbedingungen</h1>
          
          <div className="space-y-6 text-sorin-text/90">
            <section>
              <h2 className="text-xl font-semibold text-sorin-highlight mb-4">1. Nutzung von SORIN</h2>
              <p>Durch die Nutzung unserer Dienste erklären Sie sich mit diesen Bedingungen einverstanden. Bitte lesen Sie diese sorgfältig durch. Unsere Dienste sind sehr vielfältig, daher können manchmal zusätzliche Bedingungen oder Produktanforderungen gelten.</p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-sorin-highlight mb-4">2. Verwendung unserer Dienste</h2>
              <p>Sie müssen die in unseren Diensten geltenden Richtlinien einhalten. Sie dürfen unsere Dienste nur im gesetzlich zulässigen Rahmen nutzen. Wir können die Bereitstellung unserer Dienste an Sie aussetzen oder einstellen, wenn Sie gegen unsere Bedingungen oder Richtlinien verstoßen oder wenn wir ein mutmaßliches Fehlverhalten untersuchen.</p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-sorin-highlight mb-4">3. Scripts und Inhalte</h2>
              <p>Die auf SORIN angebotenen Scripts sind ausschließlich für den persönlichen Gebrauch bestimmt. Das Kopieren, Verbreiten oder kommerzielle Nutzen der Scripts ohne ausdrückliche Genehmigung ist untersagt. Die Nutzung der Scripts erfolgt auf eigene Gefahr und Verantwortung. Wir übernehmen keine Haftung für Schäden, die durch die Verwendung unserer Scripts entstehen können.</p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-sorin-highlight mb-4">4. Haftungsbeschränkung</h2>
              <p>Wir schließen jegliche Haftung für direkte, indirekte, zufällige, spezielle, beispielhafte oder Folgeschäden aus, einschließlich entgangenen Gewinns, unabhängig davon, ob diese auf einer Garantie, einem Vertrag, unerlaubter Handlung oder einer anderen rechtlichen Grundlage beruhen, selbst wenn wir über die Möglichkeit solcher Schäden informiert wurden.</p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-sorin-highlight mb-4">5. Änderungen der Bedingungen</h2>
              <p>Wir können diese Bedingungen oder zusätzliche für einen Dienst geltende Bedingungen von Zeit zu Zeit ändern. Sie sollten die Bedingungen regelmäßig auf Änderungen überprüfen. Änderungen an diesen Bedingungen werden auf dieser Seite veröffentlicht.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
