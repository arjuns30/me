"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function AboutPortrait() {
  const [reaction, setReaction] = useState(null);
  const timer = useRef(null);
  useEffect(()=>{
    window.addEventListener("portrait-smile", react);
    window.addEventListener("portrait-f1", showF1);
    return ()=>{
      window.removeEventListener("portrait-smile", react);
      window.removeEventListener("portrait-f1", showF1);
      clearTimeout(timer.current);
    };
  },[]);
  function react() {
    clearTimeout(timer.current);
    setReaction("smile");
    timer.current=setTimeout(()=>setReaction(null),1800);
  }
  function showF1() {
    clearTimeout(timer.current);
    setReaction("f1");
    timer.current=setTimeout(()=>setReaction(null),5000);
  }
  return <button className="about-portrait" onClick={react} aria-label="Make Arjun smile">
    <Image src="/arjun.jpg" alt="Arjun Suri" width={1859} height={2324} sizes="(max-width: 640px) 70vw, 260px" />
    <Image className={`about-reaction ${reaction === "smile" ? "is-laughing" : ""}`} src="/arjun2.jpg" alt="" aria-hidden="true" width={1859} height={2324} sizes="(max-width: 640px) 70vw, 260px" />
    <Image className={`about-reaction ${reaction === "f1" ? "is-laughing" : ""}`} src="/photos/f1.png" alt={reaction === "f1" ? "Arjun beside a Ferrari Formula 1 car" : ""} aria-hidden={reaction !== "f1"} width={1138} height={1518} sizes="(max-width: 640px) 70vw, 260px" />
  </button>;
}
