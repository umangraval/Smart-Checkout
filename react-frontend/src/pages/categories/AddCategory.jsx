import React, { Component } from "react";
import "./addCategory.scss";
import API from "../../API";
import jwt from "jsonwebtoken";

export default class addCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.mode === "add" ? "" : props.name,
      mode: props.mode,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAddSubmit = this.handleAddSubmit.bind(this);
    this.handleEditSubmit = this.handleEditSubmit.bind(this);
    this.handelDelete = this.handelDelete.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async handleAddSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await API.post(`/category/add/`, {
        owner: jwt.decode(localStorage.getItem("JWToken")).userId,
        tag: this.state.name,
      });
      this.props.updateCategories(
        {
          id: data.category._id,
          name: data.category.tag,
        },
        "add"
      );
    } catch (error) {
      this.props.setError(error);
    }
  }

  async handleEditSubmit() {
    try {
      const { data } = await API.put(`/category/update/`, {
        _id: this.props.id,
        tag: this.state.name,
      });
      this.props.updateCategories(
        {
          id: this.props.id,
          name: data.category.tag,
        },
        "edit"
      );
    } catch (error) {
      this.props.setError(error);
    }
  }

  async handelDelete() {
    try {
      await API.delete(`/category/delete/${this.props.id}`, {
        id: this.props.id,
      });
      this.props.updateCategories(
        {
          id: this.props.id,
        },
        "delete"
      );
    } catch (error) {
      this.props.setError(error);
    }
  }

  render() {
    return (
      <div className="addCategory--wrapper">
        <div className="addCategory">
          <h1>Add Category</h1>
          <div
            className="form"
            handleAddSubmit={
              this.state.mode === "add"
                ? this.handleAddSubmit
                : this.handleEditSubmit
            }
          >
            {this.state.mode !== "view" ? (
              <div>
                {" "}
                Name&nbsp;
                <input
                  onChange={this.handleChange}
                  type="text"
                  name="name"
                  id="name"
                  value={this.state.name}
                />
              </div>
            ) : (
              <div>
                Name&nbsp;:<span id="name">{this.state.name}</span>
              </div>
            )}
            <div className="buttons">
              {this.state.mode === "view" ? (
                <button
                  className="edit"
                  onClick={(event) => {
                    event.preventDefault();
                    this.setState({ mode: "edit" });
                  }}
                >
                  Edit
                </button>
              ) : (
                <button
                  type="submit"
                  className="submit"
                  onClick={
                    this.state.mode === "add"
                      ? this.handleAddSubmit
                      : this.handleEditSubmit
                  }
                >
                  Submit
                </button>
              )}
              {this.state.mode === "view" ? (
                <button className="delete" onClick={this.handelDelete}>
                  Delete
                </button>
              ) : null}
              <button
                className="cancel"
                onClick={() =>
                  this.state.mode === "edit"
                    ? this.setState({ mode: "view" })
                    : this.props.toggleAddCategory()
                }
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
