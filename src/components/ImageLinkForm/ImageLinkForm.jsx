import "./ImageLinkForm.css";

const ImageLinkForm = ({ onInputChange, onButtonsubmit }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onButtonsubmit();
      }}
    >
      <p className="f3">
        This Magic Brain will detect faces in your pictures. Give it a try.
      </p>

      <div className="form center pa4 br3 shadow-5">
        <input
          className="f4 pa2 w-70 center"
          type="text"
          onChange={onInputChange}
        />
        <button
          type="submit"
          className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
        >
          Detect
        </button>
      </div>
    </form>
  );
};

export default ImageLinkForm;
