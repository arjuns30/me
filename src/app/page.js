import AboutPortrait from "./about-portrait";
import InterestCursors from "./interest-cursors";
import PhotoStack from "./photo-stack";
import { FeaturedWork, Experience, PageMotion } from "./portfolio-sections";
import content from "../data/content";

export default function Home() {
  return (
    <main id="top" className="page">
      <PageMotion />
      <a className="skip" href="#work">Skip to work</a>
      <header className="navigation">
        <a className="identity" href="#top">Arjun Suri</a>
        <nav aria-label="Main navigation"><a href="#work">Work</a><a href="#about">About</a><a href="/resume.pdf">Resume ↗</a></nav>
      </header>
      <section className="hero hero-with-photos" aria-labelledby="intro-title">
        <div className="hero-words">
        <h1 id="intro-title">Hi I’m Arjun.<br />An engineer, optimizer<br />and people person.</h1>
        <p className="hero-description">Studying Industrial and Operations Engineering at the University of Michigan. Building solutions at the intersection of people and technology.</p>
        </div>
        <PhotoStack />
      </section>
      <FeaturedWork />
      <section className="section about" id="about"><div className="about-copy"><h2>A little about me</h2><p>I’ve worked across enterprise software, supply chain, and data analytics, and learned a lot by starting something of my own. I work best when I’m learning by doing, working with others, or have a whiteboard to brain dump.</p><InterestCursors /></div><figure><AboutPortrait /></figure></section>
      <Experience />

      <section className="section extras"><div className="section-heading"><h2>On campus & beyond</h2></div><div className="extras-grid"><div><h3>Campus</h3>{content.campus.map(item=><p key={item}>{item}</p>)}</div><div><h3>Awards</h3>{content.awards.map(item=><p key={item}>{item}</p>)}<h3>Certifications</h3><p>{content.certifications.join(" · ")}</p></div></div></section>
      <section className="section community"><div className="section-heading"><h2>Beyond work</h2></div><div className="community-grid">
        <article><h3>Scholastic<br />Kid Reporter</h3><p>Writing & reporting</p></article>
        <article><h3>Volunteer<br />of the Year</h3><p>San Diego County</p></article>
        <article><h3>San Diego House<br />Rabbit Society</h3><p>Community & animal welfare</p></article>
      </div></section>
      <footer id="contact"><p>Always happy to meet good people.</p><a className="email" href="mailto:arsuri@umich.edu">Say hello ↗</a><div className="footer-bottom"><span>Arjun Suri</span><div>{content.links.filter(link=>link.label!=="arsuri@umich.edu").map(link=><a key={link.label} href={link.href}>{link.label} ↗</a>)}</div></div></footer>
    </main>
  );
}
