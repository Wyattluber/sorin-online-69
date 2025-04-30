
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu, X } from "lucide-react";

// Navigation items
const navItems = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "FAQ", href: "/faq" }
];

const NavBar = () => {
  const [isDark, setIsDark] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Load theme preference from localStorage on initial mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme) {
      setIsDark(savedTheme === "dark");
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
      setIsDark(prefersDark);
      document.documentElement.classList.toggle("dark", prefersDark);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark ? "dark" : "light";
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", newTheme);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-sorin-primary/80 backdrop-blur-sm border-b border-sorin-accent/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-sorin-highlight text-xl font-bold">
              <span className="gradient-text">SORIN</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-sorin-highlight ${
                  location.pathname === item.href
                    ? "text-sorin-highlight"
                    : "text-sorin-text/80"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <a 
              href="https://discord.gg/rGRuta76s5" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sorin-text hover:text-sorin-highlight transition-colors"
              title="Join our Discord"
            >
              <img src="/lovable-uploads/4647c9a4-8e27-4278-bd5b-4822fea03a84.png" alt="Discord Logo" className="h-6 w-6" />
            </a>

            {/* Theme Toggle */}
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={toggleTheme}
            >
              {isDark ? (
                <Sun className="h-4 w-4 text-sorin-text" />
              ) : (
                <Moon className="h-4 w-4 text-sorin-text" />
              )}
            </Button>

            {/* Get Key Button */}
            <Link to="/getkey">
              <Button className="bg-sorin-accent text-sorin-dark hover:bg-sorin-highlight">
                Get Key
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full ml-4"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-4 w-4 text-sorin-text" />
              ) : (
                <Menu className="h-4 w-4 text-sorin-text" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-sorin-primary/90 backdrop-blur-md">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`block px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === item.href
                    ? "text-sorin-highlight bg-sorin-accent/10"
                    : "text-sorin-text/80 hover:text-sorin-highlight hover:bg-sorin-accent/5"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex items-center justify-between px-3 py-2">
              <div className="flex items-center space-x-4">
                <a 
                  href="https://discord.gg/rGRuta76s5" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sorin-text hover:text-sorin-highlight transition-colors"
                  title="Join our Discord"
                >
                  <img src="/lovable-uploads/4647c9a4-8e27-4278-bd5b-4822fea03a84.png" alt="Discord Logo" className="h-6 w-6" />
                </a>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                  onClick={toggleTheme}
                >
                  {isDark ? (
                    <Sun className="h-4 w-4 text-sorin-text" />
                  ) : (
                    <Moon className="h-4 w-4 text-sorin-text" />
                  )}
                </Button>
              </div>
              <Link to="/getkey" onClick={() => setIsOpen(false)}>
                <Button className="bg-sorin-accent text-sorin-dark hover:bg-sorin-highlight">
                  Get Key
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
