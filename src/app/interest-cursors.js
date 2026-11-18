"use client";

export default function InterestCursors() {
  return <p>Outside of class, you’ll find me following <button className="interest-word" onClick={()=>window.dispatchEvent(new CustomEvent("portrait-f1"))}>F1</button>, hiking, playing card/board games (Social Deduction Games, Poker, Cambio), derivative trading, or watching <button className="secret-interest" onClick={()=>window.dispatchEvent(new CustomEvent("portrait-smile"))}>stand-up comedy</button>.</p>;
}
