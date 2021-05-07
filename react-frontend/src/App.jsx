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
import Profile from './pages/profile/Profile';
import Particles from 'react-particles-js';
import Predictions from "./pages/predictions/Predictions";

const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

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
        <Particles className='particles'
          params={particlesOptions}
        />

        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%"
          }}
        >
          <BrowserRouter>
            <ErrorPopup error={this.state.error} clearError={this.clearError} />
            <Switch>
              <Route
                exact
                path="/"
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
              {/* <Route
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
            /> */}
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
                path="/predictions"
                render={() => (
                  <div className="App-grid-container">
                    <SideBar className="App-sidebar" />
                    <Predictions
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
      </div>
    );
  }
}
