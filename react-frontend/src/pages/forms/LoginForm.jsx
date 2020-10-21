import React, { Component } from "react";
// import Button from "../../components/button/button";
import './login.scss'

import API from "../../API";
import { withRouter, Link } from "react-router-dom";

class LoginFrom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  async componentDidMount() {
    if (localStorage.getItem("JWToken") != null)
      this.props.history.push("/dashboard");
  }

  redirect() {
    this.props.history.push("/signup");
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  changeAccess(e) {
    this.setState({
      access: e.target.id,
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const loginUser = this.state;
    try {
      const { data } = await API.post("/auth/login", loginUser);
      console.log(data);
      localStorage.setItem("JWToken", data.token);
      this.props.history.push("/dashboard");
    } catch (error) {
      this.props.setError(error);
    }
  }

  render() {
    return (
      <div className="container">
        <h1 className="login"> LOGIN </h1>
        {/* <p className="para"> I am </p> */}

        <form onSubmit={this.handleSubmit}>
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
          <Link to="/forgot" className="forgotPassword">
            {" "}
            Forgot Password ?{" "}
          </Link>
          <button type="submit" className="button">
            Login
          </button>
        </form>

        <p> Do not have an Account ? </p>
        <Link className="routeButton" to="/SignUp">
          {" "}
          SignUp{" "}
        </Link>
      </div>
    );
  }
}

export default withRouter(LoginFrom);
