// @refresh reset
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const photos = [
  { src: "/photos/nyc.png", alt: "New York City skyline at dusk from an apartment window", caption: "The view from my apartment this summer in NYC during my internship" },
  { src: "/photos/storm-king.png", alt: "Lake and forested mountains from Mt. Storm King", caption: "My favorite hike- Mt. Storm King in Seattle with a 2100+ elevation gain in 2.2 miles" },
  { src: "/photos/michigan-football.png", alt: "Michigan Stadium filled with football fans at sunset", caption: "Michigan Football- GO BLUE! 〽️〽️" },
  { src: "/photos/san-diego.png", alt: "Orange sunset over the ocean in San Diego", caption: "I'm born and raised in beautiful San Diego, CA" },
];

export default function PhotoStack() {
  const [front, setFront] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(()=>{
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPaused(reduced.matches);
    const preference = ()=>setPaused(reduced.matches);
    const visibility = ()=>setVisible(!document.hidden);
    visibility();
    reduced.addEventListener("change",preference);
    document.addEventListener("visibilitychange",visibility);
    return ()=>{reduced.removeEventListener("change",preference);document.removeEventListener("visibilitychange",visibility);};
  },[]);

  useEffect(()=>{
    if(paused || hovered || focused || !visible) return;
    const timer = setInterval(()=>setFront(value=>(value+1)%photos.length),30000);
    return ()=>clearInterval(timer);
  },[paused,hovered,focused,visible,front]);

  return <div className="photo-stack-wrap" onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)} onFocus={()=>setFocused(true)} onBlur={event=>{if(!event.currentTarget.contains(event.relatedTarget))setFocused(false);}}>
    <button type="button" className="photo-stack" aria-label="Show next photo" onClick={()=>setFront(value=>(value+1)%photos.length)}>
      <span className="photo-paper" aria-hidden="true" />
      {photos.map((photo,index)=><span key={photo.src} className={`stack-print stack-position-${(index-front+photos.length)%photos.length} ${index===front ? "stack-front" : "stack-back"}`} aria-hidden={index!==front}>
        <Image src={photo.src} alt={photo.alt} width={1138} height={1518} sizes="(max-width: 640px) 200px, 240px" priority={index===0} />
      </span>)}
    </button>
    <div className="photo-stack-hint"><span>{photos[front].caption}</span></div>
  </div>;
}
