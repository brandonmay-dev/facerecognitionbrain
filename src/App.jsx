import { useState } from "react";
import Navigation from "./components/Navigation/Navigation.jsx";
import Logo from "./components/Logo/Logo.jsx";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm.jsx";
import Rank from "./components/Rank/Rank.jsx";
import ParticlesBg from "particles-bg";
import "./App.css";

function App() {
  const [input, setInput] = useState("");

  const onInputChange = (event) => {
    setInput(event.target.value);
    console.log(event.target.value);
  };

  const onButtonsubmit = () => {
    console.log("click");
  };

  return (
    <div>
      <ParticlesBg type="cobweb" bg={true} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm
        onInputChange={onInputChange}
        onButtonsubmit={onButtonsubmit}
      />
      {/* <FaceRecognition /> */}
    </div>
  );
}

export default App;
