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
    console.log(event.target.value);
    this.setState({ input: event.target.value });
  };

  onButtonsubmit = () => {
    const PAT = "Y5e48176b9fd14372bcc5db6dae1b5723";
    const USER_ID = "clarifai";
    const APP_ID = "main";
    const MODEL_ID = "face-detection";

    this.setState({ imageUrl: this.state.input });

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
                url: this.state.input,
              },
            },
          },
        ],
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // next step: calculate face box + setState
      })
      .catch(console.log);
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
