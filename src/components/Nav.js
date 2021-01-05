import React, { useEffect, useState } from "react";
import NetflixImage from "../images/netflix-logo.png";
import BlackLogo from "../images/black-logo.png";
import WhiteLogo from "../images/white-logo.png";
import "./nav.css";

function Nav() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
  }, []);

  return (
    <div className={`nav ${show && "nav_black"}`}>
      <img className="netflix_logo" src={NetflixImage} alt="netflixLog" />

      {show ? (
        <img className="music_logo" src={WhiteLogo} alt="musicLog" />
      ) : (
        <img className="music_logo" src={BlackLogo} alt="musicLog" />
      )}
    </div>
  );
}

export default Nav;
