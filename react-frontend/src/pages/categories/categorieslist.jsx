import React, { Component } from "react";
import Table from "../../components/table/table";
import "./categories.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import AddCategory from "./AddCategory";
import API from "../../API";
import { withRouter } from "react-router-dom";
import jwt from "jsonwebtoken";

class categorieslist extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      searchBar: "",
    };
    this.toggleAddCategory = this.toggleAddCategory.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateCategories = this.updateCategories.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  updateCategories(cat) {
    const categories = this.state.categories;
    categories.push(cat);
    this.setState({
      categories: categories,
      addCategory: !this.state.addCategory,
    });
  }

  toggleAddCategory() {
    this.setState({
      addCategory: !this.state.addCategory,
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
      const categories = await API.get(`/category/all/${user.userId}`);
      this.setState({
        categories: categories.data.categories.map((cat) => {
          return {
            owner: cat._id,
            name: cat.tag,
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
      <div className="CategoryList App-content">
        {this.state.addCategory ? (
          <AddCategory
            setError={this.props.setError}
            toggleAddCategory={this.toggleAddCategory}
            updateCategories={this.updateCategories}
          />
        ) : null}
        <h1>Categories</h1>
        <div className="section">
          <button className="add-button" onClick={this.toggleAddCategory}>
            Add Category
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
          headers={["Sr. No.", "Category Id", "Name"]}
          contents={this.state.categories}
          showDetails={()=>{return}}
        />
      </div>
    );
  }
}

export default withRouter(categorieslist);
