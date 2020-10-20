import React, { Component } from "react";
import jwt from "jsonwebtoken";
import API from "../../API";
import "./profile.scss";

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      userProfile: {
        name: "",
        email: "",
        shop: "",
        address: "",
        avatar: "",
        mobile: "",
      },
    };
  }

  async componentDidMount() {
    try {
      const jwtoken = localStorage.getItem("JWToken");
      if (jwtoken === null) {
        this.props.history.push("/login");
        return;
      }
      const user = jwt.decode(jwtoken, process.env.REACT_APP_JWT_SECRET);
      const profile = await API.get(`auth/user/${user.userId}`);
      this.setState(profile.data);
    } catch (error) {
      this.props.setError(error);
    }
  }

  render() {
    const { userProfile } = this.state;
    return (
      <div className="Profile">
          <h1>Profile</h1>
          <div className="background">
					<div className="ProfileCard">
            <div className="avatar">
              <img src={userProfile.avatar} alt="avatar" />
            </div>
            <div className="details">
              <div className="Shop">
                <span>{userProfile.shop} </span>
              </div>
              <div className="Name">
                Name &nbsp;<span>{userProfile.name} </span>
              </div>
              <div>
                Shop Address{" "}
                <div className="Address">
                  <span>{userProfile.address} </span>
                </div>
              </div>
              <div className="Email">
                Email &nbsp;<span>{userProfile.email} </span>
              </div>
              <div className="Mobile">
                Mobile &nbsp;<span>{userProfile.mobile} </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
