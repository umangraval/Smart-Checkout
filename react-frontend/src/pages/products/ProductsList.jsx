import React, { Component } from "react";
import AddProduct from "./addProduct";
import Table from "../../components/table/table";
import "./productlist.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import API from "../../API";
import { withRouter } from "react-router-dom";
import jwt from "jsonwebtoken";

class ProductsList extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      searchBar: "",
      addProduct: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.toggleAddProduct = this.toggleAddProduct.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  toggleAddProduct() {
    this.setState({
      addProduct: !this.state.addProduct,
    });
  }

  updateProduct(product) {
    const products = this.state.products;
    products.push(product);
    this.setState({
      products: products,
      addProduct: !this.state.addProduct,
    });
  }

  async componentDidMount() {
    const jwtoken = localStorage.getItem("JWToken");
    if (jwtoken === null) this.props.history.push("/login");
    const user = jwt.decode(jwtoken, process.env.REACT_APP_JWT_SECRET);
    const products = await API.get(`product/all/${user.userId}`);
    this.setState({
      products: products.data.products.map((prod) => {
        return {
          id: prod._id,
          name: prod.name,
          price: prod.price,
          category: prod.category,
          stock: prod.quantity,
        };
      }),
    });
  }

  render() {
    return (
      <div className="ProductList App-content">
        {this.state.addProduct ? (
          <AddProduct
            toggleAddProduct={this.toggleAddProduct}
            updateProduct={this.updateProduct}
          />
        ) : null}
        <h1>Products</h1>
        <div className="section">
          <button className="add-button" onClick={this.toggleAddProduct}>
            Add Product
          </button>
          <form className="search">
            <input
              type="search"
              name="searchBar"
              id="searchbar"
              value={this.state.searchBar}
              onChange={this.handleChange}
            />
            <FontAwesomeIcon icon={faSearch} className="searchIcon" />
          </form>
        </div>
        <Table
          headers={[
            "Sr. No.",
            "Product Id",
            "Name",
            "Price",
            "Category",
            "Stock",
          ]}
          contents={this.state.products}
        />
      </div>
    );
  }
}

export default withRouter(ProductsList);
