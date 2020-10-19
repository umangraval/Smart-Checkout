/* eslint-disable no-throw-literal */
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// import Select from "react-select";

import Button from "../../components/button/button";
import API from "../../API";
import "./forms.scss";
// import utils from "../../utils";

class SignupForm extends Component {
  constructor() {
    super();
    this.state = {
      // access: "student",
      name: "",
      email: "",
      address: "",
      mobile: "",
      password: "",
      cnfpassword: null,
      shop: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  redirect() {
    this.props.history.push("/login");
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    try {
      const newUser = this.state;
      delete newUser['cnfpassword'];
      // if (newUser.password !== newUser.cnfpassword) {
      //   throw "Password and Confirm password not same";
      // }
      const { data } = await API.post("auth/add", newUser);
      this.props.updateUser(data);
      localStorage.setItem('JWToken', data.token);
      this.props.history.push("/dashboard");
    } catch (error) {
      this.props.setError(error);
    }
  }

  async componentDidMount() {
    if(localStorage.getItem('JWToken')!=null)
      this.props.history.push("/dashboard");
  }


  render() {
    return (
      <div className="Form">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              style={{ width: "50%" }}
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input
              style={{ width: "60%" }}
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input
              style={{ width: "45%" }}
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input
              style={{ width: "45%" }}
              type="password"
              name="cnfpassword"
              placeholder="Confirm Password"
              id="cnfpassword"
              value={this.state.cnfpassword}
              onChange={this.handleChange}
              className={
                this.state.password !== this.state.cnfpassword ? "notcnf" : ""
              }
            />
          </div>
          <div className="form-group">
            <input
              style={{ width: "50%" }}
              type="text"
              name="address"
              id="address"
              placeholder="Address"
              value={this.state.address}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input
              style={{ width: "50%" }}
              type="text"
              name="shop"
              id="shop"
              placeholder="Shop"
              value={this.state.shop}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input
              style={{ width: "50%" }}
              type="text"
              name="mobile"
              placeholder="Contact"
              id="mobile"
              value={this.state.mobile}
              onChange={this.handleChange}
            />
          </div>
          <Button title="Sign Up" type="submit" />
        </form>
        <p>
          Already Signed Up? <span onClick={this.redirect}>Login</span>
        </p>
      </div>
    );
  }
}

export default withRouter(SignupForm);
