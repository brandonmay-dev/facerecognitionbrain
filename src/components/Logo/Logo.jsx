import Tilt from "react-parallax-tilt";
import brain from "./brain.png";
import "./Logo.css";

const Logo = () => {
  return (
    <Tilt className="tilt">
      <div className="ma4 mt0 tilt-inner pa3 logo-container">
        <img src={brain} alt="Brain logo" className="logo-image" />
      </div>
    </Tilt>
  );
};

export default Logo;
