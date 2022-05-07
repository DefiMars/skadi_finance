/* eslint-disable */
import { Box, Divider, Link, Paper } from "@material-ui/core";
import { NavItem } from "@olympusdao/component-library";
import React from "react";
import logo from 'src/assets/images/logo.png';
import { DEFAULD_NETWORK } from "src/constants/blockchain";
import { useWeb3Context } from "src/hooks";
import WalletAddressEns from "../TopBar/Wallet/WalletAddressEns";
import externalUrls from "./externalUrls";
import "./Sidebar.scss";
import Social from "./Social";

type NavContentProps = {
  handleDrawerToggle?: () => void;
};

const NavContent: React.FC<NavContentProps> = ({ handleDrawerToggle }) => {
  const { connected, networkId } = useWeb3Context();
  return (
    <Paper className="dapp-sidebar">
      <Box className="dapp-sidebar-inner" display="flex" justifyContent="space-between" flexDirection="column">
        <div className="dapp-menu-top">
          <Box className="branding-header">
            <Link href="https://skadi.finance" target="_blank">
            <div className="dapp-menu-top">
              <img src={logo} width="150" height="94"/>
              </div>
            </Link>
            <WalletAddressEns />
          </Box>

          <div className="dapp-menu-links">
            <div className="dapp-nav" id="navbarNav">
            {connected && (networkId === DEFAULD_NETWORK) ? (
              <>
              {/* <NavItem to="/dashboard" icon="dashboard" label={"Dashboard"} /> */}
              <NavItem to="/presale" icon="clock" label={"Presale"} />
              {/* <NavItem to="/account" icon="governance" label={"Account"} />
              <NavItem to="/calculator" icon="goal" label={"Calculator"} /> */}
              </>
            ) : (
              <>
              {/* <NavItem to="/dashboard" icon="dashboard" label={"Dashboard"} /> */}
              <NavItem to="/presale" icon="clock" label={"Presale"} />
              {/* <NavItem to="/calculator" icon="goal" label={"Calculator"} /> */}
              </>
            )}

              <Box className="menu-divider">
                <Divider />
              </Box>

              {}
              {Object.keys(externalUrls).map((link: any, i: number) => (
                <NavItem
                  key={i}
                  href={`${externalUrls[link].url}`}
                  icon={externalUrls[link].icon as any}
                  label={externalUrls[link].title as any}
                />
              ))}
            </div>
          </div>
        </div>
        <Box className="dapp-menu-social" display="flex" justifyContent="space-between" flexDirection="column">
          <Social />
        </Box>
      </Box>
    </Paper>
  );
};

export default NavContent;
