import React, { Component } from "react";
import Table from "../../components/table/table";
import "./transactions.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default class transactions extends Component {
  constructor() {
    super();
    this.state = {
      transactions: [
        {
          transactionId: "assdfdf",
          name: "Some Name",
          amount: 10000,
        },
        {
          transactionId: "assdfdf",
          name: "Some Name",
          amount: 10000,
        },
        {
          transactionId: "assdfdf",
          name: "Some Name",
          amount: 10000,
        },
        {
          transactionId: "assdfdf",
          name: "Some Name",
          amount: 10000,
        },
        {
          transactionId: "assdfdf",
          name: "Some Name",
          amount: 10000,
        },
        {
          transactionId: "assdfdf",
          name: "Some Name",
          amount: 10000,
        },
        {
          transactionId: "assdfdf",
          name: "Some Name",
          amount: 10000,
        },
        {
          transactionId: "assdfdf",
          name: "Some Name",
          amount: 10000,
        },
      ],
      searchBar: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="TransactionList App-content">
        <h1>Transactions</h1>
        <div className="section">
          <form className="search">
            <input
              type="search"
              name="searchBar"
              id="searchbar"
              value={this.state.searchBar}
              onChange={this.handleChange}
            />
            <FontAwesomeIcon icon={faSearch} className="searchIcon" />
          </form>
        </div>
        <Table
          headers={["Sr. No.", "Transaction Id", "Name", "Amount"]}
          contents={this.state.transactions}
        />
      </div>
    );
  }
}
