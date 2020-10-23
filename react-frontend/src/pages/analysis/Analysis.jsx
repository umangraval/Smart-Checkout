import React, { Component } from "react";
import Starburst from "./SalesStarburst";
import SalesLine from "./SalesLine";
import jwt from "jsonwebtoken";
import "./Analysis.scss";
import { withRouter } from "react-router-dom";
import API from "../../API";

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
      // const dailySale = data.data;
      const dailySale = {
        "2020-10-05": 240,
        "2020-10-06": 270,
        "2020-10-07": 280,
        "2020-10-08": 210,
        "2020-10-09": 250,
      };
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
    } catch (error) {}
  }

  render() {
    console.log(this.state.starburst);
    return (
      <div className="Analysis App-content">
        <div className="summary">
          <div className="blocks">
            <h2>Total Sale</h2>
            <h3>₹{this.state.sale}</h3>
          </div>
          <div className="blocks">
            <h2>Total Products</h2>
            <h3>{this.state.totalProducts}</h3>
          </div>
          <div className="blocks">
            <h2>Total Categories</h2>
            <h3>{this.state.totalCategories}</h3>
          </div>
          <div className="blocks">
            <h2>Monthly Customers</h2>
            <h3>{this.state.customers} </h3>
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
