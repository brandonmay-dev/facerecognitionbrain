import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, clarifaiBoxes }) => {
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
            {Array.isArray(clarifaiBoxes) &&
              clarifaiBoxes.map((box, i) => (
                <div
                  key={i}
                  className="bounding-box"
                  style={{
                    top: box.topRow,
                    right: box.rightCol,
                    bottom: box.bottomRow,
                    left: box.leftCol,
                  }}
                />
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default FaceRecognition;
