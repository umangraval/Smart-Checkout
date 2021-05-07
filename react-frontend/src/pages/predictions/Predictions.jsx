import React, { Component } from "react";
import jwt from "jsonwebtoken";
import "./Predictions.scss";
import { withRouter } from "react-router-dom";
// import API from "../../API";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faListAlt,
    faChartLine,
    faBox,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Line } from 'react-chartjs-2';

class Analysis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            starburst: [],
            totalProducts: 0,
            totalCategories: 0,
            sale: 0,
            salesLine: [],
            customers: 0,
            stock: [],
            salesPrediction: []
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

            axios.get('http://localhost:5000/predictions/sales').then(
                (res) => {
                    console.log(res)
                    let lableArr = []
                    let valueArr = []
                    if (res != null) {
                        console.log(res.data.data)
                        let sprediction = res.data.data;

                        console.log(sprediction)
                        sprediction.map(item => {
                            lableArr.push(item.date)
                            valueArr.push(item.pred_value)
                        })

                        const data = {
                            labels: lableArr,
                            datasets: [
                                {
                                    label: '# of sales',
                                    data: valueArr,
                                    fill: false,
                                    backgroundColor: 'rgb(255, 99, 132)',
                                    borderColor: 'rgba(255, 99, 132, 0.2)',
                                },
                            ],
                        };
                        this.setState({ salesPrediction: data })
                    }
                }
            )
        } catch (error) {
            this.props.setError(error);
        }
    }

    render() {
        // console.log(this.state.starburst);
        return (
            <div className="Analysis App-content">
                <div className="summary">
                    <div className="blocks tsale">
                        <FontAwesomeIcon className="icons" icon={faChartLine} />
                        <div>
                            <h4>Total Sale</h4>
                            <h2>₹{this.state.sale}</h2>
                        </div>
                    </div>
                    <div className="blocks tpro">
                        <FontAwesomeIcon className="icons" icon={faBox} />
                        <div>
                            <h4>Total Products</h4>
                            <h2>{this.state.totalProducts}</h2>
                        </div>
                    </div>
                    <div className="blocks tcat">
                        <FontAwesomeIcon className="icons" icon={faListAlt} />
                        <div>
                            <h4>Total Categories</h4>
                            <h2>{this.state.totalCategories}</h2>
                        </div>
                    </div>
                    <div className="blocks mcus">
                        <FontAwesomeIcon className="icons" icon={faUser} />
                        <div>
                            <h4>Customers</h4>
                            <h2>{this.state.customers} </h2>
                        </div>
                    </div>
                </div>
                {/* <div className="products">

				</div> */}

                <div className="graphs">
                    <div className="salesgraph">
                        <Line data={this.state.salesPrediction} />
                    </div>
                    <div className="customergraph">
                        <Line data={this.state.salesPrediction} />
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Analysis);
