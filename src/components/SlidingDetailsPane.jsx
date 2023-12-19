import React, { useState } from "react";

const SlidingDetailsPane = () => {
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
        <div className="sliding-pane-content">
          <img className="spot.img" src="" alt="" />
          <h1 className="spot.name">Spot Name Here</h1>
          <div className="spot-btns">
            <button className="report-btn">Report</button>
            <button className="route-btn">Route</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlidingDetailsPane;
