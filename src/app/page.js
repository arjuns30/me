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
          <SectionBlock key={section} section={section} items={items} />
        ))}
      </main>
    </>
  );
}

function SectionBlock({ section, items }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <SectionWrapper
      id={section.toLowerCase().replace(/\s+/g, "-")}
      title={section}
    >
      {section === "About Me" ? (
        // About Me: image plus titles to the right
        <div className="about-me-container">
          <img
            src="/arjun.jpg"
            alt="Arjun Suri"
            className="about-me-photo"
          />
          <ul className="about-me-text">
            {items.map((item, index) => (
              // <-- Use item.title, not item
              <li key={index}>{item.title}</li>
            ))}
          </ul>
        </div>
      ) : (
        // All other sections
        <ul>
          {items.map((item, index) => {
            // Plain strings (if any)
            if (typeof item === "string") {
              return <li key={index}>{item}</li>;
            }
            // Objects with title/description
            return (
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
            );
          })}
        </ul>
      )}
    </SectionWrapper>
  );
}