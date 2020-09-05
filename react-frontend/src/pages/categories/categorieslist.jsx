import React, { Component } from "react";
import Table from "../../components/table/table";
import "./categories.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import AddCategory from './AddCategory';

export default class categorieslist extends Component {
  constructor() {
    super();
    this.state = {
      categories: [
        {
          categoryId: "sdasd",
          name: "CatName",
        },
        {
          categoryId: "sdasd",
          name: "CatName",
        },
        {
          categoryId: "sdasd",
          name: "CatName",
        },
        {
          categoryId: "sdasd",
          name: "CatName",
        },
        {
          categoryId: "sdasd",
          name: "CatName",
        },
        {
          categoryId: "sdasd",
          name: "CatName",
        },
        {
          categoryId: "sdasd",
          name: "CatName",
        },
        {
          categoryId: "sdasd",
          name: "CatName",
        },
        {
          categoryId: "sdasd",
          name: "CatName",
        },
        {
          categoryId: "sdasd",
          name: "CatName",
        },
      ],
      searchBar: "",
    };
    this.toggleAddCategory = this.toggleAddCategory.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  toggleAddCategory() {
    this.setState({
      addCategory: !this.state.addCategory,
    });
  }

  render() {
    return (
      <div className="CategoryList App-content">
        {this.state.addCategory ? (
          <AddCategory toggleAddCategory={this.toggleAddCategory} />
        ) : null}
        <h1>Categories</h1>
        <div className="section">
          <button className="add-button" onClick={this.toggleAddCategory} >Add Category</button>
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
            "Category Id",
            "Name"
          ]}
          contents={this.state.categories}
        />
      </div>
    );
  }
}
