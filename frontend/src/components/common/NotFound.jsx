import { Link } from "react-router-dom";
import Container from "./Container";

function NotFound() {
  return (
    <section className="not-found">
      <Container>
        <div className="not-found-content">
          <span>404</span>

          <h1>Page not found</h1>

          <p>
            The page you are looking for does not exist
            or has been moved.
          </p>

          <Link to="/" className="btn btn-primary">
            Back to Home
          </Link>
        </div>
      </Container>
    </section>
  );
}

export default NotFound;