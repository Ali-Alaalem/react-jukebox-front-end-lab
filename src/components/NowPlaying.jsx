const NowPlaying = (props) => {
  if (props.selected) {
    return (
      <div>
        <h1>Title:{props.selected.title}</h1>
        <h2>Artist: {props.selected.artist}</h2>
      </div>
    );
  }
};

export default NowPlaying;
