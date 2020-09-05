import React, { Component } from "react";
import "./addProduct.scss";

export default class addProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      category: "",
      price: 0,
      quantity: 0,
      image: "",
      categories: ["sasasd", "asdasd", "asdasd"],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="addProduct--wrapper">
        <div className="addProduct">
          <h1>Add Product</h1>
          <form onClick={(e) => e.preventDefault()}>
            <div className="add-img">
              <span>+</span>
            </div>
            <div>
              {" "}
              Name&nbsp;
              <input type="text" name="name" id="name" />
            </div>
            <div>
              <div style={{flexDirection:'row', justifyContent:'space-between'}} >
                {" "}
                Price&nbsp;
                <input type="number" name="price" id="price" />
                &nbsp;{" "}
                Stock&nbsp;
                <input type="number" name="qty" id="qty" />
								</div>
            </div>
            <select>
              <option value="none">Category</option>
              {this.state.categories.map((cat) => (
                <option value={cat}>{cat} </option>
              ))}
            </select>
            <div className="buttons">
              <button className="submit">Submit</button>
              <button
                className="cancel"
                onClick={() => this.props.toggleAddProduct()}
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
