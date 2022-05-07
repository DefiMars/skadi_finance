import React, { useEffect, useState } from "react";
import "./calculator.scss";
import { useSelector, useDispatch } from "react-redux";
import { useWeb3Context } from "../../hooks";
import { Grid, InputAdornment, OutlinedInput, Zoom, Slider, Box, Paper } from "@material-ui/core";
import { IReduxState } from "../../store/slices/state.interface";
import { formatCurrency, formatNumber, trim } from "../../helpers";
import { Skeleton } from "@material-ui/lab";
import useTheme from "src/hooks/useTheme";
import { dark as darkTheme } from "src/themes/dark.js";
import { girth as gTheme } from "src/themes/girth.js";
import { light as lightTheme } from "src/themes/light.js";

function Calculator() {
  const isAppLoading = useSelector<IReduxState, boolean>(state => state.app.loading);
  const marketPrice = useSelector<IReduxState, number>(state => {
    return state.app.marketPrice;
  });
  const rebaseAPY = useSelector<IReduxState, number>(state => {
    return state.app.rebaseAPY;
  });
  const rebaseBalance = useSelector<IReduxState, string>(state => {
    return state.account.balances && state.account.balances.rebase;
  });

  const trimmedrebaseAPY = trim(rebaseAPY * 100, 1);
  const trimmedRebaseBalance = trim(Number(rebaseBalance), 2);
  const trimeMarketPrice = trim(marketPrice, 5);

  const [memoAmount, setMemoAmount] = useState(trimmedRebaseBalance);
  const [priceAtPurchase, setPriceAtPurchase] = useState(trimeMarketPrice);
  const [futureMarketPrice, setFutureMarketPrice] = useState(trimeMarketPrice);
  const [days, setDays] = useState(30);

  const [rewardsEstimation, setRewardsEstimation] = useState("0");
  const [potentialReturn, setPotentialReturn] = useState("0");
  let [theme, toggleTheme] = useTheme();

  const calcInitialInvestment = () => {
    const memo = Number(memoAmount) || 0;
    const price = parseFloat(priceAtPurchase) || 0;
    const amount = memo * price;
    return trim(amount, 2);
  };

  const calcCurrentWealth = () => {
    const memo = Number(memoAmount) || 0;
    const price = parseFloat(trimeMarketPrice);
    const amount = memo * price;
    return trim(amount, 2);
  };

  const [initialInvestment, setInitialInvestment] = useState(calcInitialInvestment());

  useEffect(() => {
    const newInitialInvestment = calcInitialInvestment();
    setInitialInvestment(newInitialInvestment);
  }, [memoAmount, priceAtPurchase]);

  const calcNewBalance = () => {
    let value = parseFloat(trimmedrebaseAPY) / 100;
    value = Math.pow(value - 1, 1 / (365 * 3)) - 1 || 0;
    let balance = Number(memoAmount);
    for (let i = 0; i < days * 3; i++) {
      balance += balance * value;
    }
    return balance;
  };

  useEffect(() => {
    const newBalance = calcNewBalance();
    setRewardsEstimation(trim(newBalance, 6));

    const newPotentialReturn = newBalance * (parseFloat(futureMarketPrice) || 0);
    setPotentialReturn(trim(newPotentialReturn, 2));
  }, [days, trimmedrebaseAPY, futureMarketPrice, memoAmount]);

  [theme, toggleTheme] = useTheme();
  let themeMode = theme === "light" ? lightTheme : theme === "dark" ? darkTheme : gTheme;

  return (


        <div className="calculator-view-dark"         style={{
          width: "100%",
          maxWidth: "833px",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          marginLeft: "auto",

          backgroundColor: "rgba(0,0,0,0)",
          padding:"10px"
        }}>
          <Paper style={{          borderRadius: "2%"}} >
          <Zoom in={true}>
            <div className="calculator-card">
              <Grid className="calculator-card-grid" container direction="column" spacing={2}>
                <Grid item>
                  <div className="calculator-card-header">
                    <p className="calculator-card-header-title">Calculator</p>
                    <p className="calculator-card-header-subtitle">Estimate your returns</p>
                  </div>
                </Grid>
                <Grid item>
                  <div className="calculator-card-metrics">
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={4} md={4} lg={4}>
                        <div className="calculator-card-apy">
                          <p className="calculator-card-metrics-title">SKADI Price</p>
                          <p className="calculator-card-metrics-value">
                            {isAppLoading ? (
                              <Skeleton width="100px" />
                            ) : (
                              `${formatCurrency(Number(trimeMarketPrice), 6)}`
                            )}
                          </p>
                        </div>
                      </Grid>
                      <Grid item xs={6} sm={4} md={4} lg={4}>
                        <div className="calculator-card-tvl">
                          <p className="calculator-card-metrics-title">APY</p>
                          <p className="calculator-card-metrics-value">
                            {isAppLoading ? (
                              <Skeleton width="100px" />
                            ) : (
                              <>{formatNumber(Number(trimmedrebaseAPY), 1)=="NaN" ? "0" : Number(trimmedrebaseAPY)}%</>
                            )}
                          </p>
                        </div>
                      </Grid>
                      <Grid item xs={6} sm={4} md={4} lg={4}>
                        <div className="calculator-card-index">
                          <p className="calculator-card-metrics-title">Your SKADI Balance</p>
                          <p className="calculator-card-metrics-value">
                            {isAppLoading ? <Skeleton width="100px" /> : <>{trimmedRebaseBalance} SKADI</>}
                          </p>
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>

                <div className="calculator-card-area">
                  <div>
                    <div className="calculator-card-action-area">
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <div className="calculator-card-action-area-inp-wrap">
                            <p className="calculator-card-action-area-inp-wrap-title">SKADI Amount</p>
                            <OutlinedInput
                              type="number"
                              placeholder="Amount"
                              className="calculator-card-action-input"
                              value={memoAmount}
                              onChange={e => setMemoAmount(e.target.value)}
                              labelWidth={0}
                              endAdornment={
                                <InputAdornment position="end">
                                  <div
                                    onClick={() => setMemoAmount(trimmedRebaseBalance)}
                                    className="stake-card-action-input-btn"
                                  >
                                    <p>Max</p>
                                  </div>
                                </InputAdornment>
                              }
                            />
                          </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <div className="calculator-card-action-area-inp-wrap">
                            <p className="calculator-card-action-area-inp-wrap-title">APY</p>
                            <OutlinedInput
                              type="number"
                              disabled={true}
                              placeholder="Amount"
                              className="calculator-card-action-input"
                              value={trimmedrebaseAPY}
                            />
                          </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <div className="calculator-card-action-area-inp-wrap">
                            <p className="calculator-card-action-area-inp-wrap-title" color="red">
                              SKADI price at purchase ($)
                            </p>
                            <OutlinedInput
                              type="number"
                              placeholder="Amount"
                              className="calculator-card-action-input"
                              value={priceAtPurchase}
                              onChange={e => setPriceAtPurchase(e.target.value)}
                              labelWidth={0}
                              endAdornment={
                                <InputAdornment position="end">
                                  <div
                                    onClick={() => setPriceAtPurchase(trimeMarketPrice)}
                                    className="stake-card-action-input-btn"
                                  >
                                    <p>Current</p>
                                  </div>
                                </InputAdornment>
                              }
                            />
                          </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <div className="calculator-card-action-area-inp-wrap">
                            <p className="calculator-card-action-area-inp-wrap-title">Future SKADI market price ($)</p>
                            <OutlinedInput
                              type="number"
                              placeholder="Amount"
                              className="calculator-card-action-input"
                              value={futureMarketPrice}
                              onChange={e => setFutureMarketPrice(e.target.value)}
                              labelWidth={0}
                              endAdornment={
                                <InputAdornment position="end">
                                  <div
                                    onClick={() => setFutureMarketPrice(trimeMarketPrice)}
                                    className="stake-card-action-input-btn"
                                  >
                                    <p>Current</p>
                                  </div>
                                </InputAdornment>
                              }
                            />
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                    <div className="calculator-days-slider-wrap">
                      <p className="calculator-days-slider-wrap-title">{`${days} day${days > 1 ? "s" : ""}`}</p>
                      <Slider
                        className="calculator-days-slider"
                        min={1}
                        max={365}
                        value={days}
                        onChange={(e, newValue: any) => setDays(newValue)}
                      />
                    </div>
                    <div className="calculator-user-data">
                      <div className="data-row">
                        <p className="data-row-name">Your initial investment</p>
                        <p className="data-row-value">
                          {isAppLoading ? <Skeleton width="80px" /> : <>${initialInvestment}</>}
                        </p>
                      </div>
                      <div className="data-row">
                        <p className="data-row-name">Current wealth</p>
                        <p className="data-row-value">
                          {isAppLoading ? <Skeleton width="80px" /> : <>${calcCurrentWealth()}</>}
                        </p>
                      </div>
                      <div className="data-row">
                        <p className="data-row-name">SKADI rewards estimation</p>
                        <p className="data-row-value">
                          {isAppLoading ? <Skeleton width="80px" /> : <>{trim(Number(rewardsEstimation), 2)} SKADI</>}
                        </p>
                      </div>
                      <div className="data-row">
                        <p className="data-row-name">Potential return</p>
                        <p className="data-row-value">
                          {isAppLoading ? <Skeleton width="80px" /> : <>${potentialReturn}</>}
                        </p>
                      </div>
                      <div className="data-row">
                        <p className="data-row-name">Potential number of Tesla Model X</p>
                        <p className="data-row-value">
                          {isAppLoading ? (
                            <Skeleton width="80px" />
                          ) : (
                            <>{Math.floor(Number(potentialReturn) / 70000)}</>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Grid>
            </div>
          </Zoom>
          </Paper>
        </div>
        
    
  );
}

export default Calculator;
