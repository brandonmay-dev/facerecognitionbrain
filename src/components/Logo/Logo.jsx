import Tilt from "react-parallax-tilt";
import brain from "./brain.png";
import "./Logo.css";

const Logo = () => {
  return (
    <Tilt className="tilt">
      <div className="ma4 mt0 tilt-inner pa3 logo-container">
        <h1 className="logo-title">
          React Parallax Tilt
          <img src={brain} alt="Brain logo" className="logo-image" />
        </h1>
      </div>
    </Tilt>
  );
};

export default Logo;
