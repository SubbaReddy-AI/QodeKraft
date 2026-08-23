import { motion } from "framer-motion";
import {
  Brain,
  HeartHandshake,
  Lightbulb,
  ShieldCheck,
  Users,
  Zap,
} from "lucide-react";

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    text:
      "We continuously explore better ideas, technologies, and approaches.",
  },
  {
    icon: ShieldCheck,
    title: "Integrity",
    text:
      "We believe in honest communication, responsible engineering, and trust.",
  },
  {
    icon: Brain,
    title: "Learning",
    text:
      "We encourage continuous learning and staying ahead of technology.",
  },
  {
    icon: Users,
    title: "Collaboration",
    text:
      "Strong ideas become stronger when people work together.",
  },
  {
    icon: HeartHandshake,
    title: "Customer Focus",
    text:
      "We build around real needs and measurable outcomes.",
  },
  {
    icon: Zap,
    title: "Excellence",
    text:
      "We aim for quality, performance, scalability, and long-term value.",
  },
];

export default function OurValues() {
  return (
    <section className="our-values">
      <div className="container">

        <div className="our-values-heading">
          <span className="section-eyebrow">
            Our Values
          </span>

          <h2>
            Principles behind
            <span> everything we build.</span>
          </h2>

          <p>
            Our values influence how we build,
            collaborate, solve problems, and
            create experiences for our customers
            and community.
          </p>
        </div>

        <div className="values-grid">
          {values.map(
            (value, index) => {
              const Icon = value.icon;

              return (
                <motion.div
                  className="value-card"
                  key={value.title}
                  initial={{
                    opacity: 0,
                    y: 25,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.15,
                  }}
                  transition={{
                    duration: 0.5,
                    delay:
                      index * 0.08,
                  }}
                >
                  <div className="value-icon">
                    <Icon size={24} />
                  </div>

                  <div>
                    <span className="value-number">
                      0{index + 1}
                    </span>

                    <h3>
                      {value.title}
                    </h3>

                    <p>
                      {value.text}
                    </p>
                  </div>
                </motion.div>
              );
            }
          )}
        </div>

      </div>
    </section>
  );
}