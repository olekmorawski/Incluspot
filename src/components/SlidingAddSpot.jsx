import React, { useState } from "react";

const SlidingAddSpot = () => {
  const [isPaneOpen, setIsPaneOpen] = useState(false);
  const togglePane = () => {
    setIsPaneOpen(!isPaneOpen);
  };

  return (
    <div className="pane">
      <div className={`sliding-pane-container ${isPaneOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={togglePane}>
          X
        </button>
        <form className="sliding-pane-content">
          <div className="spot-name">
            <label htmlFor="spot-name">Spot Name</label>
            <input
              type="text"
              name="spot-name"
              id="spot-name"
              placeholder="Spot Name"
            />
          </div>
          <div className="spot-img">
            <label htmlFor="spot-img">Spot Image</label>
            <input
              type="file"
              name="spot-img"
              id="spot-img"
              placeholder="Spot Image"
            />
          </div>
          <div className="spot-btns">
            <button className="addspot-btn">Add Spot</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SlidingAddSpot;