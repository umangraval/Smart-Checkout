import React, { Component } from "react";
import AddProduct from "./addProduct";
import ProductDetails from "./ProductDetails";
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
      showDetails: false,
      detailsId: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.toggleAddProduct = this.toggleAddProduct.bind(this);
    this.updateNewProduct = this.updateNewProduct.bind(this);
    this.showDetails = this.showDetails.bind(this);
    this.updateProductList = this.updateProductList.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  toggleAddProduct() {
    this.setState({
      addProduct: !this.state.addProduct,
    });
  }

  updateNewProduct(product) {
    const products = this.state.products;
    products.push(product);
    this.setState({
      products: products,
      addProduct: !this.state.addProduct,
    });
  }

  updateProductList(id, del, data) {
    const products = this.state.products;
    const indx = products.map((_, i) => i).filter((i) => products[i].id === id);
    if (del) products.splice(indx, 1);
    else {
      products[indx]={
        id,
        name: data.name,
        price: data.price,
        category: data.category,
        quantity: data.quantity,
      }
    }
    this.setState({
      products: products,
    });
  }

  async showDetails(id) {
    this.setState({
      showDetails: true,
      detailsId: id,
    });
  }

  async componentDidMount() {
    try {
      const jwtoken = localStorage.getItem("JWToken");
      if (jwtoken === null) {
        this.props.history.push("/login");
        return;
      }
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
    } catch (error) {
      this.props.setError(error);
    }
  }

  render() {
    if (localStorage.getItem("JWToken") === null) return null;
    return (
      <div className="ProductList App-content">
        {this.state.showDetails ? (
          <ProductDetails
            handleCancel={() => this.setState({ showDetails: false })}
            id={this.state.detailsId}
            setError={this.props.setError}
            updateProductList={this.updateProductList}
          />
        ) : null}
        {this.state.addProduct ? (
          <AddProduct
            toggleAddProduct={this.toggleAddProduct}
            updateProduct={this.updateNewProduct}
            setError={this.props.setError}
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
          showDetails={this.showDetails}
          contents={this.state.products}
        />
      </div>
    );
  }
}

export default withRouter(ProductsList);
