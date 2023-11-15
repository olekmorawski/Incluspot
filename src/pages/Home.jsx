import React from "react";
import Nav from "../components/Nav";
import Header from "../components/Header";

function Home() {
  return (
    <div className="bg">
      <Nav />
      <div className="header">
        <Header />
      </div>
    </div>
  );
}

export default Home;
