import { useEffect, useState } from "react";

import * as trackServices from "./services/trackService";

import TrackForm from "./components/TrackForm";
import TrackList from "./components/TrackList";
import NowPlaying from "./components/NowPlaying";

const App = () => {
  const [trackList, setTrackList] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const updateSelected = (track) => {
    setSelected(track);
    setIsFormOpen(false);
  };

  const handleFormView = (track) => {
    if (!track.title) setSelected(null);
    setIsFormOpen(!isFormOpen);
  };

  const handleAddTrack = async (formData) => {
    try {
      const newTrack = await trackServices.create(formData);
      setTrackList([newTrack, ...trackList]);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateTrack = async (formData, trackId) => {
    try {
      const updatedTrack = await trackServices.updateTrack(formData, trackId);

      const updatedTrackList = trackList.map((track) =>
        track._id !== updatedTrack._id ? track : updatedTrack
      );
      setTrackList(updatedTrackList);
      setSelected(null);
      setIsFormOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveTrack = async (trackId) => {
    console.log("trackId, ", trackId);
    try {
      const deletedTrack = await trackServices.deleteTrack(trackId);

      setTrackList(trackList.filter((track) => track._id !== deletedTrack._id));
      setSelected(null);
      setIsFormOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const data = await trackServices.index();
        setTrackList(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTrack();
  }, []);

  return (
    <div className="container">
      <header>
        <button onClick={handleFormView}>
          {isFormOpen ? "Close Form" : "Add New Track"}
        </button>
      </header>
      <TrackList
        trackList={trackList}
        updateSelected={updateSelected}
        handleFormView={handleFormView}
        handleRemoveTrack={handleRemoveTrack}
        isFormOpen={isFormOpen}
        handleUpdateTrack={handleUpdateTrack}
      />
      {isFormOpen ? (
        <TrackForm
          handleAddTrack={handleAddTrack}
          selected={selected}
          handleUpdateTrack={handleUpdateTrack}
        />
      ) : (
        <NowPlaying selected={selected} />
      )}
    </div>
  );
};

export default App;
