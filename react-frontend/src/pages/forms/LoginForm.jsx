import React, { Component } from "react";
import Button from "../../components/button/button";

import API from "../../API";
import { withRouter, Link } from "react-router-dom";
import utils from "../../utils";

class LoginFrom extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const { isEmpty, getCurrentUser } = utils;
    if (isEmpty(this.props.user)) {
      const currentUser = await getCurrentUser();
      this.props.updateUser(currentUser);
      if (!isEmpty(currentUser)) this.props.history.push("/dashboard");
    } else this.props.history.push("/dashboard");
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
      localStorage.setItem('JWToken', data.token);
      this.props.history.push("/dashboard");
    } catch (error) {
      this.props.setError(error);
    }
  }

  render() {
    return (
      <div className="Form--Login">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <Button title="Login" type="submit" />
        </form>
        <p>
          Forgot Password?{" "}
          <Link to={"/resetpass"} style={{ textDecoration: "none" }}>
            <span>Reset</span>
          </Link>
        </p>
        <p>
          Don't have an account? <span onClick={this.redirect}>Signup</span>
        </p>
      </div>
    );
  }
}

export default withRouter(LoginFrom);
