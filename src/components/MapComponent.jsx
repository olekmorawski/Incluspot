import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = () => {
  const mapRef = useRef(null);
  const popupRef = useRef(null);
  const [currentPosition, setCurrentPosition] = useState(null);

  const initializeMap = () => {
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView([51.505, -0.09], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
        mapRef.current
      );
    }
  };

  const setMapCenter = (position) => {
    const { latitude, longitude } = position.coords;
    setCurrentPosition([latitude, longitude]);
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

    const updatePopupPosition = () => {
      if (currentPosition && popupRef.current && mapRef.current) {
        const point = mapRef.current.latLngToContainerPoint(currentPosition);
        popupRef.current.style.left = point.x + "px";
        popupRef.current.style.top = point.y + "px";
      }
    };

    if (mapRef.current) {
      updatePopupPosition();
      mapRef.current.on("move", updatePopupPosition);
      mapRef.current.on("zoom", updatePopupPosition);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.off("move", updatePopupPosition);
        mapRef.current.off("zoom", updatePopupPosition);
      }
    };
  }, [currentPosition]);

  const userPopupStyles = {
    backgroundColor: "#f9f9f9",
    border: "1px solid #ccc",
    padding: "10px",
    boxShadow: "0 1px 7px rgba(0, 0, 0, 0.2)",
    position: "absolute",
    zIndex: 1000,
  };

  return (
    <div id="map" style={{ height: "100vh", width: "100%" }}>
      {currentPosition && (
        <div ref={popupRef} style={userPopupStyles}>
          You are at {currentPosition[0]}, {currentPosition[1]}
        </div>
      )}
    </div>
  );
};

export default MapComponent;