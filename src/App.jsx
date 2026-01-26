import { useState } from "react";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition.jsx";
import Navigation from "./components/Navigation/Navigation.jsx";
import Logo from "./components/Logo/Logo.jsx";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm.jsx";
import Rank from "./components/Rank/Rank.jsx";
import ParticlesBg from "particles-bg";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [clarifaiBox, setClarifaiBox] = useState(null);

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const onButtonsubmit = () => {
    setImageUrl(input);
    setClarifaiBox(null);

    fetch("https://api.clarifai.com/v2/models/${MODEL_ID}/outputs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageUrl: input }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Clarifai response (via proxy):", data);

        const region = data?.outputs?.[0]?.data?.regions?.[0];
        if (!region) {
          console.log("No face detected");
          setClarifaiBox(null);
          return;
        }

        setClarifaiBox(region.region_info.bounding_box); // ratios (0..1)
      })
      .catch((err) => console.log("Proxy error:", err));
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
      <FaceRecognition imageUrl={imageUrl} clarifaiBox={clarifaiBox} />
    </div>
  );
}

export default App;
