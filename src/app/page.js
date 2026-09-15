import content from "../data/content";

export default function Home() {
  const {
    name,
    tagline,
    nav,
    about,
    work,
    projects,
    awards,
    certifications,
    campus,
  } = content;

  return (
    <>
      <header className="nav">
        <div className="nav-inner">
          <a href="#top" className="wordmark">
            {name}
          </a>
          <nav>
            <ul className="nav-links">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
              <li>
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                  Resume
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero" id="top">
          <h1>{name}</h1>
          <p className="hero-sub">{tagline}</p>
          <div className="hero-ctas">
            <a className="cta" href="#about">
              Learn more
            </a>
            <a
              className="cta"
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              View resume
            </a>
          </div>
        </section>

        <section className="band" id="about">
          <div className="tile about">
            <img src={about.photo} alt={name} className="about-photo" />
            <div>
              <h2>About</h2>
              {about.lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
              <h3>Certifications</h3>
              <p className="certs">{certifications.join(" · ")}</p>
            </div>
          </div>
        </section>

        <section className="band" id="work">
          <div className="tile">
            <h2>Work</h2>
            <ul className="rows">
              {work.map((job) => (
                <li key={`${job.role}-${job.org}`} className="work-row">
                  <img src={job.logo} alt="" className="work-logo" />
                  <div className="work-copy">
                    <div className="row-title">{job.role}</div>
                    <div className="row-sub">
                      {[job.org, job.note].filter(Boolean).join(" · ")}
                    </div>
                  </div>
                  <div className="row-meta">{job.dates}</div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="band" id="projects">
          <div className="tile">
            <h2>Projects</h2>
            <ul className="rows">
              {projects.map((project) => (
                <li key={project.title}>
                  <div>
                    <div className="row-title">{project.title}</div>
                    <div className="row-sub">{project.detail}</div>
                    {project.description ? (
                      <p className="row-desc">{project.description}</p>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="band split">
          <div className="tile" id="awards">
            <h2>Awards</h2>
            <ul className="plain">
              {awards.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="tile" id="campus">
            <h2>Campus</h2>
            <ul className="plain">
              {campus.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>
          Copyright © {new Date().getFullYear()} {name}. All rights reserved.
        </p>
      </footer>
    </>
  );
}
