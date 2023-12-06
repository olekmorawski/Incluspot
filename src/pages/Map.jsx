import { useState, React } from "react";
import MapComponent from "../components/MapComponent";
import Panel from "../components/Panel";

function Map() {
  const [isPaneOpen, setIsPaneOpen] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState(null);

  const handleSpotSelect = (spot) => {
    setSelectedSpot(spot);
    setIsPaneOpen(true);
  };

  return (
    <div>
      <MapComponent onSpotSelect={handleSpotSelect} />
      <Panel
        isOpen={isPaneOpen}
        onClose={() => setIsPaneOpen(false)}
        spot={selectedSpot}
      />
    </div>
  );
}

export default Map;
