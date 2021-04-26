import React, { Component } from "react";
import "./addProduct.scss";
import API from "../../API";
import jwt from "jsonwebtoken";

export default class addProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      category: "",
      price: 0,
      quantity: 0,
      image: "",
      categories: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async onSubmit(e) {
    e.preventDefault();
    try {
      const { name, category, price, quantity } = this.state;
      const { data } = await API.post(`/product/add/`, {
        owner: jwt.decode(localStorage.getItem("JWToken")).userId,
        name,
        category,
        price,
        quantity,
      });
      this.props.updateProduct({
        id: data.product._id,
        name,
        price,
        category,
        quantity,
      });
    } catch (error) {
      this.props.setError(error);
    }
  }

  async componentDidMount() {
    const jwtoken = localStorage.getItem("JWToken");
    const user = jwt.decode(jwtoken, process.env.REACT_APP_JWT_SECRET);
    const categories = await API.get(`/category/all/${user.userId}`);
    this.setState({
      categories: categories.data.categories.map((cat) => {
        return cat.tag;
      }),
    });
  }

  render() {
    return (
      <div className="addProduct--wrapper">
        <div className="addProduct">
          <h1>Add Product</h1>
          <form onSubmit={this.onSubmit}>
            <div className="add-img">
              <span>+</span>
            </div>
            <div>
              {" "}
              Name&nbsp;
              <input
                onChange={this.handleChange}
                type="text"
                name="name"
                id="name"
              />
            </div>
            <div>
              <div
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                {" "}
                Price&nbsp;
                <input
                  onChange={this.handleChange}
                  type="number"
                  name="price"
                  id="price"
                />
                &nbsp; Stock&nbsp;
                <input
                  onChange={this.handleChange}
                  type="number"
                  name="quantity"
                  id="qty"
                />
              </div>
            </div>
            <select onChange={this.handleChange} name="category">
              <option value="none">Category</option>
              {this.state.categories.map((cat) => (
                <option onChange={this.handleChange} value={cat}>
                  {cat}{" "}
                </option>
              ))}
            </select>
            <div className="buttons">
              <button className="submit">Submit</button>
              <button
                className="cancel"
                onClick={() => this.props.toggleAddProduct()}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
