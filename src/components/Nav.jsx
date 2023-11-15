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
        <div className="auth_links">
          ? (<Link onClick={""}>Sign Out</Link>) : (
          <>
            <Link to="/login" onClick={() => setActiveLink("/login")}>
              Log in
            </Link>
            <Link to="/signup" onClick={() => setActiveLink("/signup")}>
              Sign up
            </Link>
            <Link to="/mapview" onClick={() => setActiveLink("/mapview")}>
              Map View
            </Link>
          </>
          )
        </div>
        <div className="nav_links">
          <Link to="/" onClick={() => setActiveLink("/")}>
            Home
          </Link>
          <ScrollLink
            to="aboutSection"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
          >
            About
          </ScrollLink>
          <ScrollLink
            to="contactSection"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
          >
            Contact
          </ScrollLink>
        </div>
      </div>
    </div>
  );
};

export default Nav;
