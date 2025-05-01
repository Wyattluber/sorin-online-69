
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  // Check if dark mode is enabled
  const isDarkMode = document.documentElement.classList.contains("dark");

  return (
    <footer className="bg-gray-50 dark:bg-sorin-dark border-t border-gray-200 dark:border-sorin-accent/10 py-12 mt-auto transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <span className="text-xl font-bold text-purple-700 dark:text-sorin-highlight dark:sorin-glow">SORIN</span>
            <p className="mt-2 text-sm text-gray-600 dark:text-sorin-muted">
              Die Zukunft des Exploitings. Jetzt.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            <Link to="/" className="text-sm text-gray-700 hover:text-purple-700 dark:text-sorin-muted dark:hover:text-sorin-accent transition-colors duration-300">
              Home
            </Link>
            <Link to="/features" className="text-sm text-gray-700 hover:text-purple-700 dark:text-sorin-muted dark:hover:text-sorin-accent transition-colors duration-300">
              Features
            </Link>
            <Link to="/faq" className="text-sm text-gray-700 hover:text-purple-700 dark:text-sorin-muted dark:hover:text-sorin-accent transition-colors duration-300">
              FAQ
            </Link>
            <Link to="/terms" className="text-sm text-gray-700 hover:text-purple-700 dark:text-sorin-muted dark:hover:text-sorin-accent transition-colors duration-300">
              Terms
            </Link>
            <Link to="/privacy" className="text-sm text-gray-700 hover:text-purple-700 dark:text-sorin-muted dark:hover:text-sorin-accent transition-colors duration-300">
              Privacy
            </Link>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-sorin-accent/10 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs text-gray-600 dark:text-sorin-muted">
            &copy; {new Date().getFullYear()} Sorin. Alle Rechte vorbehalten.
          </p>
          <p className="text-xs text-gray-600 dark:text-sorin-muted mt-4 sm:mt-0">
            Designed für die Elite
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
