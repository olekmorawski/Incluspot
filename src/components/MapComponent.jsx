import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.locatecontrol/dist/L.Control.Locate.min.css";
import Locate from "leaflet.locatecontrol";

const MapComponent = () => {
  const mapRef = useRef(null);
  const [hasInitialViewBeenSet, setHasInitialViewBeenSet] = useState(false);
  const [customPopupPositions, setCustomPopupPositions] = useState([]);

  const initializeMap = () => {
    if (!mapRef.current) {
      mapRef.current = L.map("map");
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
        mapRef.current
      );

      const locateControl = new Locate({
        position: "topright",
      });

      locateControl.addTo(mapRef.current);
      locateControl.start();
    }
  };

  const setMapCenter = (position) => {
    const { latitude, longitude } = position.coords;
    const latlng = [latitude, longitude];
    if (mapRef.current && !hasInitialViewBeenSet) {
      mapRef.current.setView(latlng, 13);
      setHasInitialViewBeenSet(true);
    }
  };

  const fetchGeolocation = () => {
    if (navigator.geolocation) {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };

      navigator.geolocation.getCurrentPosition(
        setMapCenter,
        () => {
          console.log("Could not get user location");
        }, options);
    }
  };

  const onMapClick = (event) => {
    const latlng = event.latlng;
    setCustomPopupPositions([
      ...customPopupPositions,
      [latlng.lat, latlng.lng],
    ]);
  };

  useEffect(() => {
    initializeMap();
    fetchGeolocation();

    if (mapRef.current) {
      mapRef.current.on("click", onMapClick);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.off("click", onMapClick);
      }
    };
  }, [customPopupPositions]);

  const customPopupStyles = {
    backgroundColor: "#f9f9f9",
    border: "1px solid #ccc",
    padding: "10px",
    boxShadow: "0 1px 7px rgba(0, 0, 0, 0.2)",
    position: "absolute",
    zIndex: 1000,
  };

  const CustomPopup = ({ position }) => {
    const ref = useRef(null);

    useEffect(() => {
      const updateCustomPopupPosition = () => {
        if (position && ref.current && mapRef.current) {
          const point = mapRef.current.latLngToContainerPoint(position);
          ref.current.style.left = point.x + "px";
          ref.current.style.top = point.y + "px";
        }
      };

      if (mapRef.current) {
        updateCustomPopupPosition();
        mapRef.current.on("move", updateCustomPopupPosition);
        mapRef.current.on("zoom", updateCustomPopupPosition);
      }

      return () => {
        if (mapRef.current) {
          mapRef.current.off("move", updateCustomPopupPosition);
          mapRef.current.off("zoom", updateCustomPopupPosition);
        }
      };
    }, [position]);

    return (
      <div ref={ref} style={customPopupStyles}>
        There is a spot here!
      </div>
    );
  };

  return (
    <div id="map" style={{ height: "100vh", width: "100%" }}>
      {customPopupPositions.map((position, index) => (
        <CustomPopup key={`popup-${index}`} position={position} />
      ))}
    </div>
  );
};

export default MapComponent;
