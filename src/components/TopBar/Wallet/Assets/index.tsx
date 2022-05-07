import { Box, Fade, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { WalletBalance } from "@olympusdao/component-library";
import { FC } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { formatCurrency, formatNumber } from "src/helpers";
import { IAccountSlice } from "src/store/slices/account-slice";
import { IAppSlice } from "src/store/slices/app-slice";
import { IReduxState } from "src/store/slices/state.interface";


/**
 * Component for Displaying Assets
 */

export interface OHMAssetsProps {
  path?: string;
}
const AssetsIndex: FC<OHMAssetsProps> = (props: { path?: string }) => {
  const history = useHistory();

  const account = useSelector<IReduxState, IAccountSlice>(state => state.account);
  const app = useSelector<IReduxState, IAppSlice>(state => state.app);

  return (
    <Fade in={true}>
      <Box>
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <WalletBalance
            title="Balance"
            usdBalance={formatCurrency(Number(account.balances.rebase), 2)}
            underlyingBalance={`${formatNumber(Number(account.balances.rebase) / Number(app.marketPrice), 2)=="NaN" ? "0" : formatNumber(Number(account.balances.rebase) / Number(app.marketPrice), 2)} SKADI`}
          />
        </Box>

        {/* 
        <Box display="flex" flexDirection="row" className={classes.selector} mb="18px" mt="18px">
          <Link exact component={NavLink} to="/wallet">
            <Typography>My Wallet</Typography>
          </Link>
          <Link component={NavLink} to="/wallet/history">
            <Typography>History</Typography>
          </Link>
        </Box> */}

        {/* {(() => {
          switch (props.path) {
            case "history":
              return <TransactionHistory />;
            default:
              return (
                <>
                  {assets.map(asset => (
                    <Balances token={asset} />
                  ))}
                </>
              );
          }
        })()} */}
      </Box>
    </Fade>
  );
};

export default AssetsIndex;
