import { motion } from "framer-motion";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import About from "./sections/About";
import Education from "./sections/Education";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Achievements from "./sections/Achievements";
import Volunteering from "./sections/Volunteering";
import Contact from "./sections/Contact";
import Footer from "./components/Footer";

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

function App() {
  return (
    <ThemeProvider>
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.3 }}
        className="min-h-screen bg-dark text-text-primary"
      >
        <Navbar />
        <main>
          <About />
          <Education />
          <Experience />
          <Projects />
          <Skills />
          <Achievements />
          <Volunteering />
          <Contact />
        </main>
        <Footer />
      </motion.div>
    </ThemeProvider>
  );
}

export default App;
