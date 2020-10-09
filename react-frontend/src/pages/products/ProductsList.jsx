import React, { Component } from "react";
import AddProduct from "./addProduct";
import Table from "../../components/table/table";
import "./productlist.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import API from '../../API';
import { withRouter } from "react-router-dom";

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
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  toggleAddProduct() {
    this.setState({
      addProduct: !this.state.addProduct,
    });
  }

  async componentDidMount() {
    if(localStorage.getItem('JWToken')===null)
      this.props.history.push('/login');
    const products = await API.get('product/all/');
    this.setState({
      products: products.data
    })
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

export default withRouter(ProductsList)