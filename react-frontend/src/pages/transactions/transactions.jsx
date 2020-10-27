import React, { Component } from "react";
import Table from "../../components/table/table";
import "./transactions.scss";
import API from "../../API";
import jwt from "jsonwebtoken";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "react-router-dom";

class transactions extends Component {
  constructor() {
    super();
    this.state = {
      transactions: [],
      filteredTable: [],
      searchBar: "",
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSearchChange(e) {
    const search = e.target.value.toLowerCase();
    this.setState({ searchBar: search });
    if (search.length > 0) {
      const transactions = this.state.transactions;
      const filteredTable = transactions.filter(
        (pro) =>
          pro.email.toLowerCase().search(search) > -1 ||
          pro.date.toLowerCase().search(search) > -1
      );
      this.setState({ filteredTable, filtered: true });
    } else this.setState({ filtered: false });
  }

  async componentDidMount() {
    try {
      const jwtoken = localStorage.getItem("JWToken");
      if (jwtoken === null) {
        this.props.history.push("/login");
        return;
      }
      const user = jwt.decode(jwtoken, process.env.REACT_APP_JWT_SECRET);
      const transactions = await API.get(`/transaction/all/${user.userId}`);
      this.setState({
        transactions: transactions.data.transaction.map((tran) => {
          return {
            id: tran._id,
            email: tran.buyeremail,
            price: tran.price,
            date: new Date(tran.date).toDateString(),
          };
        }),
      });
    } catch (error) {
      this.props.setError(error);
    }
  }

  render() {
    if (localStorage.getItem("JWToken") === null) return null;
    return (
      <div className="TransactionList App-content">
        <h1 style={{marginBottom: "100px"}}>Transactions</h1>
        <div className="section">
          <div className="search">
            <input
              type="text"
              name="searchBar"
              id="searchbar"
              value={this.state.searchBar}
              onChange={this.handleSearchChange}
            />
            <FontAwesomeIcon icon={faSearch} className="searchIcon" />
          </div>
        </div>
        <Table
          headers={["Sr. No.", "Transaction Id", "Email", "Amount", "Date"]}
          showDetails={() => {
            return;
          }}
          contents={
            this.state.searchBar.length > 0
              ? this.state.filteredTable
              : this.state.transactions
          }
        />
      </div>
    );
  }
}

export default withRouter(transactions);
