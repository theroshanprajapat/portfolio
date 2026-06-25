import { motion } from "framer-motion";
import { GraduationCap, Calendar, MapPin } from "lucide-react";
import { education } from "../data/content";

const cardVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function Education() {
  return (
    <section id="education" className="section section-dark-light">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Academic Background</span>
          <h2 className="section-title">Education</h2>
          <p className="section-desc">
            Formal engineering education and academic milestones that shaped my
            technical fundamentals and analytical approach.
          </p>
        </div>

        <div className="edu-section">
          <div className="edu-line" />

          <div className="space-y-16">
            {education.map((edu, index) => (
              <div key={edu.id} className="space-y-8">
                <div className="edu-roles">
                  <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: index * 0.2 }}
                    className={`edu-card-wrapper ${
                      index % 2 === 0 ? "" : "reverse"
                    }`}
                  >
                    <div className="edu-dot" />
                    <div className="edu-spacer hidden md:block" />

                    <div className="edu-card">
                      <div className="edu-header">
                        <GraduationCap className="w-6 h-6 text-accent flex-shrink-0" />
                        <h3 className="edu-institution">{edu.institution}</h3>
                      </div>

                      <div className="edu-card-title-row">
                        <h6 className="edu-degree">{edu.degree}</h6>
                        {edu.grade && (
                          <span className="edu-badge">Grade : {edu.grade}</span>
                        )}
                      </div>

                      <div className="edu-meta">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>{edu.period}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin size={14} />
                          <span>{edu.location}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
