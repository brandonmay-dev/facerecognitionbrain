const FaceRecognition = ({ imageUrl }) => {
  return (
    <div className="center ma">
      {imageUrl ? (
        <img
          id="inputimage"
          alt="detected"
          src={imageUrl}
          style={{ width: "500px", height: "auto" }}
        />
      ) : null}
    </div>
  );
};

export default FaceRecognition;
