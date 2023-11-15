import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.locatecontrol/dist/L.Control.Locate.min.css";
import Locate from "leaflet.locatecontrol";

const initializeMap = (mapRef) => {
  if (!mapRef.current) {
    mapRef.current = L.map("map");
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
      mapRef.current
    );

    const locateControl = new Locate({ position: "topright" });
    locateControl.addTo(mapRef.current);
    locateControl.start();
  }
};

const fetchGeolocation = (
  mapRef,
  hasInitialViewBeenSet,
  setHasInitialViewBeenSet
) => {
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

const MapComponent = () => {
  const mapRef = useRef(null);
  const [hasInitialViewBeenSet, setHasInitialViewBeenSet] = useState(false);
  const [customPopupPositions, setCustomPopupPositions] = useState([]);
  let currentTooltip = null;
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
      className: "my-custom-tooltip",
      direction: "left",
    })
      .setLatLng(latlng)
      .setContent(
        `<div id="${tooltipId}"><button id="${buttonId}" class="custom-button">Place Popup</button></div>`
      )
      .addTo(mapRef.current);

    currentTooltip = tooltip;

    const tooltipTimer = setTimeout(() => {
      tooltip.removeFrom(mapRef.current);
      currentTooltip = null;
    }, 2000);

    const placePopupAndRemoveTooltip = () => {
      console.log("Attempting to place popup at:", latlng);

      const newPopup = L.popup({ className: "my-custom-popup" })
        .setLatLng(latlng)
        .setContent("There is a spot here!")
        .openOn(mapRef.current);

      console.log("Popup placed:", newPopup);
      console.log("Popup HTML element:", newPopup.getElement());

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
    initializeMap(mapRef);
    fetchGeolocation(mapRef, hasInitialViewBeenSet, setHasInitialViewBeenSet);

    if (mapRef.current) {
      mapRef.current.on("click", onMapClick);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.off("click", onMapClick);
      }
    };
  }, [customPopupPositions]);

  return <div id="map" style={{ height: "100vh", width: "100%" }} />;
};

export default MapComponent;
