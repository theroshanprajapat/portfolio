import { motion } from "framer-motion";

export default function SectionTitle({ title, subtitle, icon: Icon }) {
  return (
    <div className="section-header">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="section-title inline-flex items-center gap-3"
      >
        {Icon && <Icon className="w-8 h-8 text-primary" />}
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="section-desc"
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        style={{
          height: "0.25rem",
          background: "linear-gradient(to right, #6366f1, #06b6d4)",
          margin: "1rem auto 0",
          borderRadius: "9999px",
          maxWidth: "200px",
        }}
      />
    </div>
  );
}
