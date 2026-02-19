import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, box }) => {
  return (
    <div className="face-wrap">
      {imageUrl ? (
        <div className="image-container">
          <img id="inputimage" alt="" src={imageUrl} />
          {box?.leftCol !== undefined && (
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
        </div>
      ) : null}
    </div>
  );
};

export default FaceRecognition;
