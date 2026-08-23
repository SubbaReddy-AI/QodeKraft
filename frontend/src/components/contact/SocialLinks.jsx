import {
  Linkedin,
  Instagram,
  Github
} from "lucide-react";

import Container from "../common/Container";

function SocialLinks() {
  return (
    <section className="social-section">
      <Container>
        <div className="social-links">
          <a href="#" aria-label="LinkedIn">
            <Linkedin size={19} />
          </a>

          <a href="#" aria-label="Instagram">
            <Instagram size={19} />
          </a>

          <a href="#" aria-label="GitHub">
            <Github size={19} />
          </a>
        </div>
      </Container>
    </section>
  );
}

export default SocialLinks;