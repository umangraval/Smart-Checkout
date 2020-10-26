import React, { Component } from "react";
import "./App.scss";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import ErrorPopup from './components/error_pop_up/ErrorPopup';
import LoginForm from "./pages/forms/LoginForm";
import ForgotPassword from "./pages/forms/forgotPassword";
import SignupForm from "./pages/forms/SignupForm";
import SideBar from "./components/sidebar/sidebar";
import ProductList from "./pages/products/ProductsList";
import CategoryList from "./pages/categories/categorieslist";
import Transactions from './pages/transactions/transactions';
import Analysis from './pages/analysis/Analysis';
import Overview from './pages/overview/Overview';
import Profile from './pages/profile/Profile';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      error: undefined,
      activeClass: undefined,
    };
    this.setError = this.setError.bind(this);
    this.clearError = this.clearError.bind(this);
  }

  // updateUser(user) {
  //   this.setState({ user });
  // }

  setError(error) {
    this.setState({ error });
  }

  clearError() {
    this.setState({ error: null });
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <ErrorPopup error={this.state.error} clearError={this.clearError} />
          <Switch>
          <Route
              exact
              path="/"
              render={() => (
                <div className="App-grid-container">
                  <SideBar className="App-sidebar" />
                  <Overview
                    className="App-content"
                    setError={this.setError}
                  />
                </div>
              )}
            />
            <Route
              exact
              path="/login"
              render={() => (
                <div>
                  <LoginForm
                    setError={this.setError}
                    updateUser={this.updateUser}
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
                  />
                </div>
              )}
            />
            <Route
              exact
              path="/dashboard"
              render={() => (
                <div className="App-grid-container">
                  <SideBar className="App-sidebar" />
                  <Overview
                    className="App-content"
                    setError={this.setError}
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
                  />
                </div>
              )}
            />
            <Route
              exact
              path="/categories"
              render={() => (
                <div className="App-grid-container">
                  <SideBar className="App-sidebar" />
                  <CategoryList
                    className="App-content"
                    setError={this.setError}
                  />
                </div>
              )}
            />
            <Route
              exact
              path="/transactions"
              render={() => (
                <div className="App-grid-container">
                  <SideBar className="App-sidebar" />
                  <Transactions
                    className="App-content"
                    setError={this.setError}
                  />
                </div>
              )}
            />
            <Route
              exact
              path="/analytics"
              render={() => (
                <div className="App-grid-container">
                  <SideBar className="App-sidebar" />
                  <Analysis
                    className="App-content"
                    setError={this.setError}
                  />
                </div>
              )}
            />
            <Route
              exact
              path="/profile"
              render={() => (
                <div className="App-grid-container">
                  <SideBar className="App-sidebar" />
                  <Profile
                    className="App-content"
                    setError={this.setError}
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
