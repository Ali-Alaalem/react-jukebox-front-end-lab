const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/tracks`;

const index = async () => {
  try {
    const res = await fetch(BASE_URL);
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const create = async (formData) => {
  console.log(formData);
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const updateTrack = async (formData, trackId) => {
  try {
    const res = await fetch(`${BASE_URL}/${trackId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const deleteTrack = async (trackId) => {
  try {
    const deleteTrack = await fetch(`${BASE_URL}/${trackId}`, {
      method: "DELETE",
    });
    console.log("service: ", deleteTrack);
    return deleteTrack.json();
  } catch (error) {
    console.log(error);
  }
};

export { index, create, updateTrack, deleteTrack };
