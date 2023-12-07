import React, { useState } from "react";

const SlidingPane = () => {
  const [isPaneOpen, setIsPaneOpen] = useState(false);

  const togglePane = () => {
    setIsPaneOpen(!isPaneOpen);
  };

  return (
    <div className="pane">
      <div className={`sliding-pane-container ${isPaneOpen ? "open" : ""}`}>
        <button onClick={togglePane}>Toggle Pane</button>
        <div className="sliding-pane-content">
          <p>This is the sliding pane content.</p>
        </div>
      </div>
    </div>
  );
};

export default SlidingPane;
