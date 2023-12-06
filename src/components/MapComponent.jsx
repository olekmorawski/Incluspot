import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.locatecontrol/dist/L.Control.Locate.min.css";
import Locate from "leaflet.locatecontrol";

const initializeMap = (mapRef, setHasInitialViewBeenSet) => {
  if (!mapRef.current) {
    mapRef.current = L.map("map").setView([51.505, -0.09], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
      mapRef.current
    );

    const locateControl = new Locate({ position: "topright" });
    locateControl.addTo(mapRef.current);
    locateControl.start();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          mapRef.current.setView([latitude, longitude], 13);
          setHasInitialViewBeenSet(true);
        },
        () => {
          console.log("Could not get user location");
        }
      );
    }
  }
};

const MapComponent = () => {
  const mapRef = useRef(null);
  const [customPopupPositions, setCustomPopupPositions] = useState([]);
  const [hasInitialViewBeenSet, setHasInitialViewBeenSet] = useState(false);
  const [clickListenerActive, setClickListenerActive] = useState(true); // New state variable

  let currentTooltip = null;
  let tooltipCounter = 0;

  const onMapClick = (event) => {
    if (!clickListenerActive || currentTooltip) {
      return; // Prevent new tooltip if one is already active or listener is inactive
    }
    const latlng = event.latlng;
    const tooltipId = `tooltip-${tooltipCounter}`;
    const buttonId = `place-marker-btn-${tooltipCounter}`;
    tooltipCounter++;

    if (currentTooltip) {
      currentTooltip.remove();
    }

    const tooltip = L.tooltip({
      permanent: true,
      interactive: true,
      className: "my-custom-tooltip",
      direction: "left",
    })
      .setLatLng(latlng)
      .setContent(
        `<div id="${tooltipId}">
        <button id="${buttonId}" class="custom-button">
        Place Spot!
        </button>
        </div>`
      )
      .addTo(mapRef.current);

    currentTooltip = tooltip;

    const tooltipTimer = setTimeout(() => {
      tooltip.remove();
      currentTooltip = null;
    }, 2000); // Adjust time as needed

    setTimeout(() => {
      const buttonElement = document.getElementById(buttonId);
      if (buttonElement) {
        buttonElement.addEventListener("click", () => {
          const marker = L.marker(latlng).addTo(mapRef.current); // Define marker here
          setCustomPopupPositions([...customPopupPositions, latlng]);
          // Attach custom tooltip to the marker
          marker.on("click", () => {
            // Now marker is accessible here
            const tooltipContent = `
              <div class="custom-marker-tooltip">
              <button class="tooltip-close-btn">X</button>
                <button class="tooltip-btn">Report</button>
                <button class="tooltip-btn">Route</button>
                <button class="tooltip-btn">Details</button>
              </div>
            `;

            marker
              .bindTooltip(tooltipContent, {
                permanent: true,
                direction: "center",
                className: "my-custom-marker-tooltip",
                interactive: true,
              })
              .openTooltip();
            const closeButton = document.querySelector(".tooltip-close-btn");
            if (closeButton) {
              closeButton.addEventListener("click", () => {
                marker.closeTooltip();
              });
            }
          });

          tooltip.remove();
          currentTooltip = null;
          clearTimeout(tooltipTimer);
          setClickListenerActive(false);
        });
      }
    }, 0);
  };

  useEffect(() => {
    initializeMap(mapRef, setHasInitialViewBeenSet);

    const enableClickListener = () => {
      setClickListenerActive(true);
    };

    if (mapRef.current) {
      mapRef.current.on("click", onMapClick);
      mapRef.current.on("click", enableClickListener);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.off("click", onMapClick);
        mapRef.current.off("click", enableClickListener);
      }
    };
  }, [customPopupPositions, clickListenerActive]);

  return <div id="map" style={{ height: "100vh", width: "100%" }} />;
};

export default MapComponent;
