import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.locatecontrol/dist/L.Control.Locate.min.css";
import Locate from "leaflet.locatecontrol";
import axios from "axios";

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

  const addSpotToDatabase = async (spotData) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/addSpot",
        spotData
      );
      console.log("Spot saved:", response.data);
    } catch (error) {
      console.log("Failed to save spot:", error);
    }
  };

  const onMapClick = (event) => {
    // Check if the click listener is active or if there's an existing tooltip
    if (!clickListenerActive || currentTooltip) {
      return; // Exit if listener is not active or a tooltip already exists
    }

    // Extract latitude and longitude from the click event
    const latlng = event.latlng;

    // Generate unique IDs for the tooltip and button
    const tooltipId = `tooltip-${tooltipCounter}`;
    const buttonId = `place-marker-btn-${tooltipCounter}`;
    tooltipCounter++;

    // Remove any existing tooltip
    if (currentTooltip) {
      currentTooltip.remove();
    }

    // Create a new tooltip at the clicked location
    const tooltip = L.tooltip({
      permanent: true,
      interactive: true,
      className: "my-custom-tooltip",
      direction: "left",
    })
      .setLatLng(latlng)
      .setContent(
        `<div id="${tooltipId}">
           <button id="${buttonId}" class="custom-button">Place Spot!</button>
         </div>`
      )
      .addTo(mapRef.current);

    // Update the reference to the current tooltip
    currentTooltip = tooltip;

    // Set a timer to automatically remove the tooltip after 2 seconds
    const tooltipTimer = setTimeout(() => {
      tooltip.remove();
      currentTooltip = null;
    }, 2000);

    // Listen for a click event on the newly created button
    setTimeout(() => {
      const buttonElement = document.getElementById(buttonId);
      if (buttonElement) {
        buttonElement.addEventListener("click", () => {
          // Create and add a marker at the clicked location
          const marker = L.marker(event.latlng).addTo(mapRef.current);
          setCustomPopupPositions([...customPopupPositions, event.latlng]);

          // spotData sturctures
          const spotData = {
            name: "Name of the Spot", // Replace with actual name
            address: "Address of the Spot", // Replace with actual address
            username: "Username", // Replace with the actual username of the user
            coordinates: {
              lat: event.latlng.lat,
              lng: event.latlng.lng,
            },
            imgLink: "Piñata Image Link",
          };

          // Attach data and send to axios
          addSpotToDatabase(spotData);

          // Attach a custom tooltip to the marker
          marker.on("click", () => {
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

            // Add a listener for the close button in the tooltip
            const closeButton = document.querySelector(".tooltip-close-btn");
            if (closeButton) {
              closeButton.addEventListener("click", () => {
                marker.closeTooltip();
              });
            }
          });

          // Clean up after placing the marker
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
