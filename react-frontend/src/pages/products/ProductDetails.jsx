import React, { Component } from "react";
import API from "../../API";
import jwt from "jsonwebtoken";
import "./productDetails.scss";

export default class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: true,
      name: "",
      category: "",
      price: 0,
      quantity: 0,
      image: "",
      categories: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  async handleDelete() {
    try {
      await API.delete(`product/delete/${this.props.id}`);
      this.props.updateProductList(this.props.id, true, null);
    } catch (error) {
      this.props.setError(error);
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    try {
      const { name, category, price, quantity } = this.state;
      const { data } = await API.put(`/product/update/${this.props.id}`, {
        owner: jwt.decode(localStorage.getItem("JWToken")).userId,
        name,
        category,
        price,
        quantity,
      });
      this.props.updateProductList(this.props.id, false, data.product);
    } catch (error) {
      this.props.setError(error);
    }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async componentDidMount() {
    try {
      const { data } = await API.get(`product/search?id=${this.props.id}`);
      const { name, category, price, quantity } = data.product;
      this.setState({
        name,
        category,
        price,
        quantity,
      });
      const jwtoken = localStorage.getItem("JWToken");
      const user = jwt.decode(jwtoken, process.env.REACT_APP_JWT_SECRET);
      const categories = await API.get(`/category/all/${user.userId}`);
      this.setState({
        categories: categories.data.categories.map((cat) => {
          return cat.tag;
        }),
      });
    } catch (error) {
      this.props.setError(error);
    }
  }

  render() {
    if (this.state.mode) {
      return (
        <div className="addProduct--wrapper">
          <div className="addProduct">
            <h1>Product Details</h1>
            <div className="form">
              <div className="add-img">
                <img src="./logo512.png" alt="img" />
              </div>
              <div>
                Name&nbsp;:<span id="name">{this.state.name}</span>
              </div>
              <div>
                <div
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  Price&nbsp;:<span id="price">{this.state.price}</span>
                  &nbsp; Stock&nbsp;:
                  <span id="qty">{this.state.quantity}</span>
                </div>
              </div>
              <div>
                Category&nbsp;:<span id="category">{this.state.category}</span>
              </div>

              <div className="buttons">
                <button
                  className="edit"
                  onClick={() => this.setState({ mode: false })}
                >
                  Edit
                </button>
                <button className="delete" onClick={this.handleDelete}>
                  Delete
                </button>
                <button
                  className="cancel"
                  onClick={() => this.props.handleCancel()}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="addProduct--wrapper">
        <div className="addProduct">
          <h1>Edit Product</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="add-img">
              <span>+</span>
            </div>
            <div>
              {" "}
              Name&nbsp;
              <input
                value={this.state.name}
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
                  value={this.state.price}
                  onChange={this.handleChange}
                  type="number"
                  name="price"
                  id="price"
                />
                &nbsp; Stock&nbsp;
                <input
                  value={this.state.quantity}
                  onChange={this.handleChange}
                  type="number"
                  name="quantity"
                  id="qty"
                />
              </div>
            </div>
            <select
              value={this.state.category}
              onChange={this.handleChange}
              name="category"
            >
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
                onClick={() => this.setState({ mode: true })}
              >
                Back
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
