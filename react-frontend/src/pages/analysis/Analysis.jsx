import React, { Component } from "react";
import Starburst from "./SalesStarburst";
import SalesLine from "./SalesLine";
import jwt from "jsonwebtoken";
import "./Analysis.scss";
import { withRouter } from "react-router-dom";
import API from "../../API";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faListAlt,
  faChartLine,
  faBox,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

class Analysis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starburst: [],
      totalProducts: 0,
      totalCategories: 0,
      sale: 0,
      salesLine: [],
      customers: 0,
      stock: [],
      salesPrediction: []
    };
  }

  async componentDidMount() {
    try {
      const jwtoken = localStorage.getItem("JWToken");
      if (jwtoken === null) {
        this.props.history.push("/login");
        return;
      }
      const user = jwt.decode(jwtoken, process.env.REACT_APP_JWT_SECRET);

      let { data } = await API.get(`analytics/pcount/${user.userId}`);
      const { totalProducts, totalCategories } = data;

      data = await API.get(`analytics/ccount/${user.userId}`);
      const categories = data.data;

      const starburst = Object.keys(categories).map((cat, i) => ({
        name: cat,
        color: i / totalCategories,
        size: categories[cat],
      }));

      data = await API.get(`analytics/sale/${user.userId}`);
      const sale = data.data["total net sale"];

      data = await API.get(`analytics/daily/${user.userId}`);
      const dailySale = data.data;
      // const dailySale = {
      //   "2020-10-05": 240,
      //   "2020-10-06": 270,
      //   "2020-10-07": 280,
      //   "2020-10-08": 210,
      //   "2020-10-09": 250,
      // };
      const salesLine = Object.keys(dailySale).map((date) => ({
        x: new Date(date),
        y: dailySale[date],
      }));

      data = await API.get(`analytics/customers/${user.userId}`);
      const customers = data.data["Total unique customers"];

      data = await API.get(`analytics/outofstock/${user.userId}`);
      const stock = data.data.outofstock;

      this.setState({
        totalCategories,
        totalProducts,
        salesLine,
        sale,
        customers,
        stock,
        starburst,
      });
    } catch (error) {
      this.props.setError(error);
    }
  }

  render() {
    // console.log(this.state.starburst);
    return (
      <div className="Analysis App-content">
        <div className="summary">
          <div className="blocks tsale">
            <FontAwesomeIcon className="icons" icon={faChartLine} />
            <div>
              <h4>Total Sale</h4>
              <h2>₹{this.state.sale}</h2>
            </div>
          </div>
          <div className="blocks tpro">
            <FontAwesomeIcon className="icons" icon={faBox} />
            <div>
              <h4>Total Products</h4>
              <h2>{this.state.totalProducts}</h2>
            </div>
          </div>
          <div className="blocks tcat">
            <FontAwesomeIcon className="icons" icon={faListAlt} />
            <div>
              <h4>Total Categories</h4>
              <h2>{this.state.totalCategories}</h2>
            </div>
          </div>
          <div className="blocks mcus">
            <FontAwesomeIcon className="icons" icon={faUser} />
            <div>
              <h4>Customers</h4>
              <h2>{this.state.customers} </h2>
            </div>
          </div>
        </div>
        {/* <div className="products">

				</div> */}
        <div className="starburst">
          {" "}
          <Starburst data={{ children: this.state.starburst }} />{" "}
        </div>
        <div className="line">
          <SalesLine data={this.state.salesLine} />
        </div>
        <div className="stock">
          <h1>Out Of Stock</h1>
          <div>
            {this.state.stock.map((st) => (
              <h2>
                <span>+</span>
                <span>{st}</span>
              </h2>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Analysis);
