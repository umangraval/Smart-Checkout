import React from "react";
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  LineMarkSeries,
  Highlight,
  Crosshair,
} from "react-vis";

export default class SalesLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastDrawLocation: null,
      crossHairVal: [],
    };
    this._onNearestX = this._onNearestX.bind(this);
  }

  _onNearestX(value, { index }) {
    this.setState({ crossHairVal: [value] });
  }

  render() {
    const { lastDrawLocation } = this.state;
    return (
      <div className="chart" >
        <h1>Daily Sales</h1>
        <XYPlot
          animation
          xDomain={
            lastDrawLocation && [lastDrawLocation.left, lastDrawLocation.right]
          }
          yDomain={
            lastDrawLocation && [lastDrawLocation.bottom, lastDrawLocation.top]
          }
          width={400}
          height={250}
          xType="time"
          onMouseLeave={() => {
            this.setState({ crossHairVal: [] });
          }}
        >
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <Crosshair
            values={this.state.crossHairVal}
            className={"test-class-name"}
          />
          <LineMarkSeries
            className="linemark-series-example"
            onNearestX={this._onNearestX}
            curve={"curveMonotoneX"}
            data={this.props.data}
          />
          <Highlight
            onBrushEnd={(area) => this.setState({ lastDrawLocation: area })}
            onDrag={(area) => {
              this.setState({
                lastDrawLocation: {
                  bottom: lastDrawLocation.bottom + (area.top - area.bottom),
                  left: lastDrawLocation.left - (area.right - area.left),
                  right: lastDrawLocation.right - (area.right - area.left),
                  top: lastDrawLocation.top + (area.top - area.bottom),
                },
              });
            }}
          />
        </XYPlot>
      </div>
    );
  }
}
