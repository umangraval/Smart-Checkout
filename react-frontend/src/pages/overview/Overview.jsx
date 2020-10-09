import React from "react";
import "./overview.scss";
import { withRouter } from "react-router-dom";

function Overview(props) {
  return (
    <div className="Overview App-content">
      <div className="row">
        <div
          className="cell"
          onClick={() => {
            props.history.push("/analytics");
          }}
        >
          Analytics
        </div>
        <div
          className="cell"
          onClick={() => {
            props.history.push("/transactions");
          }}
        >
          Transactions
        </div>
        <div
          className="cell"
          onClick={() => {
            props.history.push("/products");
          }}
        >
          Products
        </div>
      </div>
      <div className="row">
        <div
          className="cell"
          onClick={() => {
            props.history.push("/categories");
          }}
        >
          Categories
        </div>
        <div
          className="cell"
          onClick={() => {
            props.history.push("/profile");
          }}
        >
          Profile
        </div>
      </div>
    </div>
  );
}

export default withRouter(Overview);
