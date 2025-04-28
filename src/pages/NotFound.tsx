
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center px-4 py-20">
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sorin-accent to-sorin-highlight mb-6">
            404
          </h1>
          <p className="text-xl text-sorin-muted mb-8">
            Diese Dimension wurde noch nicht erschlossen
          </p>
          <Button className="sorin-button" onClick={() => window.location.href = "/"}>
            Zurück zum Portal
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
