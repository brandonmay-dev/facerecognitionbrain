import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, clarifaiBoxes }) => {
  const boxes = Array.isArray(clarifaiBoxes) ? clarifaiBoxes : [];

  return (
    <div className="center">
      <div
        className="mt2"
        style={{ position: "relative", display: "inline-block" }}
      >
        {imageUrl ? (
          <>
            <img
              id="inputimage"
              alt="face detection"
              src={imageUrl}
              style={{
                width: "500px",
                height: "auto",
                display: "block", // ✅ prevents baseline spacing offsets
              }}
            />

            {boxes.map((box, i) => (
              <div
                key={`${i}-${box.leftCol}-${box.topRow}`}
                className="bounding-box"
                style={{
                  position: "absolute", // ✅ ensures overlay
                  top: box.topRow,
                  right: box.rightCol,
                  bottom: box.bottomRow,
                  left: box.leftCol,
                }}
              />
            ))}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default FaceRecognition;
