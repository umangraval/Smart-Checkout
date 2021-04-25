import React, { useState } from "react";
import "./monitor.scss";

function Monitor() {
  const [feedMode, setFeedMode] = useState("none");

  return (
    <div className="Monitor App-content">
      <h1 className="pageHeader">Monitor</h1>
      <div className="section player">
        <div className="feed">
          <img
            src={`http://127.0.0.1:5000/stream/${feedMode}`}
            onError={"this.onerror=null; this.src='VideoUnavailable.png';"}
            className="stream"
            alt="logo"
          />
        </div>
        <div className="menu">
          <div
            onClick={() => {
              setFeedMode("none");
            }}
            className={`player-button ${
              feedMode === "none" ? "player-button-selected" : ""
            }`}
          >
            None
          </div>
          <div
            onClick={() => {
              setFeedMode("mask");
            }}
            className={`player-button ${
              feedMode === "mask" ? "player-button-selected" : ""
            }`}
          >
            Mask
          </div>
          <div
            onClick={() => {
              setFeedMode("dist");
            }}
            className={`player-button ${
              feedMode === "dist" ? "player-button-selected" : ""
            }`}
          >
            Distancing
          </div>
          <div
            onClick={() => {
              setFeedMode("all");
            }}
            className={`player-button ${
              feedMode === "all" ? "player-button-selected" : ""
            }`}
          >
            All
          </div>
        </div>
      </div>
    </div>
  );
}

export default Monitor;