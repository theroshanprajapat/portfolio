import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun } from "lucide-react";
import { personalInfo } from "../data/content";
import { useTheme } from "../context/useTheme";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Education", href: "#education" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Achievements", href: "#achievements" },
  { name: "Volunteering", href: "#volunteering" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target?.id) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-30% 0px -30% 0px",
        threshold: [0.1, 0.25, 0.5, 0.75],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="navbar"
      >
        <div className="navbar-container">
          <a href="#about" className="navbar-brand">
            <span>{personalInfo.name.split(" ")[0]}</span>
          </a>

          <div className="navbar-links">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1);

              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`navbar-link ${isActive ? "active" : ""}`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span>{item.name}</span>
                  {isActive && (
                    <motion.span
                      layoutId="navbar-active-indicator"
                      className="navbar-active-indicator"
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 34,
                      }}
                    />
                  )}
                </a>
              );
            })}
            <button
              onClick={toggleTheme}
              className="navbar-theme-btn"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="navbar-mobile-btn"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="sidebar-overlay"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="sidebar-drawer"
          >
            <div className="sidebar-header">
              <a
                href="#about"
                className="navbar-brand"
                onClick={() => setIsOpen(false)}
              >
                <span>{personalInfo.name.split(" ")[0]}</span>
              </a>
              <button
                onClick={() => setIsOpen(false)}
                className="sidebar-close-btn"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>
            <div className="sidebar-links">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`sidebar-link ${
                    activeSection === item.href.slice(1) ? "active" : ""
                  }`}
                  aria-current={
                    activeSection === item.href.slice(1) ? "page" : undefined
                  }
                >
                  {item.name}
                </a>
              ))}
              <button
                onClick={toggleTheme}
                className=" sidebar-link sidebar-theme-btn"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
