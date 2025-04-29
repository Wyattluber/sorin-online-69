import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const GetKeyPage = () => {
  return (
    <>
      <NavBar />
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">Key-Generator</h1>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="key-info">
            <AccordionTrigger>Wie bekomme ich meinen Key?</AccordionTrigger>
            <AccordionContent>
              (Hier später dein Prozess oder dein Linkvertise-Code.)
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </main>
      <Footer />
    </>
  );
};

export default GetKeyPage;
