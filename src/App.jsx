import React, { Component } from "react";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition.jsx";
import Navigation from "./components/Navigation/Navigation.jsx";
import Signin from "./components/Signin/Signin.jsx";
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
      clarifaiBoxes: [],
      route: "signin", // "signin" | "home"
    };
  }

  onRouteChange = (route) => {
    this.setState({ route: route });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  calculateFaceLocations = (data) => {
    const regions = data?.outputs?.[0]?.data?.regions || [];
    if (!regions.length) return [];

    const image = document.getElementById("inputimage");
    if (!image) return [];

    // Use rendered size (fixes offsets when image is scaled)
    const { width, height } = image.getBoundingClientRect();
    const yOffset = height * 0.03; // tweak 0.02–0.04 if needed

    return regions
      .map((r) => r?.region_info?.bounding_box)
      .filter(Boolean)
      .map((b) => {
        const leftCol = b.left_col * width;
        const topRow = b.top_row * height;
        const rightCol = width - b.right_col * width;
        const bottomRow = height - b.bottom_row * height;

        return {
          leftCol,
          topRow: Math.max(topRow - yOffset, 0),
          rightCol,
          bottomRow,
        };
      });
  };

  displayFaceBoxes = (boxes) => {
    this.setState({ clarifaiBoxes: boxes });
  };

  onButtonsubmit = () => {
    const PAT = import.meta.env.VITE_CLARIFAI_PAT;
    const USER_ID = "clarifai";
    const APP_ID = "main";
    const MODEL_ID = "face-detection";

    const imageUrl = this.state.input;

    // Show image immediately + clear old boxes
    this.setState({ imageUrl, clarifaiBoxes: [] });

    if (!PAT) {
      console.error(
        "Missing Clarifai PAT. Add VITE_CLARIFAI_PAT to your .env.",
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
        user_app_id: { user_id: USER_ID, app_id: APP_ID },
        inputs: [{ data: { image: { url: imageUrl } } }],
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const boxes = this.calculateFaceLocations(data);
        this.displayFaceBoxes(boxes);
      })
      .catch((err) => console.log("Clarifai error:", err));
  };

  render() {
    const { imageUrl, clarifaiBoxes, route } = this.state;

    return (
      <div>
        <ParticlesBg type="cobweb" bg={true} />
        <Navigation onRouteChange={this.onRouteChange} />

        {route === "signin" ? (
          <Signin onRouteChange={this.onRouteChange} />
        ) : (
          <>
            <Logo />
            <Rank />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonsubmit={this.onButtonsubmit}
            />
            <FaceRecognition
              imageUrl={imageUrl}
              clarifaiBoxes={clarifaiBoxes}
            />
          </>
        )}
      </div>
    );
  }
}

export default App;
