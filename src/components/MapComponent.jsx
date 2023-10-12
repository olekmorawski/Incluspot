import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.locatecontrol/dist/L.Control.Locate.min.css";
import Locate from "leaflet.locatecontrol";

const MapComponent = () => {
  const mapRef = useRef(null);
  const [hasInitialViewBeenSet, setHasInitialViewBeenSet] = useState(false);
  const [customPopupPositions, setCustomPopupPositions] = useState([]);

  let currentTooltip = null;

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

  const fetchGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          if (mapRef.current && !hasInitialViewBeenSet) {
            mapRef.current.setView([latitude, longitude], 13);
            setHasInitialViewBeenSet(true);
          }
        },
        () => {
          console.log("Could not get user location");
        }
      );
    }
  };

  let tooltipCounter = 0;

  const onMapClick = (event) => {
    const latlng = event.latlng;
    const tooltipId = `tooltip-${tooltipCounter}`;
    const buttonId = `place-popup-btn-${tooltipCounter}`;
    tooltipCounter++;

    if (currentTooltip) {
      currentTooltip.removeFrom(mapRef.current);
    }

    const tooltip = L.tooltip({
      permanent: true,
      interactive: true,
      opacity: 1,
    })
      .setLatLng(latlng)
      .setContent(
        `<div id="${tooltipId}"><button id="${buttonId}">Place Popup</button></div>`
      )
      .addTo(mapRef.current);

    currentTooltip = tooltip;

    const tooltipTimer = setTimeout(() => {
      tooltip.removeFrom(mapRef.current);
      currentTooltip = null;
    }, 2000);

    const placePopupAndRemoveTooltip = () => {
      setCustomPopupPositions([
        ...customPopupPositions,
        [latlng.lat, latlng.lng],
      ]);
      tooltip.removeFrom(mapRef.current);
      document
        .getElementById(buttonId)
        .removeEventListener("click", placePopupAndRemoveTooltip);

      currentTooltip = null;

      clearTimeout(tooltipTimer);
    };

    setTimeout(() => {
      const buttonElement = document.getElementById(buttonId);
      if (buttonElement) {
        buttonElement.addEventListener("click", placePopupAndRemoveTooltip);
      }
    }, 0);
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

  const CustomPopup = ({ position, index }) => {
    const ref = useRef(null);

    const handlePopupClick = () => {
      const tooltipId = `delete-tooltip-${tooltipCounter}`;
      const buttonId = `delete-popup-btn-${tooltipCounter}`;
      tooltipCounter++;

      const tooltip = L.tooltip({
        permanent: true,
        interactive: true,
        opacity: 1,
      })
        .setLatLng(position)
        .setContent(
          `<div id="${tooltipId}"><button id="${buttonId}">Delete this placement</button></div>`
        )
        .addTo(mapRef.current);

      const deletePopupAndRemoveTooltip = () => {
        setCustomPopupPositions((prevPositions) =>
          prevPositions.filter((_, i) => i !== index)
        );
        tooltip.removeFrom(mapRef.current);

        setTimeout(() => {
          const buttonElement = document.getElementById(buttonId);
          if (buttonElement) {
            buttonElement.removeEventListener(
              "click",
              deletePopupAndRemoveTooltip
            );
          }
        }, 0);
      };

      setTimeout(() => {
        const buttonElement = document.getElementById(buttonId);
        if (buttonElement) {
          buttonElement.addEventListener("click", deletePopupAndRemoveTooltip);
        }
      }, 0);
    };

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
      <div ref={ref} style={customPopupStyles} onClick={handlePopupClick}>
        There is a spot here!
      </div>
    );
  };

  return (
    <div id="map" style={{ height: "100vh", width: "100%" }}>
      {customPopupPositions.map((position, index) => (
        <CustomPopup key={`popup-${index}`} position={position} index={index} />
      ))}
    </div>
  );
};

export default MapComponent;
