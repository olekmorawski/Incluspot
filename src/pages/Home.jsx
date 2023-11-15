import React from "react";
import Nav from "../components/Nav";
import Header from "../components/Header";
import Statistic from "../components/Statistic";

function Home() {
  return (
    <div className="bg">
      <Nav />
      <div className="header">
        <Header />
      </div>
      <div className="stats">
        <div className="stats_box">
          <Statistic number="7" title="ZAZNACZONYCH MIEJSC" />
          <Statistic number="7" title="USERÓW" />
        </div>
      </div>
    </div>
  );
}

export default Home;
