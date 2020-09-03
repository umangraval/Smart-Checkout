/* eslint-disable no-throw-literal */
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// import Select from "react-select";

import Button from "../../components/button/button";
import API from "../../API";
import "./forms.scss";
import utils from "../../utils";

class SignupForm extends Component {
  constructor() {
    super();
    this.state = {
      access: "student",
      name: "",
      email: "",
      address: "",
      contact: "",
      est: "",
      estStudents: "",
      regno: "",
      password: "",
      cnfpassword: "",
      classid: "",
      schoolid: "",
      schoolList: [],
      classList: [],
      referralCode: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeAccess = this.changeAccess.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  redirect() {
    this.props.history.push("/login");
  }

  async handleSelectChange(value, { action, removedValue }) {
    this.setState({ [value.name]: value.value });
    if (value.name === "schoolid") {
      try {
        const { data } = await API.get(`auth/${value.value}`);
        this.setState({
          classList: data,
        });
      } catch (error) {
        this.props.setError(error);
      }
    }
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    try {
      const newUser = this.state;
      if (newUser.password !== newUser.cnfpassword) {
        throw "Password and Confirm password not same";
      }
      const { data } = await API.post("auth/register", newUser);
      this.props.updateUser(data);
      this.props.history.push("/dashboard");
    } catch (error) {
      this.props.setError(error);
    }
  }

  async componentDidMount() {
    try {
      const { isEmpty, getCurrentUser } = utils;
      if (isEmpty(this.props.user)) {
        const currentUser = await getCurrentUser();
        this.props.updateUser(currentUser);
        if (!isEmpty(currentUser)) this.props.history.push("/dashboard");
      } else this.props.history.push("/dashboard");

      const { data } = await API.get("auth/listschools");
      this.setState({
        schoolList: data,
      });
    } catch (error) {
      this.props.setError(error);
    }
  }

  changeAccess(e) {
    this.setState({
      access: e.target.id,
    });
  }

  render() {
    return (
      <div className="Form">
        {/* <button title="LogOut" onClick={this.handleLogout}>
          {" "}
        </button> */}

        {/* <div className="header">
          <h1
            onClick={this.changeAccess}
            className={this.state.access === "student" ? "" : "not-active"}
            id="student"
          >
            Student
          </h1>
          <h1
            onClick={this.changeAccess}
            className={this.state.access === "teacher" ? "" : "not-active"}
            id="teacher"
          >
            Teacher
          </h1>
        </div> */}

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
          {/* <div className="form-group">
            <Select
              className="Form--Select"
              placeholder="Select School"
              options={this.state.schoolList.map((school) => {
                return {
                  label: school.name,
                  value: school._id,
                  name: "schoolid",
                };
              })}
              onChange={this.handleSelectChange}
              name="schoolid"
            />
            {this.state.access !== "student" ? null : (
              <div>
                <Select
                  className="Form--Select"
              placeholder="Select Class"
                  options={this.state.classList.map((className) => {
                    return {
                      label: className.classname,
                      value: className._id,
                      name: "classid",
                    };
                  })}
                  isDisabled={this.state.schoolid.length === 0}
                  onChange={this.handleSelectChange}
                />
                <input
                  style={{ width: "40%" }}
                  type="text"
                  name="regno"
                  id="regno"
                  placeholder="Roll no."
                  value={this.state.regno}
                  onChange={this.handleChange}
                />
              </div>
            )}
          </div> */}
          <div className="form-group">
            <input
              style={{ width: "50%" }}
              type="text"
              name="referralCode"
              id="referralCode"
              placeholder="Referral Code"
              value={this.state.referralCode}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input
              style={{ width: "50%" }}
              type="text"
              name="contact"
              placeholder="Contact"
              id="contact"
              value={this.state.contact}
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
