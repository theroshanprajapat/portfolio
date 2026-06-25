import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { projects } from "../data/content";

function ProjectCarousel({ images }) {
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    const el = carouselRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  };

  const scroll = (direction) => {
    const el = carouselRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.7;
    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="project-carousel">
      <div
        className="project-carousel-track"
        ref={carouselRef}
        onScroll={updateScrollState}
      >
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Project screenshot ${i + 1}`}
            className="project-carousel-slide"
            draggable={false}
          />
        ))}
      </div>
      {canScrollLeft && (
        <button
          type="button"
          className="carousel-btn carousel-btn-left"
          onClick={() => scroll("left")}
          aria-label="Previous image"
        >
          <ChevronLeft size={20} />
        </button>
      )}
      {canScrollRight && (
        <button
          type="button"
          className="carousel-btn carousel-btn-right"
          onClick={() => scroll("right")}
          aria-label="Next image"
        >
          <ChevronRight size={20} />
        </button>
      )}
    </div>
  );
}

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function Projects() {
  return (
    <section id="projects" className="section section-dark-light">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Portfolio</span>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-desc">
            Selected applications that highlight practical product thinking,
            full-stack implementation, and clean user workflows.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.2 }}
              className="project-card"
            >
              <div className="project-body">
                <ProjectCarousel images={project.images} />
                <div className="project-header">
                  <h3 className="project-title">{project.title}</h3>
                  <div className="project-links">
                    <a
                      href={project.github}
                      className="project-link"
                      target="_blank"
                      aria-label="GitHub"
                    >
                      <Github size={20} />
                    </a>
                    <a
                      href={project.link}
                      className="project-link primary"
                      target="_blank"
                      aria-label="Live Demo"
                    >
                      <ExternalLink size={20} />
                    </a>
                  </div>
                </div>

                <p className="project-desc">{project.description}</p>

                <div className="project-tags">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="project-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
