import Tilt from "react-parallax-tilt";
import brain from "./brain.png";
import "./Logo.css";

const Logo = () => {
  return (
    <Tilt className="tilt">
      <div
        className="ma4 mt0 tilt-inner pa3"
        style={{ paddingTop: "5px", height: 250 }}
      >
        <h1 style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          React Parallax Tilt
          <img src={brain} alt="Brain logo" style={{ height: 40 }} />
        </h1>
      </div>
    </Tilt>
  );
};

export default Logo;
