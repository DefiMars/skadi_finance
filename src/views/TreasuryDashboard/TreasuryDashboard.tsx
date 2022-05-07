import { Box, Container, useMediaQuery } from "@material-ui/core";
import { Metric, MetricCollection, Paper, TabPanel } from "@olympusdao/component-library";
import { ChangeEvent, memo, useState } from "react";
import { MarketCap, RebaseCountdown, RebasePrice } from "./components/Metric/Metric";
import "./TreasuryDashboard.scss";

const sharedMetricProps: PropsOf<typeof Metric> = { labelVariant: "h6", metricVariant: "h5" };

const MetricsDashboard = () => (
  <>
    <Box className="hero-metrics">
      <Paper className="ohm-card">
        <MetricCollection>
          <MarketCap {...sharedMetricProps} />
          <RebasePrice {...sharedMetricProps} />
          <RebaseCountdown {...sharedMetricProps} />
        </MetricCollection>
      </Paper>
    </Box>
  </>
);

const TreasuryDashboard = memo(() => {
  const [view, setView] = useState(0);
  const isSmallScreen = useMediaQuery("(max-width: 650px)");
  const isVerySmallScreen = useMediaQuery("(max-width: 379px)");

  const changeView: any = (_event: ChangeEvent<any>, newView: number) => {
    setView(newView);
  };

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
              <div id="dexscreener-embed" >
                <iframe src="https://dexscreener.com/cronos/0x96bfc3ae3f3696392824c5d499a0681ddcafe9fb?embed=1&theme=dark&trades=0&info=0" style={{ position: "relative", width: "100%", height: "60vh", maxHeight: "700px", minWidth: "200px", minHeight: "500px", marginTop: "3vh", borderRadius: "15px" }}>
                </iframe>
              </div>
            </Box>
          </TabPanel>
        </Container>
      </>
    </div>
  );
});

export default TreasuryDashboard;
