/* eslint-disable no-throw-literal */
import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";

import API from "../../API";
import "./forms.scss";


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
      password2: null,
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
      if (newUser.password !== newUser.password2) {
        throw "Password and Confirm password not same";
      }
      delete newUser['password2'];
      const { data } = await API.post("auth/add", newUser);
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
      <div className="container--signup">
        <h2 className="signup">SIGN UP</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            className="input"
            type="text"
            placeholder="Name"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <br />
          <input
            className="input"
            type="email"
            placeholder="Email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <br />
          <input
            className="input"
            type="password"
            placeholder="Password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <br />
          <input
            className="input"
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={this.state.password2}
            onChange={this.handleChange}
          />
          <br />
          <input
            className="input"
            type="tek"
            placeholder="Mobile Number"
            name="mobile"
            value={this.state.mobile}
            onChange={this.handleChange}
          />
          <br />
          <input
            className="input"
            type="text"
            placeholder="Shop"
            name="shop"
            value={this.state.shop}
            onChange={this.handleChange}
          />
          <br />
          <input
            className="input"
            type="address"
            placeholder="Address"
            name="address"
            value={this.state.address}
            onChange={this.handleChange}
          />
          <br />
          <button type="submit" className="button">
            Signup
          </button>
        </form>
        <p>Already have an Account ? </p>
        <Link className="routeButton" to="/Login"> Login </Link>
      </div>
    );
  }
}

export default withRouter(SignupForm);
