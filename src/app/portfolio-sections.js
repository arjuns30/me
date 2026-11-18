"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import content from "../data/content";

const projects = [
  { image: "/photos/pachira-award.jpg", imageAlt: "Pachira founders holding their first-place award", name: "Pachira", category: "Entrepreneurship", title: "Building a fintech start-up from idea to execution.", role: "Co-Founder & CEO", color: "#146c43", logo: "/logos/pachira.png", intro: "Bridging the gap in the trillion dollar gift card industry by creating the infrastructure to allow any business to start issuing instantly.", details: "I took Pachira from idea to pilot readiness, signing 15+ restaurant partners through door-to-door conversations and building a 1,000+ person beta waitlist. I led 100+ customer interviews, built the product’s front end in React, and managed a banking partnership for card issuance. Along the way, we grew to a team of three and won $10,000+ in national pitch competitions.", date: "2025–2026" },
  { image: "/photos/urb-team.png", imageAlt: "URB Consulting team on a New York rooftop", name: "URB Consulting", category: "On campus", title: "Leading a team to tackle any challenge", role: "Co-Founder", color: "#244acb", intro: "URB Consulting was born out of a vision to bring passionate students with a fire inside them together, to work with companies at the intersection of people and technology", details: "I co-founded URB Consulting at Michigan to bring student teams together around real startup challenges. We established pro-bono consulting for startups, and I managed 50+ analysts. I also managed our client pipeline and built relationships with startup incubator Newlab to connect our teams with new opportunities.", date: "University of Michigan" },
  { name: "Adobe", category: "Enterprise solutions", title: "Learning AI by building GraphRAG", role: "Enterprise Solutions Architect Intern", color: "#c92520", logo: "/logos/adobe.png", intro: "Aside from other project and account work at Adobe, I got to master an information retrieval network for Adobe’s vast product knowledge base.", details: "I built a GraphRAG-powered internal knowledge tool from scratch, bringing together engineering wikis, team knowledge, and public documentation across 30,000+ indexed pages. I engineered PageRank-based link retrieval to surface connections between technical topics.", date: "Summer 2026" },
];

function ProjectVisual({ project }) {
  if (project.image) return <div className={`project-image-space project-photo ${project.name === "Pachira" ? "pachira-photo" : ""}`}><Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 640px) 90vw, 720px" /></div>;
  const nodes = [[200,110],[270,75],[295,155],[370,105],[395,195],[235,225],[160,190],[335,245],[445,125]];
  const edges = [[0,1],[0,2],[0,6],[1,2],[1,3],[2,3],[2,4],[2,5],[3,8],[4,8],[4,7],[5,6],[5,7],[6,2],[7,2]];
  return <div className="project-image-space graph-visual"><svg viewBox="0 0 640 320" role="img" aria-label="Conceptual Graph RAG diagram: a query retrieves connected knowledge to inform an answer">
    <g stroke="#c7ccc4" strokeWidth="1.3">{edges.map(([a,b])=><line key={`${a}-${b}`} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} />)}</g>
    <path className="graph-route" d="M92 160 L200 110 L295 155 L395 195 L548 160" fill="none" stroke="#5e7664" strokeWidth="2" />
    {nodes.map(([x,y],i)=><g key={i}><circle cx={x} cy={y} r={i===2?17:10} fill={i===2?"#4f6956":"#fafbf8"} stroke="#849781" strokeWidth="1.5" />{i===2 && <circle cx={x} cy={y} r="5" fill="#fff" />}</g>)}
    <g fill="#fafbf8" stroke="#bac3b6"><rect x="30" y="141" width="94" height="38" rx="19"/><rect x="502" y="141" width="108" height="38" rx="19"/></g>
    <g fill="#424c40" fontSize="12" textAnchor="middle"><text x="77" y="165">Query</text><text x="556" y="165">Answer</text></g>
    <g fill="#747c70" fontSize="11"><text x="220" y="285">Connected knowledge · Graph RAG</text></g>
  </svg></div>;
}

export function FeaturedWork() {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(null);
  const track = useRef(null);
  const dialog = useRef(null);
  const trigger = useRef(null);
  function closeCard() { dialog.current?.close(); }
  useEffect(()=>{
    if(expanded===null) return;
    const modal = dialog.current;
    modal.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return ()=>{document.body.style.overflow=previous;};
  },[expanded]);
  function select(index) {
    const next = (index + projects.length) % projects.length;
    const card = track.current.children[next];
    track.current.scrollTo({left:card.offsetLeft-track.current.offsetLeft, behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth"});
  }
  function updateActive() {
    const rail = track.current;
    let nearest = 0, distance = Infinity;
    Array.from(rail.children).forEach((card,i)=>{
      const delta = Math.abs(card.offsetLeft-rail.offsetLeft-rail.scrollLeft);
      if(delta<distance){nearest=i;distance=delta;}
    });
    setActive(nearest);
  }
  return <section id="work" className="section showcase" aria-label="Featured work" aria-roledescription="carousel">
    <div className="section-heading"><h2>Featured work</h2></div>
    <div className="featured-rail" ref={track} onScroll={updateActive}>
      {projects.map((project,i)=><article key={project.name} className="portfolio-card" aria-label={`${i+1} of ${projects.length}: ${project.name}`}>
        <button className="portfolio-card-trigger" aria-haspopup="dialog" aria-label={`View ${project.name}`} onClick={event=>{trigger.current=event.currentTarget;setExpanded(i);}}>
          <ProjectVisual project={project} />
          <div className="portfolio-card-copy"><h3>{project.title}</h3><p>{project.intro}</p></div>
        </button>
      </article>)}
    </div>
    <div className="carousel-controls"><div className="carousel-dots" aria-label="Choose a project">{projects.map((project,i)=><button key={project.name} aria-label={`Show ${project.name}`} aria-pressed={active===i} onClick={()=>select(i)} />)}</div><div><button onClick={()=>select(active-1)} aria-label="Previous project">←</button><button onClick={()=>select(active+1)} aria-label="Next project">→</button></div></div>
    <dialog ref={dialog} className="project-dialog" aria-labelledby="project-dialog-title" onClose={()=>{setExpanded(null);trigger.current?.focus({preventScroll:true});}} onClick={event=>{if(event.target===event.currentTarget)closeCard();}}>
      {expanded!==null && <article className="floating-project"><button className="dialog-close" onClick={closeCard} aria-label="Close project">×</button><ProjectVisual project={projects[expanded]} /><div className="floating-copy"><h2 id="project-dialog-title">{projects[expanded].title}</h2><p>{projects[expanded].intro}</p><p>{projects[expanded].details}</p></div></article>}
    </dialog>
  </section>;
}

export function PageMotion() {
  useEffect(()=>{
    if(window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(entries=>{
      entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("section-arrived");observer.unobserve(entry.target);}});
    },{threshold:.08});
    const elements = document.querySelectorAll(".about, .community, .interests, .extras");
    elements.forEach(element=>{element.classList.add("section-arrival");observer.observe(element);});
    return ()=>{observer.disconnect();elements.forEach(element=>element.classList.remove("section-arrival"));};
  },[]);
  return null;
}

const colors = ["#c92520", "#146c43", "#6435b5", "#12608d", "#244acb", "#93601b", "#6b3b87", "#176852"];
export function Experience() {
  const [active, setActive] = useState(0);
  const rows = useRef([]);
  useEffect(() => {
    let frame;
    function update() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const target = window.innerHeight * .48;
        let closest = 0, distance = Infinity;
        rows.current.forEach((row,i) => {
          if (!row) return;
          const bounds = row.getBoundingClientRect();
          const delta = Math.abs(bounds.top + bounds.height / 2 - target);
          if (delta < distance) { closest = i; distance = delta; }
        });
        setActive(closest);
      });
    }
    update();
    window.addEventListener("scroll",update,{passive:true});
    window.addEventListener("resize",update);
    return () => {cancelAnimationFrame(frame);window.removeEventListener("scroll",update);window.removeEventListener("resize",update);};
  }, []);
  const job = content.work[active];
  return <section className="section experience-scroll" aria-labelledby="experience-title">
    <div className="section-heading"><h2 id="experience-title">Where I’ve been and what I’ve done</h2></div>
    <div className="experience-layout">
      <div className="experience-sticky" style={{backgroundColor:colors[active]}}>
        <span className="experience-counter">0{active+1} / 0{content.work.length}</span>
        <div key={job.org} className="sticky-company"><Image src={job.logo} alt="" width={50} height={50} sizes="50px" /><h3>{job.org}</h3><p>{job.role}</p>{job.details && <p className="experience-description">{job.details}</p>}</div>
        <div className="sticky-meta"><span>{job.dates}</span><span>{job.note}</span></div>
      </div>
      <ol className="experience-timeline">{content.work.map((item,i)=><li ref={node=>{rows.current[i]=node;}} key={item.org} className={active===i ? "current" : ""}>
        <button onClick={()=>rows.current[i]?.scrollIntoView({block:"center",behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth"})} aria-current={active===i ? "step" : undefined}><span className="timeline-date">{item.dates}</span><h3>{item.org}</h3><p>{item.role}</p>{item.note && <span className="timeline-location">{item.note}</span>}</button>
      </li>)}</ol>
    </div>
  </section>;
}
