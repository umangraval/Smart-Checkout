import React, { Component } from "react";
import Button from "../../components/button/button";
import API from "../../API";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      access: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  async handleSubmit(e) {
    e.preventDefault();
    try {
      const { access, email } = this.state;
      await API.post("recovery/forgotpassword", {
        access: access,
        email: email,
      });
      
    } catch (err) {
      
    }
  }

  setAccess = (e) => {
    this.setState({
      access: e.target.value,
    });
  };

  render() {
    return (
      <div className="Form--Login">
        <div className="header">
          <h1 className="student" id="forgotpass">
            Forgot Password
          </h1>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              value={this.state.email}
              onChange={(e) => this.handleChange(e)}
            />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "50% 40%" }}>
            <select
              style={{
                minWidth: "50%",
                padding: "7px 12px",
                outline: "none",
                borderRadius: "10px",
              }}
              onChange={this.setAccess}
            >
              <option value="Vendor">Vendor</option>
              <option value="Customer">Customer</option>
            </select>
            <Button title="Reset" type="submit" />
          </div>
        </form>
      </div>
    );
  }
}

export default ForgotPassword;
