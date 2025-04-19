// src/app/page.js
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
          <SectionBlock
            key={section}
            section={section}
            items={items}
          />
        ))}
      </main>
    </>
  );
}

function SectionBlock({ section, items }) {
  // for toggling list items
  const [openIndex, setOpenIndex] = useState(null);
  const toggleIndex = (i) => setOpenIndex(prev => (prev === i ? null : i));

  // only for About Me: track which photo is showing
  const photos = ["/arjun.jpg", "/arjun2.jpg"];
  const [photoIndex, setPhotoIndex] = useState(0);
  const cyclePhoto = () =>
    setPhotoIndex((prev) => (prev + 1) % photos.length);

  return (
    <SectionWrapper
      id={section.toLowerCase().replace(/\s+/g, "-")}
      title={section}
    >
      {section === "About Me" ? (
        <div className="about-me-container">
          <img
            src={photos[photoIndex]}
            alt="Arjun Suri"
            className="about-me-photo"
            style={{ cursor: "pointer" }}
            onClick={cyclePhoto}
          />
          <ul className="about-me-text">
            {items.map((item, idx) => (
              <li key={idx}>{item.title}</li>
            ))}
          </ul>
        </div>
      ) : (
        <ul>
          {items.map((item, idx) => {
            if (typeof item === "string") {
              return <li key={idx}>{item}</li>;
            }
            return (
              <li
                key={idx}
                className="click-expand-item"
                onClick={() => toggleIndex(idx)}
              >
                <div className="item-title">{item.title}</div>
                {openIndex === idx && (
                  <div className="item-description">
                    {item.description}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </SectionWrapper>
  );
}