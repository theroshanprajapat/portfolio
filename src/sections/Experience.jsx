import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { experience } from "../data/content";

const cardVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function Experience() {
  return (
    <section id="experience" className="section section-dark">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Work History</span>
          <h2 className="section-title">Professional Experience</h2>
          <p className="section-desc">
            Hands-on engineering experience across product development,
            full-stack delivery, and collaborative software teams.
          </p>
        </div>

        <div className="timeline">
          <div className="timeline-line" />

          <div className="space-y-16">
            {experience.map((exp) => (
              <div key={exp.id} className="space-y-8">
                <div className="timeline-header">
                  <Briefcase className="w-6 h-6 text-primary" />
                  <h3 className="timeline-company">{exp.company}</h3>
                </div>

                <div className="timeline-roles">
                  {exp.roles.map((role, roleIndex) => (
                    <motion.div
                      key={roleIndex}
                      variants={cardVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ delay: roleIndex * 0.2 }}
                      className={`timeline-card-wrapper ${
                        roleIndex % 2 === 0 ? "" : "reverse"
                      }`}
                    >
                      <div className="timeline-dot" />
                      <div className="timeline-spacer hidden md:block" />

                      <div className="timeline-card">
                        <div className="timeline-card-title-row">
                          <h4 className="timeline-card-title">{role.title}</h4>
                          <span className="timeline-badge">
                            {role.duration}
                          </span>
                        </div>

                        <div className="timeline-meta">
                          <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            <span>{role.period}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin size={14} />
                            <span>{role.location}</span>
                          </div>
                        </div>

                        <div className="desc">
                          {role.desc.map((item, idx) => (
                            <div key={idx} className="desc-item">
                              <p className="desc-header">{item.header}</p>
                              <ul className="desc-list">
                                {item.bullets.map((b, i) => (
                                  <li key={i}>{b}</li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>

                        <div className="timeline-divider" />

                        <div className="timeline-tags">
                          {role.techStack.map((tag) => (
                            <span key={tag} className="timeline-tag">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
