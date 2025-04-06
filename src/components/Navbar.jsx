// components/Navbar.jsx
"use client"
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const sections = [
    "About Me",
    "Accolades and Awards",
    "Work Experience",
    "Certifications",
    "Research",
  ];

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        <a href="#hero" className="logo">AS</a>
        <ul className="nav-links">
          {sections.map((section) => (
            <li key={section}>
              <a href={`#${section.toLowerCase().replace(/\s+/g, "-")}`}>
                {section}
              </a>
            </li>
          ))}
          <li>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="resume-link"
            >
              Resume <span className="external-arrow">↗</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;