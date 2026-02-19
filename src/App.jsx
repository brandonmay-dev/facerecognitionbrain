import { useState } from "react";
import Navigation from "./components/Navigation/Navigation.jsx";
import Logo from "./components/Logo/Logo.jsx";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm.jsx";
import Rank from "./components/Rank/Rank.jsx";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition.jsx";
import Signin from "./components/Signin/Signin.jsx";
import Register from "./components/Register/Register.jsx";
import ParticlesBg from "particles-bg";
import "./App.css";

const initialUserState = {
  id: "",
  name: "",
  email: "",
  entries: 0,
  joined: "",
};

const API_URL = import.meta.env.VITE_API_URL;

const waitForRenderedImage = async (timeoutMs = 4000) => {
  const start = Date.now();

  while (Date.now() - start < timeoutMs) {
    const img = document.getElementById("inputimage");

    if (img) {
      if (
        img.complete &&
        img.naturalWidth > 0 &&
        img.width > 0 &&
        img.height > 0
      ) {
        return img;
      }

      await new Promise((resolve) => {
        const onDone = () => resolve();
        img.addEventListener("load", onDone, { once: true });
        img.addEventListener("error", onDone, { once: true });
      });
    } else {
      await new Promise((r) => requestAnimationFrame(r));
    }
  }

  return null;
};

function App() {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [box, setBox] = useState({});
  const [route, setRoute] = useState("signin");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState(initialUserState);

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
    });
  };

  const onRouteChange = (newRoute) => {
    if (newRoute === "signout") {
      setIsSignedIn(false);
      setUser(initialUserState);
      setInput("");
      setImageUrl("");
      setBox({});
      setRoute("signin");
      return;
    }

    if (newRoute === "home") setIsSignedIn(true);
    setRoute(newRoute);
  };

  const onInputChange = (event) => setInput(event.target.value);

  const calculateFaceLocation = (clarifaiData, imgEl) => {
    const region = clarifaiData?.outputs?.[0]?.data?.regions?.[0];
    const boundingBox = region?.region_info?.bounding_box;
    if (!boundingBox || !imgEl) return {};

    const width = Number(imgEl.width);
    const height = Number(imgEl.height);
    if (!width || !height) return {};

    return {
      leftCol: boundingBox.left_col * width,
      topRow: boundingBox.top_row * height,
      rightCol: width - boundingBox.right_col * width,
      bottomRow: height - boundingBox.bottom_row * height,
    };
  };

  const onButtonsubmit = async () => {
    setImageUrl(input);
    setBox({});

    try {
      const clarifaiRes = await fetch(`${API_URL}/imageurl`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
      });

      const clarifaiData = await clarifaiRes.json();

      const imgEl = await waitForRenderedImage();
      const faceBox = calculateFaceLocation(clarifaiData, imgEl);
      setBox(faceBox);

      const hasFace = Boolean(
        clarifaiData?.outputs?.[0]?.data?.regions?.length,
      );

      if (hasFace && user.id) {
        const entriesRes = await fetch(`${API_URL}/image`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: user.id }),
        });

        const entriesCount = await entriesRes.json();
        setUser((prev) => ({ ...prev, entries: entriesCount }));
      }
    } catch (err) {
      console.log("Detect error:", err);
    }
  };

  return (
    <div>
      <ParticlesBg type="cobweb" bg={true} />

      {route === "home" ? (
        <>
          <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
          <Logo />
          <Rank name={user.name} entries={user.entries} />
          <ImageLinkForm
            onInputChange={onInputChange}
            onButtonsubmit={onButtonsubmit}
          />
          <FaceRecognition imageUrl={imageUrl} box={box} />
        </>
      ) : route === "register" ? (
        <Register loadUser={loadUser} onRouteChange={onRouteChange} />
      ) : (
        <Signin loadUser={loadUser} onRouteChange={onRouteChange} />
      )}
    </div>
  );
}

export default App;
