import React, { useEffect } from "react";
import Contact from "../assets/components/Contact/Contact";

export default function ContactPage() {
  useEffect(() => {
    document.title = "Raavito | Help & Support";
  }, []);

  return (
    <main>
      <Contact />
    </main>
  );
}
