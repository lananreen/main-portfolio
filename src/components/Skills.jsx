import "./Skills.css";

const CATEGORIES = [
  {
    id: "frontend",
    title: "Frontend & Frameworks",
    skills: ["JavaScript", "TypeScript", "React", "HTML", "CSS", "Tailwind CSS", "Vite", "REST API"],
  },
  {
    id: "backend",
    title: "Backend",
    skills: ["Python", "Java", "PHP", "Laravel"],
  },
  {
    id: "ai",
    title: "Artificial Intelligence",
    skills: ["OpenCode", "Claude Code", "Gemini", "ChatGPT"],
  },
  {
    id: "tools",
    title: "Tools & Technologies",
    skills: ["Firebase", "Git", "Figma", "BitBucket", "GitHub"],
  },
  {
    id: "monitoring",
    title: "Task Monitoring",
    skills: ["Linear", "Trello"],
  },
  {
    id: "graphics",
    title: "Visual Graphics",
    skills: ["Adobe After Effects", "CapCut", "Wondershare Filmora", "Cavalry", "Canva"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="tech-stack" aria-labelledby="tech-stack-heading">
      <div className="tech-stack__intro" data-reveal="zoom">
        <h2 id="tech-stack-heading" className="tech-stack__heading">Tech Stack</h2>
        <p className="tech-stack__description">
          The tools, frameworks, and platforms I use to build efficiently and creatively
        </p>
      </div>
      <div className="tech-stack__folder" data-reveal="slide">
        <div className="tech-stack__categories">
          {[0, 2, 4].map((start) => (
            <div key={start} className="tech-stack__column">
              {CATEGORIES.slice(start, start + 2).map(({ id, title, skills }, row) => (
                <div key={id} className={`tech-stack__category tech-stack__category--${id}`} data-reveal="zoom" style={{ "--reveal-delay": `${180 + (row * 3 + start / 2) * 140}ms` }}>
                  <div className="tech-stack__card-heading">
                    <h3 id={`tech-stack-${id}`} className="tech-stack__title">{title}</h3>
                    <span className="tech-stack__count" aria-hidden="true">{skills.length}</span>
                  </div>
                  <ul className="tech-stack__skills" aria-labelledby={`tech-stack-${id}`}>
                    {skills.map((skill) => (
                      <li key={skill} className="tech-stack__skill">{skill}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
