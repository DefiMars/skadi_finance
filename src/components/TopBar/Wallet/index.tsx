import {
  Box,
  Link as MuiLink,
  LinkProps,
  makeStyles,
  SwipeableDrawer,
  Theme,
  Typography,
  withStyles
} from "@material-ui/core";
import { Icon, OHMTokenProps, PrimaryButton, SecondaryButton, Token } from "@olympusdao/component-library";
import { Link, useHistory, useParams } from "react-router-dom";
import { DEFAULD_NETWORK } from "src/constants/blockchain";
import { shorten } from "src/helpers";
import { useWeb3Context } from "src/hooks";
import { NetworkId } from "src/networkDetails";
import Assets from "./Assets";

const StyledSwipeableDrawer = withStyles(theme => ({
  root: {
    width: "460px",
    maxWidth: "100%",
  },
  paper: {
    maxWidth: "100%",
    background: theme.colors.paper.background,
  },
}))(SwipeableDrawer);

const useStyles = makeStyles<Theme>(theme => ({
  networkSelector: {
    background: theme.colors.paper.card,
    minHeight: "39px",
    borderRadius: "6px",
    padding: "9px 18px",
    alignItems: "center",
  },
  connectButton: {
    background: theme.colors.paper.card,
    "&:hover": {
      background: theme.colors.paper.cardHover,
    },
  },
  wrongNetworkButton: {
    background: theme.colors.paper.card,
    "&:hover": {
      background: theme.colors.paper.cardHover,
    },
  },
}));

export function Wallet(props: { open?: boolean; component?: string }) {
  const classes = useStyles();
  const history = useHistory();
  const { address, connect, connected, networkId, checkWrongNetwork } = useWeb3Context();
  const { id } = useParams<{ id: string }>();

  // only enable backdrop transition on ios devices,
  // because we can assume IOS is hosted on hight-end devices and will not drop frames
  // also disable discovery on IOS, because of it's 'swipe to go back' feat
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  const CloseButton = (props: LinkProps) => (
    <MuiLink {...props}>
      <Icon name="x" />
    </MuiLink>
  );

  const WalletButtonTop = () => {
    const onClick = !connected ? connect : undefined;
    const label = connected ? "Wallet" : "Connect Wallet";
    return (
      <PrimaryButton className={classes.connectButton} color="secondary" onClick={onClick}>
        <Icon name="wallet" style={{ marginRight: "9px" }} />
        <Typography>{label}</Typography>
      </PrimaryButton>
    );
  };
  const WalletButtonBottom = () => {
    const onClick = !connected ? connect : undefined;
    const label = connected ? "Wallet" : "Connect Wallet";
    return (
      <PrimaryButton onClick={onClick}>
        <Typography>{label}</Typography>
      </PrimaryButton>
    );
  };

  const BottomButton = () => {
    if (connected && (networkId == DEFAULD_NETWORK)) {
      return <DisconnectButton />;
    } else if (connected && (networkId !== DEFAULD_NETWORK)) {
      return <SwitchNetworkButton />;
    } else {
      return <WalletButtonBottom />;
    }
  };

  const DisconnectButton = () => {
    const { disconnect } = useWeb3Context();
    return (
      <SecondaryButton onClick={disconnect}>
        <Typography>Disconnect</Typography>
      </SecondaryButton>
    );
  };

   const SwitchNetworkButton = () => {
    const { checkWrongNetwork } = useWeb3Context();
    return (
      <PrimaryButton onClick={checkWrongNetwork}>
        "Switch Network"
      </PrimaryButton>
    );
  };


  const ConnectMessage = () => (
    <Box display="flex" justifyContent="center" mt={"32px"}>
      <Typography variant={"h6"}> Please Connect Your Wallet </Typography>
    </Box>
  );

  const WrongNetwork = () => (
    <Box display="flex" justifyContent="center" mt={"32px"}>
      <Typography variant={"h6"}> Please switch to Avalanche Network </Typography>
    </Box>
  );

  return (
    <>
      <StyledSwipeableDrawer
        disableBackdropTransition={!isIOS}
        disableDiscovery={isIOS}
        anchor="right"
        open={props.open ? true : false}
        onOpen={() => null}
        onClose={() => { (!connected || (networkId !== DEFAULD_NETWORK)) && history.push("/presale") || connected && (networkId == DEFAULD_NETWORK) && history.push("/presale") }}
      >
        <Box p="30px 15px" style={{ overflow: "hidden" }}>
          <Box style={{ top: 0, position: "sticky" }}>
            <Box display="flex" justifyContent="space-between" mb={"18px"}>
              <Box>
                {!connected && <WalletButtonTop />}
                {connected && (networkId == DEFAULD_NETWORK) && (
                  <Box display="flex" className={classes.networkSelector}>
                    {NetworkId[networkId] && (
                      <Token name={NetworkId[networkId] as OHMTokenProps["name"]} style={{ fontSize: "21px" }} />
                    )}
                    <Typography style={{ marginLeft: "6px" }}> {shorten(address)}</Typography>
                  </Box>
                )}
                {connected && (networkId !== DEFAULD_NETWORK) && (
                  <PrimaryButton className={classes.wrongNetworkButton} color="secondary" onClick={checkWrongNetwork}>
                  <Icon name="repeat" style={{ marginRight: "9px" }} />
                  <Typography>{"Wrong Network"}</Typography>
                </PrimaryButton>
                )}
              </Box>
              <Box display="flex" flexDirection="row" justifyContent="flex-end" alignItems="center" textAlign="right">
                {(!connected || (networkId !== DEFAULD_NETWORK)) && <Link to="/presale" component={CloseButton} />}
                {connected && (networkId == DEFAULD_NETWORK)  && <Link to="/presale" component={CloseButton} />}
              </Box>
            </Box>
          </Box>
          <Box
            style={{
              height: "100vh",
              display: "block",
              overflowY: "scroll",
              overflowX: "hidden",
              paddingBottom: "calc(85%)",
            }}
          >
            {(() => {
              switch (props.component) {
                case "wallet":
                  if (!connected) {
                    return <ConnectMessage />;
                  } else if (connected && (networkId == DEFAULD_NETWORK)) {
                    return <Assets />;
                  } else {
                    return <WrongNetwork />;
                  }
                default:
                  <></>;
              }
            })()}
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          style={{ position: "sticky", bottom: 0, boxShadow: "0px -3px 3px rgba(0, 0, 0, 0.1)" }}
          pt={"21px"}
          pb={"21px"}
        >
          <BottomButton />
        </Box>
      </StyledSwipeableDrawer>
    </>
  );
}

export default Wallet;
