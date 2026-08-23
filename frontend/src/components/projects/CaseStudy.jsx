import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function CaseStudy({
  project,
}) {
  if (!project) return null;

  const {
    slug,
    title = "Project Case Study",
    category = "Technology",
    description = "",
    image,
    client,
    challenge,
    solution,
    results = [],
    technologies = [],
    live_url,
  } = project;

  return (
    <section className="case-study">
      <div className="container">

        <Link
          to="/projects"
          className="case-study-back"
        >
          <ArrowLeft size={17} />
          Back to Projects
        </Link>

        <motion.div
          className="case-study-hero"
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
        >
          <div>
            <span className="section-eyebrow">
              {category}
            </span>

            <h1>{title}</h1>

            <p>{description}</p>

            {client && (
              <div className="case-study-client">
                <span>Client</span>
                <strong>{client}</strong>
              </div>
            )}

            {live_url && (
              <a
                href={live_url}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary btn-medium"
              >
                View Live Project
                <ExternalLink size={17} />
              </a>
            )}
          </div>

          <div className="case-study-hero-image">
            {image ? (
              <img
                src={image}
                alt={title}
              />
            ) : (
              <div className="case-study-placeholder">
                <span>QK</span>
              </div>
            )}
          </div>
        </motion.div>

        <div className="case-study-content">

          {challenge && (
            <motion.div
              className="case-study-section"
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
              }}
            >
              <span className="case-study-label">
                01 — The Challenge
              </span>

              <h2>
                Understanding the problem.
              </h2>

              <p>{challenge}</p>
            </motion.div>
          )}

          {solution && (
            <motion.div
              className="case-study-section"
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
              }}
            >
              <span className="case-study-label">
                02 — The Solution
              </span>

              <h2>
                Engineering the right solution.
              </h2>

              <p>{solution}</p>
            </motion.div>
          )}

          {technologies.length > 0 && (
            <motion.div
              className="case-study-section"
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
              }}
            >
              <span className="case-study-label">
                03 — Technology
              </span>

              <h2>
                Built with modern technology.
              </h2>

              <div className="case-study-tech-grid">
                {technologies.map(
                  (technology) => (
                    <div
                      key={technology}
                      className="case-study-tech"
                    >
                      <CheckCircle2 size={17} />
                      {technology}
                    </div>
                  )
                )}
              </div>
            </motion.div>
          )}

          {results.length > 0 && (
            <motion.div
              className="case-study-results"
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
              }}
            >
              <span className="case-study-label">
                04 — Results
              </span>

              <h2>
                Measuring the impact.
              </h2>

              <div className="case-study-results-grid">
                {results.map(
                  (result, index) => (
                    <div
                      className="case-study-result"
                      key={index}
                    >
                      <strong>
                        {result.value}
                      </strong>

                      <span>
                        {result.label}
                      </span>
                    </div>
                  )
                )}
              </div>
            </motion.div>
          )}

        </div>

        <div className="case-study-cta">
          <div>
            <span className="section-eyebrow">
              Have a similar idea?
            </span>

            <h2>
              Let's build something
              <span> meaningful.</span>
            </h2>
          </div>

          <Link
            to="/contact"
            className="btn btn-primary btn-large"
          >
            Start a Conversation
            <ArrowUpRight size={18} />
          </Link>
        </div>

      </div>
    </section>
  );
}