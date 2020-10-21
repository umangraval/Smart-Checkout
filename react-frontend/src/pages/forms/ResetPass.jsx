import React, { Component } from "react";
import Button from "../../components/button/button";
import { Redirect } from "react-router-dom";
import API from "../../API";

class ResetPass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: false,
      password: "",
      confirmPass: "",
      access: "",
      redirect: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    
    const token = this.props.match.params.token;
    try {
      const res = await API.get(`recovery/resetpassword/${token}`);
      if (res.status === 200) {
        this.setState({ loading: false });
      }
    } catch (err) {
      this.setState({ loading: false, error: true });
      
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  async handleSubmit(e) {
    e.preventDefault();
    const res = await API.post("recovery/resetpassword", {
      access: this.state.access,
      password: this.state.password,
      confirm: this.state.confirmPass,
      token: this.props.match.params.token,
    });
    if (res.status === 200) {
      this.setState({
        redirect: true,
      });
    }
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/login" />;
    }
  };

  setAccess = (e) => {
    this.setState({
      access: e.target.value,
    });
  };

  render() {
    if (this.state.loading === true) {
      return <div>Loading...</div>;
    }
    if (this.state.error === true) {
      return <div>Your token is either invalid or expired</div>;
    }
    return (
      <div className="Form--Login">
        {this.renderRedirect()}
        <div className="header">
          <h1 className="student" id="forgotpass">
            Reset Password
          </h1>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={this.state.password}
              onChange={(e) => this.handleChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="confirmPass"
              id="confirmPass"
              placeholder="Confirm Password"
              onChange={(e) => this.handleChange(e)}
            />
          </div>
          <Button title="Reset" type="submit" />
        </form>
      </div>
    );
  }
}

export default ResetPass;
