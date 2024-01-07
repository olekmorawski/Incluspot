import React, { useState } from "react";
import axios from "axios";

const SlidingAddSpot = () => {
  const [isPaneOpen, setIsPaneOpen] = useState(false);
  const [spotname, setSpotname] = useState("");

  const togglePane = () => {
    setIsPaneOpen(!isPaneOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("spotname", spotname);
        const response = await axios.post(
          "http://localhost:8000/api/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } catch (error) {
        console.error("Error during adding a new spot", error);
      }
    } else {
      console.error("No file selected");
    }
  };

  return (
    <div className="pane">
      <div className={`sliding-pane-container ${isPaneOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={togglePane}>
          X
        </button>
        <form onSubmit={handleSubmit} className="sliding-pane-content">
          <div className="spot-name">
            <label htmlFor="spotname">Spot Name</label>
            <input
              type="text"
              name="spotname"
              id="spotname"
              placeholder="Spot Name"
              onChange={(e) => setSpotname(e.target.value)}
            />
          </div>
          <div className="spot.image-upload">
            <label htmlFor="spot.image-upload">Spot Image</label>
            <input type="file" name="file" id="file" placeholder="Spot Image" />
          </div>
          <div className="spot-btns">
            <button type="submit" className="addspot-btn">
              Add Spot
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SlidingAddSpot;
