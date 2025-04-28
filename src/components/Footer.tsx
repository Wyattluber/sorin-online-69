
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-sorin-dark border-t border-sorin-accent/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <span className="text-xl font-bold text-sorin-highlight sorin-glow">SORIN</span>
            <p className="mt-2 text-sm text-sorin-muted">
              Die Zukunft des Exploitings. Jetzt.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            <Link to="/" className="text-sm text-sorin-muted hover:text-sorin-accent">
              Home
            </Link>
            <Link to="/features" className="text-sm text-sorin-muted hover:text-sorin-accent">
              Features
            </Link>
            <Link to="/faq" className="text-sm text-sorin-muted hover:text-sorin-accent">
              FAQ
            </Link>
            <Link to="/terms" className="text-sm text-sorin-muted hover:text-sorin-accent">
              Terms
            </Link>
            <Link to="/privacy" className="text-sm text-sorin-muted hover:text-sorin-accent">
              Privacy
            </Link>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-sorin-accent/10 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs text-sorin-muted">
            &copy; {new Date().getFullYear()} Sorin. Alle Rechte vorbehalten.
          </p>
          <p className="text-xs text-sorin-muted mt-4 sm:mt-0">
            Designed für die Elite
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
