import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, clarifaiBox }) => {
  return (
    <div className="center">
      <div
        className="mt2"
        style={{ position: "relative", display: "inline-block" }}
      >
        {imageUrl && (
          <>
            <img
              id="inputimage"
              alt=""
              src={imageUrl}
              width="500px"
              height="auto"
            />

            {clarifaiBox && (
              <div
                className="bounding-box"
                style={{
                  top: clarifaiBox.topRow,
                  right: clarifaiBox.rightCol,
                  bottom: clarifaiBox.bottomRow,
                  left: clarifaiBox.leftCol,
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
