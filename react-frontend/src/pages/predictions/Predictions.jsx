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
import { Line, Scatter } from 'react-chartjs-2';

class Analysis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            starburst: [],
            lowCount: 0,
            midCount: 0,
            highCount: 0,
            customers: 0,
            sale: 0,
            salesLine: [],
            stock: [],
            salesPrediction: [],
            rxf: [],
            rxr: [],
            fxr: []
        };
    }

    plotGraphs(res) {
        Object.size = function (obj) {
            var size = 0,
                key;
            for (key in obj) {
                if (obj.hasOwnProperty(key)) size++;
            }
            return size;
        };
        var FreqRev = [];
        var RecRev = [];
        var RecFreq = [];
        var colorArr = [];
        var count = [0, 0, 0]
        var color = `rgba(114, 245, 66, 1)`
        var size = Object.size(res.data.Frequency)
        console.log(res.data.Frequency)
        for (var i = 0; i < size; i++) {
            FreqRev.push({ x: res.data.Frequency[i], y: res.data.Revenue[i] })
            RecRev.push({ x: res.data.Recency[i], y: res.data.Revenue[i] })
            RecFreq.push({ x: res.data.Recency[i], y: res.data.Frequency[i] })
            if (res.data.OverallScore[i] < 2) {
                color = `rgba(56,164,72, 1)`
                count[0]++;
            }
            else if (res.data.OverallScore[i] > 2 && res.data.OverallScore[i] < 4) {
                color = `rgba(216,88,119, 1)`
                count[1]++;
            }
            else {
                color = `rgba(227,184,75, 1)`
                count[2]++;
            }
            colorArr.push(color)
            this.setState({ lowCount: count[0] });
            this.setState({ midCount: count[1] });
            this.setState({ highCount: count[2] });
            this.setState({ customers: count[0] + count[1] + count[2] })
        }
        const data1 = {
            datasets: [
                {
                    label: "Frequency x Revenue",
                    data: FreqRev,
                    backgroundColor: colorArr,
                }
            ]
        }
        const data2 = {
            datasets: [
                {
                    label: "Recency x Revenue",
                    data: RecRev,
                    backgroundColor: colorArr,
                }
            ]
        }
        const data3 = {
            datasets: [
                {
                    label: "Recency x Frequency",
                    data: RecFreq,
                    backgroundColor: colorArr,
                }
            ]
        }
        this.setState({ fxr: data1 })
        this.setState({ rxr: data2 })
        this.setState({ rxf: data3 })
    }
    async componentDidMount() {
        try {
            const jwtoken = localStorage.getItem("JWToken");
            if (jwtoken === null) {
                this.props.history.push("/login");
                return;
            }
            const user = jwt.decode(jwtoken, process.env.REACT_APP_JWT_SECRET);
            console.log(user);
            axios.get(`http://localhost:5000/predictions/sales`).then(
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
                            return true;
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
            axios.get(`http://localhost:5000/predictions/rfr`).then(
                (res) => {
                    console.log(res)
                    if (res != null) {
                        this.plotGraphs(res);
                    }
                }
            )
        } catch (error) {
            this.props.setError(error);
        }
    }

    render() {
        const options = {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                        },
                    },
                ],
            },
        };
        // console.log(this.state.starburst);
        return (
            <div className="Analysis App-content">
                <div className="summary">
                    <div className="blocks tsale">
                        <FontAwesomeIcon className="icons" icon={faUser} />
                        <div>
                            <h4>Total customers</h4>
                            <h2>{this.state.customers}</h2>
                        </div>
                    </div>
                    <div className="blocks tpro">
                        <FontAwesomeIcon className="icons" icon={faBox} />
                        <div>
                            <h4>Low segment</h4>
                            <h2>{this.state.lowCount}</h2>
                        </div>
                    </div>
                    <div className="blocks tcat">
                        <FontAwesomeIcon className="icons" icon={faListAlt} />
                        <div>
                            <h4>Mid segment</h4>
                            <h2>{this.state.midCount}</h2>
                        </div>
                    </div>
                    <div className="blocks mcus">
                        <FontAwesomeIcon className="icons" icon={faChartLine} />
                        <div>
                            <h4>High Segment</h4>
                            <h2>{this.state.highCount} </h2>
                        </div>
                    </div>
                </div>
                {/* <div className="products">

				</div> */}

                <div className="graphs">
                    <div className="customergraph">
                        <Line data={this.state.salesPrediction} width={600} height={250} />
                    </div>
                    <div className="customergraph">
                        <Scatter data={this.state.rxf} options={options} width={600} height={250} />
                    </div>
                    <div className="customergraph">
                        <Scatter data={this.state.rxr} options={options} width={600} height={250} />
                    </div>
                    <div className="customergraph">
                        <Scatter data={this.state.fxr} options={options} width={600} height={250} />
                    </div>
                </div>
                <div className="details">
                    {/* todo details div */}
                </div>
            </div>
        );
    }
}

export default withRouter(Analysis);
