import { useState } from "react";
import Container from "../common/Container";

function ContactForm() {
  const [submitted, setSubmitted] =
    useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="section contact-form-section">
      <Container>
        <div className="contact-form-layout">
          <div>
            <span className="section-eyebrow">
              Start a conversation
            </span>

            <h2>
              Tell us what you're
              <span className="gradient-text">
                {" "}building.
              </span>
            </h2>

            <p>
              Share your project details and
              we'll get back to you.
            </p>
          </div>

          <form
            className="application-form"
            onSubmit={handleSubmit}
          >
            <input
              placeholder="Your name"
              required
            />

            <input
              type="email"
              placeholder="Your email"
              required
            />

            <input
              placeholder="Company / Organization"
            />

            <select>
              <option value="">
                What do you need?
              </option>

              <option>
                AI & Machine Learning
              </option>

              <option>
                Web Development
              </option>

              <option>
                Data & Analytics
              </option>

              <option>
                Cloud & DevOps
              </option>

              <option>
                Technology Consulting
              </option>
            </select>

            <textarea
              rows="7"
              placeholder="Tell us about your project..."
              required
            />

            <button
              type="submit"
              className="btn btn-primary"
            >
              Send Enquiry
            </button>

            {submitted && (
              <p className="form-success">
                Thank you. Your enquiry has been
                submitted.
              </p>
            )}
          </form>
        </div>
      </Container>
    </section>
  );
}

export default ContactForm;