import { motion } from "framer-motion";
import { Monitor, Server, Database, Cloud, Code2, Wrench } from "lucide-react";
import { skills } from "../data/content";

const categories = [
  { title: "FRONTEND", items: skills.frontend, icon: Monitor, variant: "primary" },
  { title: "BACKEND", items: skills.backend, icon: Server, variant: "secondary" },
  { title: "DATABASES", items: skills.databases, icon: Database, variant: "primary" },
  { title: "CLOUD", items: skills.cloud, icon: Cloud, variant: "secondary" },
  { title: "PROGRAMMING", items: skills.programming, icon: Code2, variant: "primary" },
  { title: "TOOLS", items: skills.tools, icon: Wrench, variant: "secondary" },
];

const skillVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3 },
  },
};

export default function Skills() {
  return (
    <section id="skills" className="section section-dark">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Technical Toolkit</span>
          <h2 className="section-title">Skills & Technologies</h2>
          <p className="section-desc">
            A practical technology stack for building responsive interfaces,
            reliable APIs, databases, deployments, and developer workflows.
          </p>
        </div>

        <div className="skills-grid skills-grid-2">
          {categories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.2 }}
              className="skill-category"
            >
              <div className="skill-category-header">
                <div className={`skill-icon-box ${category.variant}`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="skill-category-title">{category.title}</h3>
              </div>

              <div className="skill-tags">
                {category.items.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    variants={skillVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: catIndex * 0.2 + skillIndex * 0.05 }}
                    className="skill-tag"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="competency-card">
          <div className="competency-inner">
            <div>
              <h3 className="competency-title">Core Competencies</h3>
              <p className="competency-desc">
                Strongest in full-stack JavaScript development, API design,
                database modeling, and shipping maintainable web applications
                with clear user flows.
              </p>
            </div>
            <div className="competency-badges">
              {["Full-Stack Development", "System Design", "Database Architecture", "API Development", "Problem Solving"].map((competency) => (
                <span
                  key={competency}
                  className="competency-badge"
                >
                  {competency}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
