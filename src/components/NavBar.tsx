
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed w-full z-50 bg-gradient-to-b from-sorin-dark to-sorin-accent/30 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <span className="text-xl font-bold text-sorin-highlight sorin-glow">SORIN</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="px-3 py-2 text-sm font-medium text-sorin-text hover:text-sorin-highlight transition-colors">
              Home
            </Link>
            <Link to="/getkey" className="px-3 py-2 text-sm font-medium text-sorin-text hover:text-sorin-highlight transition-colors">
              Get Key
            </Link>
            <Link to="/features" className="px-3 py-2 text-sm font-medium text-sorin-text hover:text-sorin-highlight transition-colors">
              Features
            </Link>
            <Link to="/faq" className="px-3 py-2 text-sm font-medium text-sorin-text hover:text-sorin-highlight transition-colors">
              FAQ
            </Link>
            <Link to="/privacy" className="px-3 py-2 text-sm font-medium text-sorin-text hover:text-sorin-highlight transition-colors">
              Privacy
            </Link>
            <a href="https://discord.gg/sorin" target="_blank" rel="noopener noreferrer" className="border border-sorin-accent/30 bg-sorin-accent/10 text-sorin-text hover:bg-sorin-accent/20 transition-colors rounded-md px-4 py-2 inline-flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <circle cx="9" cy="12" r="1"/>
                <circle cx="15" cy="12" r="1"/>
                <path d="M7.5 7.2c-1 .1-3 .4-4.5 1.3-2 1.3-2 10.5-2 10.5s0 9.2 2 10.5c1.5.9 3.5 1.3 4.5 1.3"/>
                <path d="M16.5 7.2c1 .1 3 .4 4.5 1.3 2 1.3 2 10.5 2 10.5s0 9.2-2 10.5c-1.5.9-3.5 1.3-4.5 1.3"/>
                <path d="M16.5 7.2c-.3-1.4-1.4-2.8-2.5-3.9-1.2-1.2-3-2.3-4.5-2.3"/>
                <path d="M7.5 7.2c.3-1.4 1.4-2.8 2.5-3.9 1.2-1.2 3-2.3 4.5-2.3"/>
                <path d="M7.8 14.4c-.2 3.4.9 6 2.2 6 1.3 0 2.4-2.6 2.2-6s-1.2-5.8-2.2-5.8c-1 0-2.4 2.4-2.2 5.8Z"/>
                <path d="M16.2 14.4c.2 3.4-.9 6-2.2 6-1.3 0-2.4-2.6-2.2-6S13 8.6 14 8.6c1 0 2.4 2.4 2.2 5.8Z"/>
              </svg>
              <span>Discord</span>
            </a>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-sorin-text hover:text-sorin-highlight"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-sorin-dark/95 backdrop-blur-md border-t border-sorin-accent/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-sorin-text hover:text-sorin-highlight"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/getkey"
              className="block px-3 py-2 rounded-md text-base font-medium text-sorin-text hover:text-sorin-highlight"
              onClick={() => setIsMenuOpen(false)}
            >
              Key holen
            </Link>
            <Link
              to="/features"
              className="block px-3 py-2 rounded-md text-base font-medium text-sorin-text hover:text-sorin-highlight"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              to="/faq"
              className="block px-3 py-2 rounded-md text-base font-medium text-sorin-text hover:text-sorin-highlight"
              onClick={() => setIsMenuOpen(false)}
            >
              FAQ
            </Link>
            <Link
              to="/privacy"
              className="block px-3 py-2 rounded-md text-base font-medium text-sorin-text hover:text-sorin-highlight"
              onClick={() => setIsMenuOpen(false)}
            >
              Privacy
            </Link>
            <div className="px-3 py-2">
              <a href="https://discord.gg/sorin" target="_blank" rel="noopener noreferrer" className="w-full border border-sorin-accent/30 bg-sorin-accent/10 text-sorin-text hover:bg-sorin-accent/20 transition-colors rounded-md px-4 py-2 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <circle cx="9" cy="12" r="1"/>
                  <circle cx="15" cy="12" r="1"/>
                  <path d="M7.5 7.2c-1 .1-3 .4-4.5 1.3-2 1.3-2 10.5-2 10.5s0 9.2 2 10.5c1.5.9 3.5 1.3 4.5 1.3"/>
                  <path d="M16.5 7.2c1 .1 3 .4 4.5 1.3 2 1.3 2 10.5 2 10.5s0 9.2-2 10.5c-1.5.9-3.5 1.3-4.5 1.3"/>
                  <path d="M16.5 7.2c-.3-1.4-1.4-2.8-2.5-3.9-1.2-1.2-3-2.3-4.5-2.3"/>
                  <path d="M7.5 7.2c.3-1.4 1.4-2.8 2.5-3.9 1.2-1.2 3-2.3 4.5-2.3"/>
                  <path d="M7.8 14.4c-.2 3.4.9 6 2.2 6 1.3 0 2.4-2.6 2.2-6s-1.2-5.8-2.2-5.8c-1 0-2.4 2.4-2.2 5.8Z"/>
                  <path d="M16.2 14.4c.2 3.4-.9 6-2.2 6-1.3 0-2.4-2.6-2.2-6S13 8.6 14 8.6c1 0 2.4 2.4 2.2 5.8Z"/>
                </svg>
                <span>Discord</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
