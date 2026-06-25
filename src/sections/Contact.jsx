import { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Loader2,
  CheckCircle,
  Mail,
  Phone,
  Linkedin,
  AlertCircle,
  XCircle,
  CodeXml,
} from "lucide-react";
import { personalInfo } from "../data/content";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitFailed, setSubmitFailed] = useState(false);

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Name is required";
        if (value.trim().length < 2)
          return "Name must be at least 2 characters";
        return "";
      case "email":
        if (!value.trim()) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Please enter a valid email";
        return "";
      case "subject":
        if (!value.trim()) return "Subject is required";
        if (value.trim().length < 3)
          return "Subject must be at least 3 characters";
        return "";
      case "message":
        if (!value.trim()) return "Message is required";
        if (value.trim().length < 10)
          return "Message must be at least 10 characters";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    if (submitFailed) setSubmitFailed(false);
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      newErrors[key] = validateField(key, formData[key]);
    });
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const resetSubmitStatus = () => {
    setIsSubmitted(false);
    setSubmitFailed(false);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_id",
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_id",
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: personalInfo.email,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "public_key",
      );

      setIsSubmitting(false);
      setIsSubmitted(true);
      setSubmitFailed(false);
      setErrors({});
    } catch (error) {
      setIsSubmitting(false);
      setSubmitFailed(true);
      console.error("Email send failed:", error);
    }
  };

  return (
    <section id="contact" className="section section-dark-light">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Get In Touch</span>
          <h2 className="section-title">Let's Build Something Useful</h2>
          <p className="section-desc">
            Open to software engineering roles, product collaborations, and
            thoughtful technical conversations.
          </p>
        </div>

        <div className="contact-grid">
          <motion.div
            className="contact-left"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="contact-info-title">Start a Conversation</h3>
            <p className="contact-info-desc">
              Share a role, project, or technical problem you are working on. I
              usually respond with context, next steps, or a few useful
              questions.
            </p>

            <div className="space-y-6">
              <a href={`mailto:${personalInfo.email}`} className="contact-card">
                <div className="contact-icon-box primary">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="contact-label">Email</p>
                  <p className="contact-value">{personalInfo.email}</p>
                </div>
              </a>

              <a href={`tel:${personalInfo.phone}`} className="contact-card">
                <div className="contact-icon-box primary">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="contact-label">Phone</p>
                  <p className="contact-value">{personalInfo.phone}</p>
                </div>
              </a>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card"
              >
                <div className="contact-icon-box primary">
                  <Linkedin size={20} />
                </div>
                <div>
                  <p className="contact-label">LinkedIn</p>
                  <p className="contact-value">
                    linkedin.com/in/theroshanprajapat
                  </p>
                </div>
              </a>

              <a
                href={personalInfo.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card"
              >
                <div className="contact-icon-box primary">
                  <CodeXml size={20} />
                </div>
                <div>
                  <p className="contact-label">Leetcode</p>
                  <p className="contact-value">
                    leetcode.com/u/theroshanprajapat
                  </p>
                </div>
              </a>
            </div>
          </motion.div>

          <motion.div
            className="contact-right"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <form onSubmit={handleSubmit} className="contact-form">
              {isSubmitted ? (
                <div className="success-view">
                  <div className="success-icon-box">
                    <CheckCircle size={64} className="success-icon" />
                  </div>
                  <h3 className="success-title">Message Sent Successfully!</h3>
                  <p className="success-desc">
                    Thank you for reaching out,{" "}
                    <strong>{formData.name || "User"}</strong>. I have received
                    your email and will get back to you as soon as possible.
                  </p>
                  <button
                    type="button"
                    onClick={resetSubmitStatus}
                    className="send-another-btn"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <div className="form-row form-row-2">
                    <div className="form-group">
                      <label htmlFor="name" className="form-label">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`form-input ${errors.name ? "input-error" : ""}`}
                        placeholder="Your full name"
                      />
                      {errors.name && (
                        <p className="form-error">
                          <AlertCircle size={14} />
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="email" className="form-label">
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`form-input ${errors.email ? "input-error" : ""}`}
                        placeholder="you@example.com"
                      />
                      {errors.email && (
                        <p className="form-error">
                          <AlertCircle size={14} />
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject" className="form-label">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`form-input ${errors.subject ? "input-error" : ""}`}
                      placeholder="Role opportunity, project, or collaboration"
                    />
                    {errors.subject && (
                      <p className="form-error">
                        <AlertCircle size={14} />
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="message" className="form-label">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      style={{ resize: "vertical" }}
                      onChange={handleChange}
                      className={`form-input ${errors.message ? "input-error" : ""}`}
                      rows={6}
                      placeholder="Tell me what you are building or hiring for..."
                    />
                    {errors.message && (
                      <p className="form-error">
                        <AlertCircle size={14} />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`submit-btn ${
                      submitFailed
                        ? "error"
                        : isSubmitting
                          ? "loading"
                          : "primary"
                    }`}
                  >
                    {submitFailed ? (
                      <>
                        <XCircle size={20} />
                        Failed to send. Please try again.
                      </>
                    ) : isSubmitting ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
