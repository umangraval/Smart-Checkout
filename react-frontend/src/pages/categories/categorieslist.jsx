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
      filteredTable: [],
      searchBar: "",
    };
    this.toggleAddCategory = this.toggleAddCategory.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.updateCategories = this.updateCategories.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSearchChange(e) {
    const search = e.target.value.toLowerCase();
    this.setState({ searchBar: search });
    if (search.length > 0) {
      const categories = this.state.categories;
      const filteredTable = categories.filter(
        (pro) =>
          pro.name.toLowerCase().search(search) > -1
      );
      this.setState({ filteredTable, filtered: true });
    } else this.setState({ filtered: false });
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
          headers={["Sr. No.", "Category Id", "Name"]}
          contents={
            this.state.searchBar.length > 0
              ? this.state.filteredTable
              : this.state.categories
          }
          showDetails={() => {
            return;
          }}
        />
      </div>
    );
  }
}

export default withRouter(categorieslist);
