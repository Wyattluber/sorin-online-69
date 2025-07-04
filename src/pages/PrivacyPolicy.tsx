
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow pt-16">
        <div className="sorin-section py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sorin-accent to-sorin-highlight mb-6">
                Datenschutzerklärung
              </h1>
              <p className="text-sorin-muted max-w-2xl mx-auto">
                Informationen zum Datenschutz bei der Nutzung von Sorin.
              </p>
            </div>
            
            <div className="bg-sorin-primary/30 backdrop-blur-sm sorin-border rounded-lg p-8 mb-8">
              <h2 className="text-xl font-semibold text-sorin-highlight mb-4">1. Allgemeine Informationen</h2>
              <p className="text-sorin-muted mb-6">
                Wir legen großen Wert auf den Schutz Ihrer personenbezogenen Daten. In dieser Datenschutzerklärung informieren wir Sie über die Art, den Umfang und den Zweck der Erhebung und Verwendung personenbezogener Daten bei der Nutzung unseres Sorin-Skripts und der zugehörigen Dienste.
              </p>
              
              <h2 className="text-xl font-semibold text-sorin-highlight mb-4">2. Datenerhebung und -verwendung</h2>
              <p className="text-sorin-muted mb-6">
                Bei der Nutzung von Sorin werden bestimmte Daten erhoben, die für die Funktionalität, Debugging und Sicherheit unseres Dienstes erforderlich sind. Dies umfasst technische Informationen wie IP-Adressen, Geräte-Informationen, Standortdaten und Nutzungsdaten. Diese Daten werden ausschließlich für folgende Zwecke verwendet:
              </p>
              <ul className="list-disc pl-5 text-sorin-muted mb-6">
                <li>Bereitstellung und Verbesserung unserer Dienste</li>
                <li>Erkennung und Verhinderung von Missbrauch und Betrug</li>
                <li>Debugging und Fehlerbehebung</li>
                <li>Sicherheit des Systems und der Nutzer</li>
                <li>Verhinderung von mehrfachen Key-Generierungen für dasselbe Gerät</li>
                <li>Überwachung der Rate-Limits und Verhinderung von DoS-Angriffen</li>
                <li>Analyse der Nutzungsmuster zur Verbesserung der Systemstabilität</li>
              </ul>
              
              <h2 className="text-xl font-semibold text-sorin-highlight mb-4">3. Sicherheitsmaßnahmen</h2>
              <p className="text-sorin-muted mb-6">
                Wir setzen technische und organisatorische Sicherheitsmaßnahmen ein, um Ihre durch uns verwalteten Daten gegen zufällige oder vorsätzliche Manipulationen, Verlust, Zerstörung oder gegen den Zugriff unberechtigter Personen zu schützen. Unsere Sicherheitsmaßnahmen werden entsprechend der technologischen Entwicklung fortlaufend verbessert.
              </p>
              
              <h2 className="text-xl font-semibold text-sorin-highlight mb-4">4. Keine Weitergabe an Dritte</h2>
              <p className="text-sorin-muted mb-6">
                Ihre personenbezogenen Daten werden nicht an Dritte weitergegeben oder verkauft. Eine Übermittlung an Dritte erfolgt nur dann, wenn dies zur Erfüllung unserer vertraglichen Pflichten erforderlich ist oder wenn wir gesetzlich dazu verpflichtet sind.
              </p>
              
              <h2 className="text-xl font-semibold text-sorin-highlight mb-4">5. IP-Adressen und Standortdaten</h2>
              <p className="text-sorin-muted mb-6">
                Für Sicherheitszwecke und zur Vorbeugung von Missbrauch speichern wir Ihre IP-Adresse und approximative Standortdaten bei der Generierung eines Keys. Diese Informationen helfen uns dabei, missbräuchliche Nutzung zu erkennen, die Sicherheit zu gewährleisten, unser System gegen Angriffe zu schützen und Probleme zu beheben. Bei übermäßigen Anfragen können wir Ihre Geräte-ID oder IP-Adresse blockieren, um die Stabilität unseres Services zu gewährleisten. Diese Daten werden nur so lange aufbewahrt, wie es für die genannten Zwecke erforderlich ist.
              </p>
              
              <h2 className="text-xl font-semibold text-sorin-highlight mb-4">6. Ihre Rechte</h2>
              <p className="text-sorin-muted mb-6">
                Sie haben jederzeit das Recht auf Auskunft über die Sie betreffenden, von uns verarbeiteten personenbezogenen Daten sowie auf Berichtigung oder Löschung dieser Daten. Sie können der Verarbeitung Ihrer Daten widersprechen oder die Einschränkung der Verarbeitung verlangen.
              </p>
              
              <h2 className="text-xl font-semibold text-sorin-highlight mb-4">7. Kontakt</h2>
              <p className="text-sorin-muted">
                Bei Fragen zur Erhebung, Verarbeitung oder Nutzung Ihrer personenbezogenen Daten können Sie uns jederzeit kontaktieren: <a href="mailto:privacy@sorin-script.com" className="text-sorin-accent hover:text-sorin-highlight">privacy@sorin-script.com</a>
              </p>
            </div>
            
            <div className="bg-sorin-primary/30 backdrop-blur-sm sorin-border rounded-lg p-8">
              <h2 className="text-xl font-semibold text-sorin-highlight mb-4">Aktualisierungen</h2>
              <p className="text-sorin-muted">
                Diese Datenschutzrichtlinie kann gelegentlich aktualisiert werden. Wir werden Sie über wesentliche Änderungen informieren, indem wir eine Benachrichtigung auf unserer Website veröffentlichen.
              </p>
              <p className="text-sorin-muted mt-4">
                Letzte Aktualisierung: April 2025
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
