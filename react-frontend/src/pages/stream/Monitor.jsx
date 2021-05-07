import React, { Component } from 'react'
import axios from 'axios';
import "./monitor.scss";

export default class Monitor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      feedMode : 'all',
    }
    this.onModeChange=this.onModeChange.bind(this);
  }

  async onModeChange(e) {
    await axios.get('http://localhost:5000/stream/stop')
    this.setState({ feedMode:e })
  }

  componentWillUnmount() {
    axios.get('http://localhost:5000/stream/stop')
  }

  render() {
    const { feedMode } = this.state;
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
              value="none"
              onClick={() => {this.onModeChange("none")}}
              className={`player-button ${
                feedMode === "none" ? "player-button-selected" : ""
              }`}
            >
              None
            </div>
            <div
              value="mask"
              onClick={() => {this.onModeChange("mask")}}
              className={`player-button ${
                feedMode === "mask" ? "player-button-selected" : ""
              }`}
            >
              Mask
            </div>
            <div
              value="dist"
              onClick={() => {this.onModeChange("dist")}}
              className={`player-button ${
                feedMode === "dist" ? "player-button-selected" : ""
              }`}
            >
              Distancing
            </div>
            <div
              value="all"
              onClick={() => {this.onModeChange("all")}}
              className={`player-button ${
                feedMode === "all" ? "player-button-selected" : ""
              }`}
            >
              All
            </div>
          </div>
        </div>
      </div>
    )
  }
}