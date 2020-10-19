import React from "react";
import "./overview.scss";
import { withRouter } from "react-router-dom";

function Overview(props) {
  if(localStorage.getItem('JWToken')==null){
    props.history.push('/login');
    return null;
  }
  else
  return (
    <div className="Overview App-content">
      <div className="col">
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
      <div className="image">
        {/* <img src="./store.png" alt="store"/> */}
        <img src="./analytics.gif" alt="analytics"/>
      </div>
    </div>
  );
}

export default withRouter(Overview);
