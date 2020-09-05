import React, { Component } from "react";
import AddProduct from "./addProduct";
import Table from "../../components/table/table";
import "./productlist.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default class ProductsList extends Component {
  constructor() {
    super();
    this.state = {
      products: [
        {
          productId: "adasd",
          name: "TestName",
          price: 300,
          category: "Food",
          stock: 55,
        },
        {
          productId: "adasd",
          name: "TestName",
          price: 300,
          category: "Food",
          stock: 55,
        },
        {
          productId: "adasd",
          name: "TestName",
          price: 300,
          category: "Food",
          stock: 55,
        },
        {
          productId: "adasd",
          name: "TestName",
          price: 300,
          category: "Food",
          stock: 55,
        },
        {
          productId: "adasd",
          name: "TestName",
          price: 300,
          category: "Food",
          stock: 55,
        },
        {
          productId: "adasd",
          name: "TestName",
          price: 300,
          category: "Food",
          stock: 55,
        },
      ],
      searchBar: "",
      addProduct: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.toggleAddProduct = this.toggleAddProduct.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  toggleAddProduct() {
    this.setState({
      addProduct: !this.state.addProduct,
    });
  }

  render() {
    return (
      <div className="ProductList App-content">
        {this.state.addProduct ? (
          <AddProduct toggleAddProduct={this.toggleAddProduct} />
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
