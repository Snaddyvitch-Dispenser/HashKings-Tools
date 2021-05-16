import Head from 'next/head'
import {Box, Button, Container, Grid, Paper, TextField, Typography} from "@material-ui/core";
import React from 'react';
import axios from "axios";
import styles from "../styles/BudsToMota.module.scss";
import {ArrowDownward} from "@material-ui/icons";

export default class LevelUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {orders: [], quantityPooled: 0, amountInput: 0, amountOutput: 0, startPrice: 0, slippage: "0%", date: new Date()}
        this.interval = setInterval(() => {
            this.setState({date: new Date()});
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    async componentDidMount() {
        try {
            let timeAtStartOfToday = new Date(); timeAtStartOfToday.setUTCHours(0,0,0,0);

            let result = await axios.get("https://enginehistory.ryamer.com/accountHistory?account=hk-buds&symbol=BUDS");

            let orders = result.data;

            let filteredOrders = [];

            for (let i = 0; i < orders.length; i++) {
                if (orders[i].timestamp > Math.floor(timeAtStartOfToday.getTime() / 1000.0)) {
                    filteredOrders.push(orders[i]);
                }
            }

            let total = filteredOrders.reduce((total, value) => {return (parseInt(total) || 0) + parseInt(value.quantity);})

            let currentPrice = 1000.0 / total;

            this.setState({orders: filteredOrders, quantityPooled: total, startPrice: currentPrice});
        } catch (ignored) {}
    }

    timeToString(date) {
        return date.getUTCHours().toString().padStart(2, "0") + ":" + date.getUTCMinutes().toString().padStart(2, "0") + ":" + date.getUTCSeconds().toString().padStart(2, "0");
    }

    onChangedInput = event => {
        try {
            if (this.validate3dpNumber(event.target.value)) {
                let value = event.target.value || 0.00.toFixed(3);

                let output = (1000.0 * (parseFloat(value || 0) / (parseFloat(value || 0) + this.state.quantityPooled))).toFixed(3);

                this.setState({amountInput: event.target.value, amountOutput: Number(output), ...this.calculateSlippage(event.target.value)});
            }
        } catch (ignored) {}
    }

    estimateInput = (output) => {
        if (output === "" || output === 0 || output === "0.000") return "";

        let inputEstimate = Number((output / 1000.0 * this.state.quantityPooled).toFixed(3));

        let differenceLast = 1000;

        while (differenceLast > 0.001) {
            let last = inputEstimate;
            inputEstimate = Number((output / 1000.0  * (this.state.quantityPooled + inputEstimate)).toFixed(3));

            differenceLast = Math.abs(last - inputEstimate);
        }

        return inputEstimate;
    }

    validate3dpNumber = value => {
        // noinspection EqualityComparisonWithCoercionJS
        return parseInt(value) == value || parseFloat(value).toFixed(3) == value || parseFloat(value).toFixed(1) == value || parseFloat(value).toFixed(2) == value || value === "";
    }

    calculateSlippage(quantity) {
        if (parseFloat(quantity) > 0) {
            let newRate = 1000.0 / (parseFloat(this.state.quantityPooled) + parseFloat(quantity));
            let slippage = ((1.0 - (newRate / this.state.startPrice)) * 100).toFixed(2) + "%";

            return {slippage};
        }

        return "";
    }

    onChangedOutput = event => {
        try {
            if (this.validate3dpNumber(event.target.value)) {
                if ((event.target.value || 0) <= 999) {
                    let value = event.target.value || 0.00.toFixed(3);

                    let input = this.estimateInput(value);
                    this.setState({amountOutput: event.target.value, amountInput: input, ...this.calculateSlippage(input)});
                }
            }
        } catch (ignored) {}
    }

    render() {
        return (
            <>
                <Head>
                    <title>BUDS to MOTA | HashKings Tools</title>
                    <meta name="description" content="Tools to make playing HashKings Easier"/>
                    <link rel="icon" href="/favicon.ico"/>
                </Head>

                <main>
                    <Container className={styles.outerContainer}>
                        <Grid container className={styles.formContainer} justify={"center"} alignItems={"center"} spacing={3}>
                            <Grid item md={6} >
                                <Paper className={styles.paddedPaper}>
                                    <h1 className={styles.heading}>Buds to Mota Calculator</h1>
                                    <p className={styles.subheading}>Estimation Tool for converting Buds to Mota via the burn pool in HashKings.</p>
                                    <Box className={styles.currencyContainer}>
                                        <p>From</p>
                                        <Box className={styles.inputAndImage}>
                                            <TextField autoFocus={true} type={"text"} className={styles.input} onChange={this.onChangedInput} value={this.state.amountInput} />
                                            <img src="/buds.png" alt={"HashKings BUDS"} />
                                        </Box>
                                    </Box>
                                    <Box className={styles.buttonHolder}>
                                        <Button>
                                            <ArrowDownward />
                                        </Button>
                                    </Box>
                                    <Box className={styles.currencyContainer}>
                                        <p>To</p>
                                        <Box className={styles.inputAndImage}>
                                            <TextField type={"text"} className={styles.input} onChange={this.onChangedOutput} value={this.state.amountOutput} />
                                            <img src="/mota.png" alt={"HashKings MOTA"} />
                                        </Box>
                                    </Box>
                                    <p>Slippage: {this.state.slippage}</p>
                                    {/*<Button onClick={this.burnBuds} style={{backgroundColor: `#1993fb`, color: `#fff`, fontWeight: "bold", width: "100%", padding: "10px 20px", fontSize: "1.5em"}}>Burn Now</Button>*/}
                                    <p style={{fontSize: "1.3em", margin: "0"}}>{this.state.orders.length} Burns / {this.state.quantityPooled} BUDS</p>
                                    <Typography style={{margin: "0"}}>{this.state.orders.length === 500 ? "Couldn't load all burns for today. Data May be incorrect." : ""}</Typography>
                                    <Typography style={{margin: "5px 0 10px 0"}}>Pool Resets at UTC 00:00:00. Current Time UTC: {this.timeToString(this.state.date)}</Typography>
                                    <p style={{color: "darkred"}}>This tool isn't guaranteed to be accurate as more people can add to the pool and reduce the amount you'll recieve. I am not liable for any incorrect figures produced by this app!</p>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </main>
            </>
        );
    }
}
