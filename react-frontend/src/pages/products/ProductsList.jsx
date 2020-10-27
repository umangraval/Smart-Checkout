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
      filteredTable: [],
      categories: [],
      filtered: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleCatgoryChange = this.handleCatgoryChange.bind(this);
    this.toggleAddProduct = this.toggleAddProduct.bind(this);
    this.updateNewProduct = this.updateNewProduct.bind(this);
    this.showDetails = this.showDetails.bind(this);
    this.updateProductList = this.updateProductList.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSearchChange(e) {
    const search = e.target.value.toLowerCase();
    this.setState({ searchBar: search });
    if (search.length > 0) {
      const products = this.state.products;
      const filteredTable = products.filter(
        (pro) =>
          pro.name.toLowerCase().search(search) > -1 ||
          pro.category.search(search) > -1
      );
      this.setState({ filteredTable, filtered: true });
    } else this.setState({ filtered: false });
  }

  handleCatgoryChange(e) {
    const category = e.target.value;
    if (category === "") this.setState({ filtered: false });
    else {
      const filteredTable = this.state.products.filter(
        (pro) => pro.category === category
      );
      this.setState({
        filteredTable,
        filtered: true,
      });
    }
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
      products[indx] = {
        id,
        name: data.name,
        price: data.price,
        category: data.category,
        quantity: data.quantity,
      };
    }
    this.setState({
      products: products,
      showDetails: del ? !this.state.showDetails : this.state.showDetails,
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
      const categories = await API.get(`/category/all/${user.userId}`);
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
        categories: categories.data.categories.map((cat) => {
          return cat.tag;
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
        <h1 style={{marginBottom: "100px"}}>Products</h1>
        <div className="section">
          <button className="add-button" onClick={this.toggleAddProduct}>
            Add Product
          </button>
          <div className="filter">
            <select onChange={this.handleCatgoryChange} name="category">
              <option value="">Category</option>
              {this.state.categories.map((cat) => (
                <option onChange={this.handleCatgoryChange} value={cat}>
                  {cat}{" "}
                </option>
              ))}
            </select>
          </div>
          <div className="search">
            <input
              type="text"
              name="searchBar"
              id="searchbar"
              value={this.state.searchBar}
              onChange={this.handleSearchChange}
            />
            <FontAwesomeIcon icon={faSearch} className="searchIcon" />
          </div>
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
          contents={
            this.state.filtered ? this.state.filteredTable : this.state.products
          }
        />
      </div>
    );
  }
}

export default withRouter(ProductsList);
