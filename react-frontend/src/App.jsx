import React, { Component } from "react";
import "./App.scss";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import isEmpty from "./utils/isEmpty";
import getCurrentUser from "./utils/getCurrentUser";
import LoginForm from "./pages/forms/LoginForm";
import ForgotPassword from "./pages/forms/forgotPassword";
import SignupForm from "./pages/forms/SignupForm";
import SideBar from "./components/sidebar/sidebar";
import ProductList from './pages/products/ProductsList';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      user: undefined,
      error: undefined,
      activeClass: undefined,
    };
    this.setError = this.setError.bind(this);
    this.clearError = this.clearError.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  updateUser(user) {
    this.setState({ user });
  }

  setError(error) {
    this.setState({ error });
  }

  clearError() {
    this.setState({ error: null });
  }

  async componentDidMount() {
    if (isEmpty(this.props.user)) {
      const currentUser = await getCurrentUser();
      this.updateUser(currentUser);
    }
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/login"
              render={() => (
                <div>
                  <LoginForm
                    setError={this.setError}
                    updateUser={this.updateUser}
                    user={this.user}
                  />
                </div>
              )}
            />
            <Route
              exact
              path="/signup"
              render={() => (
                <div>
                  <SignupForm
                    setError={this.setError}
                    updateUser={this.updateUser}
                    user={this.user}
                  />
                </div>
              )}
            />
            <Route
              exact
              path="/resetpass"
              render={() => (
                <div>
                  <ForgotPassword
                    setError={this.setError}
                    user={this.state.user}
                  />
                </div>
              )}
            />
            <Route
              exact
              path="/products"
              render={() => (
                <div className="App-grid-container">
                  <SideBar className="App-sidebar" />
                  <ProductList 
                    className="App-content"
                    setError={this.setError}
                    user={this.state.user}
                  />
                </div>
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
