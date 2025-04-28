
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NavBar = () => {
  return (
    <nav className="fixed w-full z-50 bg-sorin-dark/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <span className="text-xl font-bold text-sorin-highlight sorin-glow">SORIN</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link to="/" className="px-3 py-2 text-sm font-medium text-sorin-text hover:text-sorin-accent">
                Home
              </Link>
              <Link to="/features" className="px-3 py-2 text-sm font-medium text-sorin-text hover:text-sorin-accent">
                Features
              </Link>
              <Link to="/faq" className="px-3 py-2 text-sm font-medium text-sorin-text hover:text-sorin-accent">
                FAQ
              </Link>
              <Button className="sorin-button">
                Get Access
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
