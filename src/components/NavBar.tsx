
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, MessageSquare } from "lucide-react";

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
            <Link to="/features" className="px-3 py-2 text-sm font-medium text-sorin-text hover:text-sorin-highlight transition-colors">
              Features
            </Link>
            <Link to="/faq" className="px-3 py-2 text-sm font-medium text-sorin-text hover:text-sorin-highlight transition-colors">
              FAQ
            </Link>
            <Link to="/privacy" className="px-3 py-2 text-sm font-medium text-sorin-text hover:text-sorin-highlight transition-colors">
              Privacy
            </Link>
            <Button className="border border-sorin-accent/30 bg-sorin-accent/10 text-sorin-text hover:bg-sorin-accent/20 transition-colors">
              <MessageSquare className="w-4 h-4 mr-2" />
              <span>Coming Soon</span>
            </Button>
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
              <Button className="w-full border border-sorin-accent/30 bg-sorin-accent/10 text-sorin-text hover:bg-sorin-accent/20">
                <MessageSquare className="w-4 h-4 mr-2" />
                <span>Coming Soon</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
