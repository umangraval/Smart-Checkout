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
import { Bar, Line, Scatter } from 'react-chartjs-2';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";

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
            fxr: [],
            ltvData: []
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

    plotLtv(res) {
        Object.size = function (obj) {
            var size = 0,
                key;
            for (key in obj) {
                if (obj.hasOwnProperty(key)) size++;
            }
            return size;
        };
        var size = Object.size(res.data.Segment);
        var high = 0;
        var low = 0;
        var mid = 0;
        for (var i = 0; i < size; i++) {
            console.log(res.data.Segment[i])
            if (res.data.Segment[i] === "High-Value") {
                high++;
            }
            else if (res.data.Segment[i] === "Mid-Value") {
                mid++;
            }
            else {
                low++;
            }
        }
        var dataArr = []
        dataArr.push(low)
        dataArr.push(mid);
        dataArr.push(high);
        console.log(dataArr)

        var data = {
            labels: ["Low Value", "Mid Value", "High Value"],
            datasets: [
                {
                    label: "lifetime value",
                    data: dataArr,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                    ],
                    borderWidth: 1,

                }

            ]
        }
        this.setState({ ltvData: data })
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
            axios.get(`https://smartcheckout.tech/model/predictions/sales`).then(
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
            axios.get(`https://smartcheckout.tech/model/predictions/rfr`).then(
                (res) => {
                    console.log(res)
                    if (res != null) {
                        this.plotGraphs(res);
                    }
                }
            )

            axios.get('http://localhost:5000/predictions/ltv').then(
                res => {
                    console.log(res)
                    if (res != null) {
                        this.plotLtv(res);
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

        const responsive = {
            superLargeDesktop: {
                // the naming can be any, depends on you.
                breakpoint: { max: 4000, min: 3000 },
                items: 1
            },
            desktop: {
                breakpoint: { max: 3000, min: 1024 },
                items: 1
            },
            tablet: {
                breakpoint: { max: 1024, min: 464 },
                items: 1
            },
            mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 1
            }
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
                <div className="graphs">
                    <Carousel responsive={responsive}>
                        <Line data={this.state.salesPrediction} className="customergraph" />
                        <Bar data={this.state.ltvData} options={options} className="customergraph" />
                        <Scatter data={this.state.rxf} options={options} className="customergraph" />
                        <Scatter data={this.state.fxr} options={options} className="customergraph" />
                        <Scatter data={this.state.rxr} options={options} className="customergraph" />
                    </Carousel>
                </div>
            </div >
        );
    }
}

export default withRouter(Analysis);
