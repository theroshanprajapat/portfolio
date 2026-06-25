import { motion } from "framer-motion";
import { Trophy, Award, Star } from "lucide-react";
import { achievements } from "../data/content";

const iconMap = {
  Star,
  Trophy,
  Award,
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function Achievements() {
  return (
    <section id="achievements" className="section section-dark-light">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Recognition</span>
          <h2 className="section-title">Achievements</h2>
          <p className="section-desc">
            Competitive programming and academic milestones built through
            consistent effort, focus, and problem-solving discipline.
          </p>
        </div>

        <div className="achievements-grid">
          {achievements.map((achievement, index) => {
            const IconComponent = iconMap[achievement.icon] || Trophy;
            return (
              <motion.div
                key={achievement.id}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.2 }}
                className="achievement-card"
              >
                <div className="achievement-icon-wrapper">
                  <div className="achievement-icon-glow" />
                  <div className="achievement-icon">
                    <IconComponent />
                  </div>
                </div>

                <h3 className="achievement-title">{achievement.title}</h3>
                <p className="achievement-org">{achievement.organization}</p>
                <p className="achievement-desc">{achievement.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
