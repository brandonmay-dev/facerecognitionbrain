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
  const [box, setBox] = useState(null);

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  // Clarifai config (public app while learning)
  const PAT = import.meta.env.VITE_CLARIFAI_PAT; // set in .env
  const USER_ID = "clarifai";
  const APP_ID = "main";
  const MODEL_ID = "face-detection";

  const calculateFaceLocation = (data) => {
    const boundingBox =
      data.outputs[0].data.regions[0].region_info.bounding_box;

    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: boundingBox.left_col * width,
      topRow: boundingBox.top_row * height,
      rightCol: width - boundingBox.right_col * width,
      bottomRow: height - boundingBox.bottom_row * height,
    };
  };

  const onButtonsubmit = () => {
    setImageUrl(input); // show the image immediately
    setBox(null); // clear previous box

    fetch(`https://api.clarifai.com/v2/models/${MODEL_ID}/outputs`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Key ${PAT}`,
      },
      body: JSON.stringify({
        user_app_id: {
          user_id: USER_ID,
          app_id: APP_ID,
        },
        inputs: [
          {
            data: {
              image: { url: input },
            },
          },
        ],
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Clarifai response:", data);

        const faceBox = calculateFaceLocation(data);
        setBox(faceBox);
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
      <FaceRecognition imageUrl={imageUrl} box={box} />
    </div>
  );
}

export default App;
