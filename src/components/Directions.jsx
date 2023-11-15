import React, { useState } from "react";

const modalStyle = {
  display: "block",
  position: "absolute",
  top: "10%",
  left: "10%",
  width: "300px",
  backgroundColor: "white",
  boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.5)",
  padding: "20px",
  zIndex: 1000,
};

const buttonStyle = {
  marginRight: "10px",
};

const closeButtonStyle = {
  position: "absolute",
  right: "10px",
  top: "10px",
  cursor: "pointer",
};

// Modal Component
function MapModal({ isOpen, onClose, location }) {
  if (!isOpen) return null;

  return (
    <div style={modalStyle}>
      <div style={closeButtonStyle} onClick={onClose}>
        X
      </div>
      <h4>Best</h4>
      <div>37 min</div>
      <div>1 hr 6</div>
      <div>5 hr</div>
      <div>1 hr 36</div>
      <div>
        <strong>Your location</strong>
      </div>
      <div>{location}</div>
    </div>
  );
}

// Main App Component
function App() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <button style={buttonStyle} onClick={() => setModalOpen(true)}>
        Open Modal
      </button>
      <MapModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        location="DESA Unicum, Piękna 1A, 00-477 Warsza"
      />
    </div>
  );
}

export default App;
