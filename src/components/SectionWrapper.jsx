"use client";
import React, { useRef, useEffect, useState } from "react";

export default function SectionWrapper({ id, title, children }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id={id}
      className={`section-wrapper ${isVisible ? "visible" : "hidden"}`}
    >
      <h2>{title}</h2>
      <div className="section-content">{children}</div>
    </section>
  );
}