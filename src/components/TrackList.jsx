const TrackList = (props) => {
  const tracks = props.trackList.map((track) => {
    return (
      <a onClick={() => props.updateSelected(track)}>
        <li>{track.name}</li>
      </a>
    );
  });

  return (
    <>
      <section>
        <ul>
          {props.trackList.map((track) => (
            <li>
              {`${track.title} by ${track.artist}`}
              <br />
              <button
                onClick={() => {
                  props.updateSelected(track);
                }}
              >
                Play
              </button>
              <button
                onClick={() => {
                  props.updateSelected(track);
                  props.handleFormView(track);
                }}
              >
                Edit
              </button>
              <button
                onClick={() => {
                  props.handleRemoveTrack(track._id);
                }}
              >
                Delete Track
              </button>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default TrackList;
