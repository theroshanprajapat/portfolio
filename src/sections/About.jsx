import { motion } from "framer-motion";
import { ChevronDown, Linkedin, Mail, Phone, Sparkles } from "lucide-react";
import { personalInfo } from "../data/content";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function About() {
  return (
    <section id="about" className="about">
      <div className="about-bg" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="about-content"
      >
        <motion.div variants={itemVariants} className="mb-8">
          {/* <div className="about-avatar">
            {personalInfo.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div> */}
          <img className="about-avatar" src="./roshan_img.jpg"></img>
        </motion.div>

        <motion.div variants={itemVariants} className="about-kicker">
          <Sparkles size={16} />
          Building scalable full-stack web experiences
        </motion.div>

        <motion.h1 variants={itemVariants} className="about-title">
          {personalInfo.name}
        </motion.h1>

        <motion.p variants={itemVariants} className="about-subtitle">
          {personalInfo.title}
        </motion.p>

        <motion.p variants={itemVariants} className="about-education">
          {personalInfo.subtitle}
        </motion.p>

        <motion.p variants={itemVariants} className="about-bio">
          {personalInfo.bio}
        </motion.p>

        <motion.div variants={itemVariants} className="about-buttons">
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            <Linkedin size={18} />
          </a>
          <a href={`mailto:${personalInfo.email}`} className="btn btn-outline">
            <Mail size={18} />
          </a>
          <a
            href={`tel:${personalInfo.phone}`}
            className="btn btn-outline btn-outline-secondary"
          >
            <Phone size={18} />
          </a>
        </motion.div>

        <motion.div variants={itemVariants} className="about-scroll mt-16">
          <a href="#education" className="inline-flex flex-col items-center">
            <span className="about-scroll-text">Scroll Down</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="animate-bounce-slow"
            >
              <ChevronDown size={24} />
            </motion.div>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
