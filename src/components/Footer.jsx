import { personalInfo } from "../data/content";
import { CodeXml, Linkedin, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div>
            <h3 className="footer-brand">{personalInfo.name}</h3>
            <p className="footer-desc">
              Full Stack Developer passionate about building scalable and
              efficient web applications.
            </p>
          </div>

          <div>
            <h4 className="footer-subtitle">Quick Links</h4>
            <ul className="footer-links">
              {[
                "#about",
                "#experience",
                "#projects",
                "#skills",
                "#achievements",
                "#volunteering",
                "#contact",
              ].map((link) => (
                <li key={link}>
                  <a href={link} className="footer-link">
                    {link.replace("#", "").charAt(0).toUpperCase() +
                      link.replace("#", "").slice(1)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="footer-subtitle">Contact</h4>
            <ul>
              <li>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="footer-contact-item"
                >
                  <Mail size={18} className="footer-contact-icon" />
                  {personalInfo.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${personalInfo.phone}`}
                  className="footer-contact-item"
                >
                  <Phone size={18} className="footer-contact-icon" />
                  {personalInfo.phone}
                </a>
              </li>
              <li>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-contact-item"
                >
                  <Linkedin size={18} className="footer-contact-icon" />
                  linkedin.com/in/theroshanprajapat
                </a>
              </li>
              <li>
                <a
                  href={personalInfo.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-contact-item"
                >
                  <CodeXml size={18} className="footer-contact-icon" />
                  leetcode.com/u/theroshanprajapat
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            © {new Date().getFullYear()} {personalInfo.name}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
