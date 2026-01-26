import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, box }) => {
  return (
    <div className="center">
      <div className="mt2" style={{ position: "relative" }}>
        {imageUrl && (
          <>
            <img
              id="inputimage"
              alt=""
              src={imageUrl}
              width="500px"
              height="auto"
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
