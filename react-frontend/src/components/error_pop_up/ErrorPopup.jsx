/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from "react";
import isEmpty from "../../utils/isEmpty";
import "./errorPopUp.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

export default class ErrorPopup extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidUpdate() {
    if (!isEmpty(this.props.error)) {
      setTimeout(() => {
        this.props.clearError();
      }, 2000);
    }
  }

  render() {
    const { error } = this.props;
    if (isEmpty(error)) return null;

    let message = "Something Went Wrong!";
    try {
      if (typeof error === "string") {
        message = error;
      } else if (!isEmpty(error.response.data)) {
        if (!isEmpty(error.response.data.errors))
          message = error.response.data.errors.message;
      }
    } catch (err) {
      console.error(error);
    }

    return isEmpty(error) ? null : (
      <div className="errpopup--wrapper">
        <div className="errpopup">
          <div className="errpopup__symbol">
            <FontAwesomeIcon icon={faTimesCircle} />
          </div>
          <div className="errpopup__message">{message}</div>
        </div>
      </div>
    );
  }
}
// export default withRouter(ErrorPopup);
