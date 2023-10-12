import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = () => {
  const mapRef = useRef(null);
  const [currentPosition, setCurrentPosition] = useState(null);

  const initializeMap = () => {
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView([51.505, -0.09], 13); // Fallback position
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
        mapRef.current
      );
    }
  };

  const setMapCenter = (position) => {
    const { latitude, longitude } = position.coords;
    const latlng = [latitude, longitude];
    if (mapRef.current) {
      mapRef.current.setView(latlng, 13);
    }
    setCurrentPosition(latlng);
  };

  const fetchGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setMapCenter, () => {
        console.log("Could not get user location");
      });
    }
  };

  useEffect(() => {
    initializeMap();
    fetchGeolocation();
  }, []);

  const customPopupStyles = {
    backgroundColor: "#f9f9f9",
    border: "1px solid #ccc",
    padding: "10px",
    boxShadow: "0 1px 7px rgba(0, 0, 0, 0.2)",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  return (
    <div id="map" style={{ height: "100vh", width: "100%" }}>
      {currentPosition && (
        <div style={customPopupStyles}>
          You are at {currentPosition[0]}, {currentPosition[1]}
        </div>
      )}
    </div>
  );
};

export default MapComponent;