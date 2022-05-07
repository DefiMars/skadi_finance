import { Box, Container, useMediaQuery } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { Metric, MetricCollection, Paper, TabPanel } from "@olympusdao/component-library";
import { ChangeEvent, memo, useState } from "react";
import { useSelector } from "react-redux";
import { formatCurrency, formatNumber } from "src/helpers";
import { IAccountSlice } from "src/store/slices/account-slice";
import { IAppSlice } from "src/store/slices/app-slice";
import { IReduxState } from "src/store/slices/state.interface";
import { RebaseCountdown } from "../TreasuryDashboard/components/Metric/Metric";
import "./Account.scss";
import { DailyROI, RebaseAPY, UserBalance } from "./components/Metric/Metric";


const sharedMetricProps: PropsOf<typeof Metric> = { labelVariant: "h6", metricVariant: "h5" };

const MetricsDashboard = () => (
  <>
    <Box className="hero-metrics">
      <Paper className="ohm-card" style={{ paddingBottom: "5px" }}>
        <MetricCollection>
          <RebaseAPY {...sharedMetricProps} />
          <UserBalance {...sharedMetricProps} />
          <DailyROI {...sharedMetricProps} />
        </MetricCollection>
      </Paper>
    </Box>
  </>
);

const Account = memo(() => {
  const [view, setView] = useState(0);
  const isSmallScreen = useMediaQuery("(max-width: 650px)");
  const isVerySmallScreen = useMediaQuery("(max-width: 379px)");
  const isAppLoading = useSelector<IReduxState, boolean>(state => state.app.loading);
  const changeView: any = (_event: ChangeEvent<any>, newView: number) => {
    setView(newView);
  };
  const app = useSelector<IReduxState, IAppSlice>(state => state.app);
  const account = useSelector<IReduxState, IAccountSlice>(state => state.account);

  return (
    <div id="treasury-dashboard-view" className={`${isSmallScreen && "smaller"} ${isVerySmallScreen && "very-small"}`}>
      <>
        <Container
          style={{
            paddingLeft: isSmallScreen || isVerySmallScreen ? "0" : "3.3rem",
            paddingRight: isSmallScreen || isVerySmallScreen ? "0" : "3.3rem",
          }}
        >
          <TabPanel value={view} index={0}>
            <Box sx={{ mt: "15px" }}>
              <MetricsDashboard />
            </Box>

            <div className="parent">
              <div className="child">
                <Box className="hero-metrics">
                  <Paper className="ohm-card">
                    <MetricCollection>
                      <RebaseCountdown {...sharedMetricProps} />
                    </MetricCollection>
                  </Paper>
                </Box>
              </div>

              <div className="child">
                <Box className="hero-metrics">
                  <Paper className="ohm-card">
                    <MetricCollection>
                      <DailyROI {...sharedMetricProps} />
                    </MetricCollection>
                  </Paper>
                </Box>
              </div>
            </div>

            <>
              <Box className="hero-metrics">
                <Paper className="ohm-card">
                  <MetricCollection>
                    <div className="muiPaper-root">
                      <div className="data-row">
                        <p className="data-row-name">Next reward in Token</p>
                        <p className="data-row-value">
                          {isAppLoading ? (
                            <Skeleton width="80px" />
                          ) : (
                            <>{formatNumber(app.nextRebaseYield * Number(account.balances.rebase), 2) == "NaN" ? "0" : formatNumber(app.nextRebaseYield * Number(account.balances.rebase), 2) } SKADI</>
                          )}
                        </p>
                      </div>
                      
                      <div className="data-row">
                        <p className="data-row-name">Next reward in USD</p>
                        <p className="data-row-value">
                          {isAppLoading ? (
                            <Skeleton width="80px" />
                          ) : (
                            <>
                              {formatCurrency(app.nextRebaseYield * Number(account.balances.rebase) * Number(app.marketPrice),2 ) == "$NaN" ? "$0" : formatCurrency(app.nextRebaseYield * Number(account.balances.rebase) * Number(app.marketPrice),2) }
                            </>
                          )}
                        </p>
                      </div>
                      <div className="data-row">
                        <p className="data-row-name">5 Days ROI in %</p>
                        <p className="data-row-value">
                          {isAppLoading ? <Skeleton width="80px" /> : <>{formatNumber(app.fiveDayRate * 100, 2) == "NaN" ? "0" : formatNumber(app.fiveDayRate * 100, 2) } %</>}
                        </p>
                      </div>
                      <div className="data-row">
                        <p className="data-row-name">5 Days ROI in USD</p>
                        <p className="data-row-value">
                          {isAppLoading ? (
                            <Skeleton width="80px" />
                          ) : (
                            <>{formatCurrency(Number(account.balances.rebase) * app.fiveDayRate, 2)=="$NaN" ? "$0" : formatCurrency(Number(account.balances.rebase) * app.fiveDayRate, 2)}</>
                          )}
                        </p>
                      </div>
                    </div>
                  </MetricCollection>
                </Paper>
              </Box>
            </>
          </TabPanel>
        </Container>
      </>
    </div>
  );
});

export default Account;
