import { useState } from "react";

const TrackForm = (props) => {
  const initialState = {
    title: "",
    artist: "",
  };

  const [formData, setFormData] = useState(
    props.selected ? props.selected : initialState
  );

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formData.title.trim("") || !formData.artist.trim("")) {
      return;
    }
    if (props.selected) {
      props.handleUpdateTrack(formData, props.selected._id);
    } else {
      props.handleAddTrack(formData);
    }
    setFormData(initialState);
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="artist">Artist: </label>
        <input
          type="text"
          name="artist"
          value={formData.artist}
          onChange={handleChange}
        />
        <br />
        <button type="submit">
          {props.selected ? "Update Track" : "Add New Track"}
        </button>
      </form>
    </div>
  );
};

export default TrackForm;
