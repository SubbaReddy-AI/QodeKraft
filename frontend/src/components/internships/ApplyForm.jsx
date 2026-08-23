import { useState } from "react";
import Container from "../common/Container";

function ApplyForm() {
  const [submitted, setSubmitted] =
    useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="detail-page">
      <Container>
        <div className="application-layout">
          <div>
            <span className="section-eyebrow">
              Internship Application
            </span>

            <h1>
              Start your
              <span className="gradient-text">
                {" "}journey.
              </span>
            </h1>

            <p>
              Complete the application and tell us
              about your interests and technical
              background.
            </p>
          </div>

          <form
            className="application-form"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Full name"
              required
            />

            <input
              type="email"
              placeholder="Email address"
              required
            />

            <input
              type="tel"
              placeholder="Phone number"
            />

            <select required>
              <option value="">
                Select internship
              </option>

              <option>
                AI & Machine Learning
              </option>

              <option>
                Full Stack Development
              </option>

              <option>
                Web Development
              </option>

              <option>
                Generative AI
              </option>

              <option>
                Data Analytics
              </option>

              <option>
                Data Science
              </option>

              <option>
                Cloud Computing and DevOps
              </option>
            </select>

            <textarea
              placeholder="Tell us about yourself"
              rows="6"
            />

            <button
              className="btn btn-primary"
              type="submit"
            >
              Submit Application
            </button>

            {submitted && (
              <p className="form-success">
                Application submitted successfully.
              </p>
            )}
          </form>
        </div>
      </Container>
    </section>
  );
}

export default ApplyForm;