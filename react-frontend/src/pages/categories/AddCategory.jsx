import React, { Component } from "react";
import "./addCategory.scss";
import API from "../../API";
import jwt from "jsonwebtoken";

export default class addCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async onSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await API.post(`/category/add/`, {
        owner: jwt.decode(localStorage.getItem("JWToken")).userId,
        tag: this.state.name,
      });
      this.props.updateCategories({
        id: data.category._id,
        name: data.category.tag,
      });
      console.log(data);
    } catch (error) {
      this.props.setError(error)
    }
  }

  render() {
    return (
      <div className="addCategory--wrapper">
        <div className="addCategory">
          <h1>Add Category</h1>
          <form onSubmit={this.onSubmit}>
            <div>
              {" "}
              Name&nbsp;
              <input
                onChange={this.handleChange}
                type="text"
                name="name"
                id="name"
              />
            </div>
            <div className="buttons">
              <button className="submit">Submit</button>
              <button
                className="cancel"
                onClick={() => this.props.toggleAddCategory()}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
