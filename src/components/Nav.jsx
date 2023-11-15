import { useState } from "react";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

const Nav = () => {
  const [activeLink, setActiveLink] = useState("/");

  return (
    <div className="nav_box">
      <div className="logo_container">
        <img className="logo" src="" alt="Incluspot Logo" />
      </div>
      <div className="nav">
        <div className="nav_links">
          <Link to="/" onClick={() => setActiveLink("/")}>
            Home
          </Link>
          <ScrollLink
            className="scroll-link"
            to="aboutSection"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
          >
            About
          </ScrollLink>
          <ScrollLink
            className="scroll-link"
            to="contactSection"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
          >
            Contact
          </ScrollLink>
        </div>
        <div className="auth_links">
          <>
            <Link
              to="/login"
              className="left"
              onClick={() => setActiveLink("/login")}
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="center"
              onClick={() => setActiveLink("/signup")}
            >
              Sign up
            </Link>
            <Link
              to="/mapview"
              className="right"
              onClick={() => setActiveLink("/mapview")}
            >
              Map View
            </Link>
          </>
        </div>
      </div>
    </div>
  );
};

export default Nav;
