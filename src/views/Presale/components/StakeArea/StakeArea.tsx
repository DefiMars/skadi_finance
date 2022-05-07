import { Divider, Grid, Zoom } from "@material-ui/core";
import { MetricCollection, Paper } from "@olympusdao/component-library";
import { useState } from "react";
import { WalletConnectedGuard } from "src/components/WalletConnectedGuard";
import { WalletNetworkGuard } from "src/components/WalletNetworkGuard";
import { WhitelistGuard } from "src/components/WhitelistGuard";
import { HardCap, SoftCap } from "./components/PresaleInfo";
import { StakeInputArea } from "./components/StakeInputArea/StakeInputArea";
import { CurrentPayement, MaximumAllocation, MinimumAllocation, WhitelistTier } from "./components/UserPresaleInfo";

export const StakeArea: React.FC = () => {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <Zoom style={{ zIndex: "auto" }} in onEntered={() => setIsZoomed(true)}>
      <Paper headerText="Presale">
        <WalletConnectedGuard message="Connect your wallet to fill your Whitelist">
        <WalletNetworkGuard message = "Switch to the Avalanche network">
        <WhitelistGuard message="You are not whitelisted !">
          <StakeInputArea isZoomed={isZoomed} />

          <Divider color="secondary" />

          <WhitelistTier />

          <CurrentPayement />

          <MinimumAllocation />

          <MaximumAllocation />
        </WhitelistGuard>
        </WalletNetworkGuard>
        </WalletConnectedGuard>
      </Paper>
    </Zoom>
  );
};
