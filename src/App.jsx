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

  const calculateFaceLocation = (clarifaiBox) => {
    if (!clarifaiBox) return null;

    const width = clarifaiBox.right_col - clarifaiBox.left_col;
    const height = clarifaiBox.bottom_row - clarifaiBox.top_row;

    return {
      leftCol: clarifaiBox.left_col,
      topRow: clarifaiBox.top_row,
      rightCol: width,
      bottomRow: height,
    };
  };

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const PAT = import.meta.env.VITE_CLARIFAI_PAT;
  const USER_ID = "clarifai";
  const APP_ID = "main";
  const MODEL_ID = "face-detection";

  const onButtonsubmit = () => {
    setImageUrl(input);
    setClarifaiBox(null);

    fetch(`https://api.clarifai.com/v2/models/${MODEL_ID}/outputs`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Key ${PAT}`,
      },
      body: JSON.stringify({
        user_app_id: { user_id: USER_ID, app_id: APP_ID },
        inputs: [{ data: { image: { url: input } } }],
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Clarifai response:", data);

        const region = data?.outputs?.[0]?.data?.regions?.[0];

        if (!region) {
          console.log("No face detected");
          setClarifaiBox(null);
          return;
        }

        // ✅ store ratios ONLY
        setClarifaiBox(region.region_info.bounding_box);
      })
      .catch((err) => console.log("Clarifai error:", err));
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
