import "./Navbar.css";

import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <nav>
        <Link to="/profile">
          <div>Profile</div>
        </Link>
        <Link to="/submitSupport">
          <div>Support</div>
        </Link>

        <Link to="/submitPublications">
          <div>Publication</div>
        </Link>
        <Link to="/submitTLC">
          <div>Teaching and Learning</div>
        </Link>
        <Link to="/submitCertifications">
          <div>Certifications</div>
        </Link>
        <Link to="/submitEvents">
          <div> Events </div>
        </Link>
        <Link to="/submitPatents">
          <div>Patents </div>
        </Link>
        <Link to="/submitResearch">
          <div>Research</div>
        </Link>
      </nav>
    </>
  );
}
