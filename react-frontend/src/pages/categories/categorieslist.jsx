import React, { Component } from "react";
import Table from "../../components/table/table";
import "./categories.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

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
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="CategoryList App-content">
        <h1>Categories</h1>
        <div className="section">
          <button className="add-button">Add Category</button>
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
