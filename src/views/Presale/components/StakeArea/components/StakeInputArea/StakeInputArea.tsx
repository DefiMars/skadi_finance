import { Box, Grid, makeStyles, Theme } from "@material-ui/core";
import { Input, PrimaryButton } from "@olympusdao/component-library";
import { ethers } from "ethers";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useWeb3Context } from "src/hooks";
import { IPresaleSlice } from "src/store/slices/presale-slice";
import { payWl } from "src/store/slices/presale-thunk";
import { IReduxState } from "src/store/slices/state.interface";


const useStyles = makeStyles<Theme>(theme => ({
  inputRow: {
    justifyContent: "space-around",
    alignItems: "center",
    height: "auto",
    marginTop: "4px",
  },
  gridItem: {
    width: "100%",
    paddingRight: "5px",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    [theme.breakpoints.down("sm")]: {
      marginBottom: "10px",
    },
    [theme.breakpoints.up("sm")]: {
      marginBottom: "0",
    },
  },
  button: {
    alignSelf: "center",
    width: "100%",
    minWidth: "163px",
    maxWidth: "542px",
    height: "43px",
  },
}));

export const StakeInputArea: React.FC<{ isZoomed: boolean }> = props => {
  const classes = useStyles();

  const [amount, setAmount] = useState("");
  const presale = useSelector<IReduxState, IPresaleSlice>(state => state.presale);
  
  const setMax = async () => {
    const avaxBalance = Number(ethers.utils.formatEther(await provider.getSigner().getBalance()));
    const intermValue = (presale.maxAllocation - presale.currentPayment) > 0 ? (presale.maxAllocation - presale.currentPayment) : 0;
    const secondIntemValue = (intermValue >= avaxBalance) ? avaxBalance : intermValue;
    setAmount(((avaxBalance - 0.05) > 0) ? (secondIntemValue - 0.05).toString() : "0");
};

  const { address, provider, networkId } = useWeb3Context();
  const presaleMutation = payWl({ address, provider, networkID: networkId });

  const isMutating = presaleMutation.isLoading;
  const handleSubmit = (event: React.FormEvent<StakeFormElement>) => {
    event.preventDefault();
    const amount = event.currentTarget.elements["amount-input"].value;
    presaleMutation.mutate(amount);
  };

  return (
    <Box my={3}>
      <Box my={2}>
          <form onSubmit={handleSubmit}>
            <Grid container className={classes.inputRow}>
              <Grid item xs={12} sm={8} className={classes.gridItem}>
                <Input
                  value={amount}
                  labelWidth={0}
                  id="amount-input"
                  endString="Max"
                  name="amount-input"
                  className={classes.input}
                  endStringOnClick={setMax}
                  placeholder="Enter an amount of AVAX"
                  onChange={event => setAmount(event.target.value)}
                  disabled={isMutating}
                />
              </Grid>

              <Grid item xs={12} sm={4} className={classes.gridItem}>
                <Box sx={{ marginTop: { xs: 1, sm: 0 } }}>
                  <PrimaryButton fullWidth type="submit" className={classes.button} disabled={isMutating}>
                    Fill Your WL
                    {isMutating ? "..." : ""}
                  </PrimaryButton>
                </Box>
              </Grid>
            </Grid>
          </form>
      </Box>


    </Box>
  );
};

interface StakeFormElement extends HTMLFormElement {
  elements: HTMLFormControlsCollection & { "amount-input": HTMLInputElement };
}
