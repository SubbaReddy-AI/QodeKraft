import { Link } from "react-router-dom";

function FinalCTA() {
  return (
    <section className="qk-final-cta">

      <div className="qk-cta-glow" />

      <div className="container">

        <div className="qk-final-cta-content">

          <span className="section-eyebrow">
            Let's Create
          </span>

          <h2>
            Have an idea?
            <br />
            Let's build it.
          </h2>

          <p>
            Tell us what you're building and
            let's explore what technology can
            make possible.
          </p>

          <div className="qk-cta-actions">

            <Link
              to="/contact"
              className="btn btn-primary"
            >
              Start a Conversation
              <span>→</span>
            </Link>

            <Link
              to="/verify-certificate"
              className="btn btn-secondary"
            >
              Verify Certificate
            </Link>

          </div>

        </div>

      </div>

    </section>
  );
}

export default FinalCTA;