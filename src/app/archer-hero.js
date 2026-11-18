"use client";

import { useEffect, useRef } from "react";

export default function ArcherHero() {
  const scene = useRef(null);
  const bow = useRef(null);
  const string = useRef(null);
  const arrow = useRef(null);
  const progress = useRef(null);
  const anchor = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const clamp = value => Math.min(1, Math.max(0, value));
    function paint() {
      const root = scene.current;
      if (!root) return;
      const rect = root.getBoundingClientRect();
      const travel = Math.max(1, root.offsetHeight - window.innerHeight * .85);
      const phase = clamp(-rect.top / travel);
      const drawn = clamp(phase / .6);
      const shot = clamp((phase - .55) / .35);
      const eased = shot;
      const fade = clamp((phase - .82) / .18);
      const total = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const page = clamp(window.scrollY / total);
      if (reduced.matches) {
        bow.current.style.opacity = "1";
        string.current.setAttribute("d", "M 170 35 L 170 150 L 170 265");
        arrow.current.style.opacity = "0";
        progress.current.style.opacity = "0";
        return;
      }
      const pull = 70 * drawn * (1 - eased);
      string.current.setAttribute("d", `M 170 35 L ${170-pull} 150 L 170 265`);
      bow.current.style.opacity = String(1 - fade);
      const position = anchor.current.getBoundingClientRect();
      const scale = position.width / 300;
      // Rotate around the same SVG center used by the bow artwork.
      const tilt = -25 * Math.PI / 180;
      const localX = 20 - pull;
      const startX = position.left + (150 + localX * Math.cos(tilt)) * scale;
      const startY = position.top + (150 + localX * Math.sin(tilt)) * scale;
      const edge = window.innerWidth <= 480 ? 10 : 17;
      const endX = window.innerWidth - edge;
      const endY = Math.max(startY + 110, window.innerHeight * .78);
      const distance = Math.max(40, endX - startX);
      const controlX = startX + distance * .65;
      const controlY = startY - distance * .65 * Math.tan(25 * Math.PI / 180);
      const t = eased, inverse = 1 - t;
      const x = inverse * inverse * startX + 2 * inverse * t * controlX + t * t * endX;
      const y = inverse * inverse * startY + 2 * inverse * t * controlY + t * t * endY;
      const dx = 2 * inverse * (controlX - startX) + 2 * t * (endX - controlX);
      const dy = 2 * inverse * (controlY - startY) + 2 * t * (endY - controlY);
      const angle = Math.atan2(dy, dx) * 180 / Math.PI;
      const morph = clamp((shot - .8) / .2);
      arrow.current.style.transform = `translate3d(${x}px,${y}px,0) rotate(${angle}deg)`;
      arrow.current.style.width = `${100 * scale * (1 - morph) + 12 * morph}px`;
      arrow.current.style.opacity = String(1 - morph);
      progress.current.style.opacity = String(morph);
      progress.current.style.setProperty("--reading-progress", String(page));
    }
    function update() {cancelAnimationFrame(frame);frame=requestAnimationFrame(paint);}
    update();
    window.addEventListener("scroll",update,{passive:true});
    window.addEventListener("resize",update);
    reduced.addEventListener("change",update);
    const observer = new ResizeObserver(update);
    observer.observe(document.body);
    return ()=>{cancelAnimationFrame(frame);window.removeEventListener("scroll",update);window.removeEventListener("resize",update);reduced.removeEventListener("change",update);observer.disconnect();};
  }, []);

  return <>
    <section ref={scene} className="archer-scene" aria-labelledby="intro-title">
      <div className="archer-sticky">
        <div className="hero hero-copy"><h1 id="intro-title">Hi, I’m Arjun.<br />An engineering student<br />with a founder’s curiosity.</h1><p className="hero-description">Studying Industrial and Operations Engineering.<br className="desktop-break" /> Building things, asking questions, and figuring it out along the way.</p></div>
        <div className="bow-art" ref={anchor} role="img" aria-label="A bow and arrow, a personal reference to Arjuna. As you scroll, the arrow becomes a page progress indicator.">
          <svg ref={bow} viewBox="0 0 300 300" fill="none" aria-hidden="true">
            <path d="M170 35 C185 65 227 85 227 150 C227 215 185 235 170 265" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <path d="M170 35 C179 70 215 93 215 150 C215 207 179 230 170 265" stroke="currentColor" strokeWidth=".7" opacity=".45" />
            <path ref={string} d="M170 35 L170 150 L170 265" stroke="currentColor" strokeWidth="1" opacity=".6" />
            <path d="M221 138 L231 138 M221 144 L232 144 M221 150 L232 150 M221 156 L232 156 M221 162 L231 162" stroke="currentColor" strokeWidth="2" />
            <path className="still-arrow" d="M100 150 H250 M240 144 L250 150 L240 156 M110 150 L101 144 M116 150 L107 144" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
    </section>
    <svg ref={arrow} className="flying-arrow" viewBox="0 0 150 16" fill="none" aria-hidden="true"><path d="M1 8 H147 M137 2 L147 8 L137 14 M12 8 L3 2 M18 8 L9 2 M12 8 L3 14 M18 8 L9 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
    <div ref={progress} className="arrow-progress" aria-hidden="true"><div className="arrow-progress-fill" /></div>
  </>;
}
