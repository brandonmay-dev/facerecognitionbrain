import { useState } from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, clarifaiBox }) => {
  const [box, setBox] = useState(null);

  const onImageLoad = (e) => {
    if (!clarifaiBox) {
      setBox(null);
      return;
    }

    const width = e.target.width;
    const height = e.target.height;

    setBox({
      leftCol: clarifaiBox.left_col * width,
      topRow: clarifaiBox.top_row * height,
      rightCol: width - clarifaiBox.right_col * width,
      bottomRow: height - clarifaiBox.bottom_row * height,
    });
  };

  return (
    <div className="center">
      <div
        style={{ position: "relative", display: "inline-block" }}
        className="mt2"
      >
        {imageUrl && (
          <>
            <img
              alt=""
              src={imageUrl}
              width="500px"
              height="auto"
              onLoad={onImageLoad}
            />
            {box && (
              <div
                className="bounding-box"
                style={{
                  top: box.topRow,
                  right: box.rightCol,
                  bottom: box.bottomRow,
                  left: box.leftCol,
                }}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FaceRecognition;
