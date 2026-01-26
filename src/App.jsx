import React, { Component } from "react";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition.jsx";
import Navigation from "./components/Navigation/Navigation.jsx";
import Logo from "./components/Logo/Logo.jsx";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm.jsx";
import Rank from "./components/Rank/Rank.jsx";
import ParticlesBg from "particles-bg";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      clarifaiBox: null,
    };
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  calculateFaceLocation = (data) => {
    const region =
      data?.outputs?.[0]?.data?.regions?.[0]?.region_info?.bounding_box;

    if (!region) return null;

    const image = document.getElementById("inputimage");
    if (!image) return null;

    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: region.left_col * width,
      topRow: region.top_row * height,
      rightCol: width - region.right_col * width,
      bottomRow: height - region.bottom_row * height,
    };
  };

  displayFaceBox = (box) => {
    this.setState({ clarifaiBox: box });
  };

  onButtonsubmit = () => {
    const PAT = import.meta.env.VITE_CLARIFAI_PAT; // ✅ put in .env
    const USER_ID = "clarifai";
    const APP_ID = "main";
    const MODEL_ID = "face-detection";

    const imageUrl = this.state.input;

    // Show the image immediately, clear old box
    this.setState({ imageUrl, clarifaiBox: null });

    if (!PAT) {
      console.error(
        "Missing Clarifai PAT. Add VITE_CLARIFAI_PAT to your .env file.",
      );
      return;
    }

    fetch(`https://api.clarifai.com/v2/models/${MODEL_ID}/outputs`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Key " + PAT,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_app_id: {
          user_id: USER_ID,
          app_id: APP_ID,
        },
        inputs: [
          {
            data: {
              image: {
                url: imageUrl,
              },
            },
          },
        ],
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const box = this.calculateFaceLocation(data);
        this.displayFaceBox(box);
      })
      .catch((err) => console.log("Clarifai error:", err));
  };

  render() {
    const { imageUrl, clarifaiBox } = this.state;

    return (
      <div>
        <ParticlesBg type="cobweb" bg={true} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonsubmit={this.onButtonsubmit}
        />
        <FaceRecognition imageUrl={imageUrl} clarifaiBox={clarifaiBox} />
      </div>
    );
  }
}

export default App;
