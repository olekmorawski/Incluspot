import { React } from "react";
import MapComponent from "../components/MapComponent";
import SlidingDetailsPane from "../components/SlidingDetailsPane";
import SlidingAddSpot from "../components/SlidingAddSpot";

function Map() {
  return (
    <div>
      <MapComponent />
      <SlidingDetailsPane />
      <SlidingAddSpot />
    </div>
  );
}

export default Map;
