import React, { Component } from "react";
import {
  VerticalBarSeries,
  VerticalBarSeriesCanvas,
//   ShowcaseButton,
  XYPlot,
  DiscreteColorLegend,
  VerticalGridLines,
  HorizontalGridLines,
  XAxis,
  YAxis,
  Hint
} from "react-vis";

export default class SalesBar extends React.Component {
  state = {
    useCanvas: false,
  };
  render() {
    const { useCanvas } = this.state;
    const BarSeries = useCanvas ? VerticalBarSeriesCanvas : VerticalBarSeries;

    return (
      <div>
        {/* <ShowcaseButton
          onClick={() => this.setState({ useCanvas: !useCanvas })}
          buttonContent={content}
        /> */}
        <XYPlot
          className="clustered-stacked-bar-chart-example"
          xType="ordinal"
          stackBy="y"
          width={500}
          height={350}
        >
          {/* <DiscreteColorLegend
            style={{ position: "absolute", left: "50px", top: "10px" }}
            orientation="horizontal"
            items={[
              {
                title: "Apples",
                color: "#12939A",
              },
              {
                title: "Oranges",
                color: "#79C7E3",
              },
            ]}
          /> */}
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          {/* <BarSeries
            cluster="2015"
            color="#12939A"
            data={[
              { x: "Q1", y: 10 },
              { x: "Q2", y: 5 },
              { x: "Q3", y: 15 },
              { x: "Q4", y: 20 },
            ]}
          />
          <BarSeries
            cluster="2015"
            color="#79C7E3"
            data={[
              { x: "Q1", y: 3 },
              { x: "Q2", y: 7 },
              { x: "Q3", y: 2 },
              { x: "Q4", y: 1 },
            ]}
          /> */}
          <Hint value={1}>
              <h1>awdwdwed</h1>
          </Hint>
          <BarSeries
            color="#12939A"
            data={[
              { x: "Jan", y: 3 },
              { x: "Feb", y: 8 },
              { x: "Mar", y: 11 },
              { x: "Apr", y: 19 },
              { x: "May", y: 9 },
              { x: "Jun", y: 29 },
              { x: "Jul", y: 2 },
            ]}
          />
          <BarSeries
            color="#79C7E3"
            data={[
              { x: "Jan", y: 22 },
              { x: "Feb", y: 2 },
              { x: "Mar", y: 12 },
              { x: "Apr", y: 11 },
              { x: "May", y: 12 },
              { x: "Jun", y: 8 },
              { x: "Jul", y: 3 },
            ]}
          />
          <BarSeries
            color="#29D7FF"
            data={[
              { x: "Jan", y: 2 },
              { x: "Feb", y: 12 },
              { x: "Mar", y: 2 },
              { x: "Apr", y: 8 },
              { x: "May", y: 1 },
              { x: "Jun", y: 13 },
              { x: "Jul", y: 15 },
            ]}
          />
        </XYPlot>
      </div>
    );
  }
}
