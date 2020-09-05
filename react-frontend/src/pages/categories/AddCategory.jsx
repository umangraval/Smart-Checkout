import React, { Component } from "react";
import "./addCategory.scss";

export default class addCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="addCategory--wrapper">
        <div className="addCategory">
          <h1>Add Category</h1>
          <form onClick={(e) => e.preventDefault()}>
            <div>
              {" "}
              Name&nbsp;
              <input type="text" name="name" id="name" />
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
