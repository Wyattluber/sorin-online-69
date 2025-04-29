
import React from "react";
import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import GameSelection from "@/components/GameSelection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow">
        <Hero />
        <GameSelection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
