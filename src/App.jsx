import React, { Component } from "react";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition.jsx";
import Navigation from "./components/Navigation/Navigation.jsx";
import Signin from "./components/Signin/Signin.jsx";
import Register from "./components/Register/Register.jsx";
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
      route: "signin",
      isSignedIn: false,
    };
  }

  componentDidMount() {
    fetch("http://localhost:3001/")
      .then((response) => response.json())
      .then((data) => console.log("Server response:", data))
      .catch((err) => console.log("Server error:", err));
  }

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState({
        isSignedIn: false,
        route: "signin",
        imageUrl: "",
        clarifaiBoxes: [],
        input: "",
      });
      return;
    }

    if (route === "home") this.setState({ isSignedIn: true });
    else this.setState({ isSignedIn: false });

    this.setState({ route });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  calculateFaceLocations = (data) => {
    const regions = data?.outputs?.[0]?.data?.regions || [];
    if (!regions.length) return [];

    const image = document.getElementById("inputimage");
    if (!image) return [];

    const { width, height } = image.getBoundingClientRect();

    return regions
      .map((r) => r?.region_info?.bounding_box)
      .filter(Boolean)
      .map((b) => {
        const leftCol = b.left_col * width;
        const topRow = b.top_row * height;
        const rightCol = width - b.right_col * width;
        const bottomRow = height - b.bottom_row * height;

        return { leftCol, topRow, rightCol, bottomRow };
      });
  };

  displayFaceBoxes = (boxes) => {
    this.setState({ clarifaiBoxes: boxes });
  };

  onButtonsubmit = () => {
    const imageUrl = this.state.input;

    // show image immediately, clear old boxes
    this.setState({ imageUrl, clarifaiBoxes: [] });

    // ✅ call YOUR backend (no CORS)
    fetch("http://localhost:3001/imageurl", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input: imageUrl }),
    })
      .then((res) => res.json())
      .then((data) => {
        const boxes = this.calculateFaceLocations(data);
        this.displayFaceBoxes(boxes);
      })
      .catch((err) => console.log("API error:", err));
  };

  render() {
    const { isSignedIn, imageUrl, clarifaiBoxes, route } = this.state;

    return (
      <div>
        <ParticlesBg type="cobweb" bg={true} />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />

        {route === "home" ? (
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
        ) : route === "signin" ? (
          <Signin onRouteChange={this.onRouteChange} />
        ) : (
          <Register onRouteChange={this.onRouteChange} />
        )}
      </div>
    );
  }
}

export default App;
