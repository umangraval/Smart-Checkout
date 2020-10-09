import React, { Component } from "react";
import Table from "../../components/table/table";
import "./transactions.scss";
import API from '../../API';
import jwt from 'jsonwebtoken';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default class transactions extends Component {
  constructor() {
    super();
    this.state = {
      transactions: [],
      searchBar: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async componentDidMount() {
    const jwtoken = localStorage.getItem("JWToken");
    if (jwtoken === null) this.props.history.push("/login");
    const user = jwt.decode(jwtoken, process.env.REACT_APP_JWT_SECRET);
    const transactions = await API.get(`/transaction/all/${user.userId}`);
    console.log(transactions.data);
    this.setState({
      transactions: transactions.data.transaction.map((tran) => {
        return {
          id: tran._id,
          name: tran.title,
          amount: tran.amount
        };
      }),
    });
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
