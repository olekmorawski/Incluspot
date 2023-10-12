import { useState } from "react";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

const Nav = () => {
  const [activeLink, setActiveLink] = useState("/");

  return (
    <div className="nav_box">
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
          </>
          )
        </div>
        <div className="nav_links">
          <Link
            to="/mapview"
            onClick={() => setActiveLink("/mapview")}
            className={activeLink === "/mapview" ? "active" : ""}
          >
            Map View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Nav;
