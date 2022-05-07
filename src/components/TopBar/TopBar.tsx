import { AppBar, Box, Button, SvgIcon, Toolbar, Typography, useTheme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { ReactComponent as WalletIcon } from "src/assets/icons/wallet.svg";
import { useWeb3Context } from "src/hooks";
import { ReactComponent as MenuIcon } from "../../assets/icons/hamburger.svg";
import ThemeSwitcher from "./ThemeSwitch";
import "./TopBar.scss";

const useStyles = makeStyles(theme => ({
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: "100%",
      padding: "10px",
    },
    justifyContent: "flex-end",
    alignItems: "flex-end",
    background: "transparent",
    backdropFilter: "none",
    zIndex: 10,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(981)]: {
      display: "none",
    },
  },
}));

interface TopBarProps {
  theme: string;
  toggleTheme: (e: KeyboardEvent) => void;
  handleDrawerToggle: () => void;
}

function TopBar({ theme, toggleTheme, handleDrawerToggle }: TopBarProps) {
  const { connected } = useWeb3Context();
  const classes = useStyles();
  const WalletButton = (props: any) => {
    const theme = useTheme();
    return (
      <Button id="ohm-menu-button" variant="contained" color="secondary" {...props}>
        <SvgIcon component={WalletIcon} style={{ marginRight: theme.spacing(1) }} />
        <Typography>{connected ? "Wallet" : "Connect"}</Typography>
      </Button>
    );
  };
  return (
    <AppBar position="sticky" className={classes.appBar} elevation={0}>
      <Toolbar disableGutters className="dapp-topbar">
        <Button
          id="hamburger"
          aria-label="open drawer"
          size="large"
          variant="contained"
          color="secondary"
          onClick={handleDrawerToggle}
          className={classes.menuButton}
        >
          <SvgIcon component={MenuIcon} />
        </Button>
        <Box display="flex">
          <Link to="/wallet" component={WalletButton} />
          <ThemeSwitcher theme={theme} toggleTheme={toggleTheme} />
        </Box>
        
        
      </Toolbar>
      
    </AppBar>
    
  );
}

export default TopBar;
