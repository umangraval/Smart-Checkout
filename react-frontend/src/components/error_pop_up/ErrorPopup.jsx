/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
// import { withRouter } from 'react-router-dom';
import isEmpty from '../../utils/isEmpty';
import './errorPopUp.scss'

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

    let message = 'Something Went Wrong!';
    try {
      if (typeof error === 'string') {
        message = error;
      } else if (!isEmpty(error.response.data)) {
        message = error.response.data.error;
      }
    } catch (err) {
      console.error(error);
    }

    return isEmpty(error) ? null : (
      <div className="errpopup--wrapper">
        <div className="errpopup">
          <div className="errpopup__symbol">
            <i className="fa fa-times-circle" />
          </div>
          <div className="errpopup__message">{message}</div>
        </div>
      </div>
    );
  }
}
// export default withRouter(ErrorPopup);
