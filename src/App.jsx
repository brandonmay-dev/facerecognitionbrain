import Navigation from "./components/Navigation/Navigation.jsx";
import Logo from "./components/Logo/Logo.jsx";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm.jsx";
import Rank from "./components/Rank/Rank.jsx";
import "./App.css";

function App() {
  return (
    <div>
      <Navigation />
      <Logo />
      <ImageLinkForm />
      <Rank />
      {/* <FaceRecognition /> */}
    </div>
  );
}

export default App;
