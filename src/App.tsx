import { useMediaQuery } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import useTokens from "src/hooks/tokens";
import Messages from "./components/Messages/Messages";
import NavDrawer from "./components/Sidebar/NavDrawer";
import Sidebar from "./components/Sidebar/Sidebar";
import TopBar from "./components/TopBar/TopBar";
import Wallet from "./components/TopBar/Wallet";
import { shouldTriggerSafetyCheck } from "./helpers";
import { useAddress, useWeb3Context } from "./hooks";
import useTheme from "./hooks/useTheme";
import { info } from "./slices/MessagesSlice";
import { calculateUserTokenDetails, loadAccountDetails } from "./store/slices/account-slice";
import { loadAppDetails } from "./store/slices/app-slice";
import { loadPresaleDetails } from "./store/slices/presale-slice";
import { IReduxState } from "./store/slices/state.interface";
import "./style.scss";
import { dark as darkTheme } from "./themes/dark.js";
import { girth as gTheme } from "./themes/girth.js";
import { light as lightTheme } from "./themes/light.js";
import { PresaleV2, TreasuryDashboard } from "./views";
import NotFound from "./views/404/NotFound";
import Account from "./views/Account/Account";
import Calculator from "./views/Calculator";

const drawerWidth = 280;
const transitionDuration = 969;

const useStyles = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: transitionDuration,
    }),
    height: "100%",
    overflow: "auto",
    marginLeft: drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: transitionDuration,
    }),
    marginLeft: 0,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
}));

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [theme, toggleTheme] = useTheme();

  const address = useAddress();

  const classes = useStyles();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { connect, provider, hasCachedProvider, networkId, connected } = useWeb3Context();

  const isAppLoading = useSelector<IReduxState, boolean>(state => state.app.loading);
  const isAppLoaded = useSelector<IReduxState, boolean>(state => !Boolean(state.app.marketPrice));


  const isSmallerScreen = useMediaQuery("(max-width: 980px)");
  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  const [walletChecked, setWalletChecked] = useState(false);

  const { tokens } = useTokens();

  async function loadDetails(whichDetails: string) {
    let loadProvider = provider;

    if (whichDetails === "app") {
      loadApp(loadProvider);
    }

    if (whichDetails === "presale" && address && connected) {
      dispatch(loadPresaleDetails({ address: address, networkID: networkId, provider: loadProvider }));
    }


    if (whichDetails === "account" && address && connected) {
      loadAccount(loadProvider);
      if (isAppLoaded) return;

      loadApp(loadProvider);
    }

    if (whichDetails === "userTokens" && address && connected) {
      tokens.map(token => {
        dispatch(calculateUserTokenDetails({ address, token, provider, networkID: networkId }));
      });
    }
  }

  const loadApp = useCallback(
    loadProvider => {
      dispatch(loadAppDetails({ networkID: networkId, provider: loadProvider }));
      //dispatch(loadPresaleDetails({ networkID: networkId, provider: loadProvider }));
      tokens.map(token => {
        dispatch(calculateUserTokenDetails({ address: "", token, provider, networkID: networkId }));
      });
    },
    [connected],
  );

  const loadAccount = useCallback(
    loadProvider => {
      dispatch(loadAccountDetails({ networkID: networkId, address, provider: loadProvider }));
    },
    [connected],
  );

  useEffect(() => {
    if (hasCachedProvider()) {
      connect().then(() => {
        setWalletChecked(true);
      });
    } else {
      setWalletChecked(true);
    }
  }, []);

  useEffect(() => {
    // don't load ANY details until wallet is Checked
    if (walletChecked) {
      if (networkId !== -1) {
     //   loadDetails("account");
     //   loadDetails("app");
     //   loadDetails("dashboard");
     //   loadDetails("userTokens");
        loadDetails("presale");
      }
    }
  }, [walletChecked, networkId]);

  useEffect(() => {
    if (walletChecked) {
    //  loadDetails("app");
    //  loadDetails("account");
    //  loadDetails("userTokens");
      loadDetails("presale");
    }
  }, [walletChecked]);



  useEffect(() => {
    if (connected) {
    //  loadDetails("app");
    //  loadDetails("account");
    //  loadDetails("userTokens");
      loadDetails("presale");
    }
  }, [connected]);

  //if (isAppLoading) return <Loading />;


  useEffect(() => {
    if (hasCachedProvider()) {
      // then user DOES have a wallet
      connect().then(() => {
        setWalletChecked(true);
      });
    } else {
      // then user DOES NOT have a wallet
      setWalletChecked(true);
    }
    if (shouldTriggerSafetyCheck()) {
      dispatch(info("Safety Check: Always verify you're on app.skadi.finance!"));
    }
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSidebarClose = () => {
    setIsSidebarExpanded(false);
  };

  let themeMode = theme === "light" ? lightTheme : theme === "dark" ? darkTheme : gTheme;

  useEffect(() => {
    themeMode = theme === "light" ? lightTheme : darkTheme;
  }, [theme]);

  useEffect(() => {
    if (isSidebarExpanded) handleSidebarClose();
  }, [location]);

  return (
    <ThemeProvider theme={themeMode}>
      <CssBaseline />
      <div className={`app ${isSmallerScreen && "tablet"} ${isSmallScreen && "mobile"} ${theme}`}>
        <Messages />
        <TopBar theme={theme} toggleTheme={toggleTheme} handleDrawerToggle={handleDrawerToggle} />
        <nav className={classes.drawer}>
          {isSmallerScreen ? (
            <NavDrawer mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
          ) : (
            <Sidebar />
          )}
        </nav>

        <div className={`${classes.content} ${isSmallerScreen && classes.contentShift}`}>
          <Switch>
            {/* (keith): leave this route here temporarily to 
              be able to reference the old dashboard */}
            {/* <Route exact path="/dashboard">
              <TreasuryDashboard />
            </Route> */}

            {/* <Route exact path="/account">
              <Account />
            </Route> */}

            {/* <Route exact path="/calculator">
              <Calculator />
            </Route> */}

            <Route exact path="/presale">
              <PresaleV2 />
            </Route>

            <Route exact path="/">
              <Redirect to="/presale" />
            </Route>

            <Route path={"/info/:id"}>
              <Wallet open={true} component="info" />
            </Route>
            <Route path={"/info"}>
              <Wallet open={true} component="info" />
            </Route>
            <Route path={"/utility"}>
              <Wallet open={true} component="utility" />
            </Route>
            <Route path={"/wallet/history"}>
              <Wallet open={true} component="wallet/history" />
            </Route>
            <Route path="/wallet">
              <Wallet open={true} component="wallet" />
            </Route>

            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
