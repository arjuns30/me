// pages/index.js
import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SectionWrapper from "../components/SectionWrapper";
import content from "../data/content";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="main">
        <Hero />
        {Object.entries(content).map(([section, items]) => (
          <SectionWrapper
            key={section}
            id={section.toLowerCase().replace(/\s+/g, "-")}
            title={section}
          >
            <ul>
              {items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </SectionWrapper>
        ))}
      </main>
    </>
  );
}