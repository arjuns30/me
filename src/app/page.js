"use client";
import React, { useState } from "react";
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
          <ToggleSection key={section} section={section} items={items} />
        ))}
      </main>
    </>
  );
}

function ToggleSection({ section, items }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <SectionWrapper
      id={section.toLowerCase().replace(/\s+/g, "-")}
      title={section}
    >
      <ul>
        {items.map((item, index) =>
          typeof item === "string" ? (
            <li key={index}>{item}</li>
          ) : (
            <li
              key={index}
              className="click-expand-item"
              onClick={() => toggleIndex(index)}
            >
              <div className="item-title">{item.title}</div>
              {openIndex === index && (
                <div className="item-description">{item.description}</div>
              )}
            </li>
          )
        )}
      </ul>
    </SectionWrapper>
  );
}