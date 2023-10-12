import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = () => {
  const mapRef = useRef(null);
  const position = [51.505, -0.09];

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView(position, 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
        mapRef.current
      );
    }

    const setMapCenter = (position) => {
      const { latitude, longitude } = position.coords;
      if (mapRef.current) {
        mapRef.current.setView([latitude, longitude], 13);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setMapCenter, () => {
        console.log("Could not get user location");
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return <div id="map" style={{ height: "100vh", width: "100%" }} />;
};

export default MapComponent;
