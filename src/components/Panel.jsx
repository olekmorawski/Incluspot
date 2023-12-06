import React, { useState } from "react";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";

const Panel = () => {
  const [isPaneOpen, setIsPaneOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsPaneOpen(true)}>Open Panel</button>
      <SlidingPane
        isOpen={isPaneOpen}
        title="Details Panel"
        onRequestClose={() => setIsPaneOpen(false)}
      >
        <div>Content of your panel</div>
      </SlidingPane>
    </div>
  );
};

export default Panel;
