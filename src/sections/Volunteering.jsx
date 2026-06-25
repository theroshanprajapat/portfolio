import { motion } from "framer-motion";
import { Users, Heart, Code2, Calendar } from "lucide-react";
import { volunteering } from "../data/content";

const iconMap = {
  Users,
  Heart,
  Code2,
  Calendar,
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function Volunteering() {
  return (
    <section id="volunteering" className="section section-dark">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Social Impact</span>
          <h2 className="section-title">Positions of Responsibility</h2>
          <p className="section-desc">
            Leadership and community roles focused on education, coordination,
            and meaningful student engagement.
          </p>
        </div>

        <div className="volunteering-grid">
          {volunteering.map((item, index) => {
            const IconComponent = iconMap[item.icon] || Users;
            return (
              <motion.div
                key={item.id}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.15 }}
                className="volunteering-card"
              >
                <div className="volunteering-header">
                  <div className="volunteering-icon-box">
                    <IconComponent />
                  </div>

                  <div className="flex-1">
                    <div className="volunteering-title-row">
                      <h3 className="volunteering-title">{item.title}</h3>
                      <span className="volunteering-period">
                        {item.period}
                      </span>
                    </div>
                    <p className="volunteering-org">{item.organization}</p>
                    <p className="volunteering-desc">
                      {item.description}
                    </p>
                    <div className="volunteering-divider" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
