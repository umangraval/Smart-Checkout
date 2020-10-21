import React, { Component } from "react";
import Starburst from "./SalesStarburst";
import SalesBar from './SalesBar';
import './Analysis.scss'
import { withRouter } from "react-router-dom";

class Analysis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starburst: [
        {
          color: Math.random(),
          name: "Snacks",
          // size:45,
          // label:'Snacks',
          children: [
            {
              color: Math.random(),
              name: "Oreo",
              size: 45,
              // label:'Oreo',
            },
            {
              color: Math.random(),
              name: "Lays",
              size: 45,
              // label:'Lays',
            },
            {
              color: Math.random(),
              name: "Popcorn",
              size: 10,
              // label:'Popcorn',
            },
          ],
        },
        {
          color: Math.random(),
          name: "Stationary",
          // size:45,
          // label:'Stationary',
          children: [
            {
              color: Math.random(),
              name: "Notebooks",
              size: 30,
              // label:'Notebooks',
            },
            {
              color: Math.random(),
              name: "Pencils",
              size: 40,
              // label:'Pencils',
            },
            {
              color: Math.random(),
              name: "Erasers",
              size: 10,
              // label:'Erasers',
            },
          ],
        },
        {
          color: Math.random(),
          name: "Xerox",
          // size:10,
          // label:'Xerox',
          children: [
            {
              color: Math.random(),
              name: "Colored",
              size: 30,
              // label:'Colored',
            },
            {
              color: Math.random(),
              name: "B/W",
              size: 70,
              // label:'B/W',
            },
          ],
        },
      ],
    };
  }

  render() {
    return (
      <div className="Analysis App-content">
				<div className="summary">
					<div className="blocks">
						<h2>Total Sale</h2>
						<h3>₹100000</h3>
					</div>
					<div className="blocks">
						<h2>Gross Proft</h2>
						<h3>₹40000</h3>
					</div>
					<div className="blocks">
						<h2>Total Stock</h2>
						<h3>₹80000</h3>
					</div>
					<div className="blocks">
						<h2>Monthly ______</h2>
					<h3 style={{'color':'red'}}>-2%</h3>
					</div>
				</div>
        {/* <div className="products">

				</div> */}
        <div className="starburst">
          {" "}
          <Starburst data={{ children: this.state.starburst }} />{" "}
        </div>
				<div className="line">
					<SalesBar />
				</div>
      </div>
    );
  }
}

export default withRouter(Analysis);