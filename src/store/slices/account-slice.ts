import { JsonRpcProvider, StaticJsonRpcProvider } from "@ethersproject/providers";
import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import { getAddresses } from "src/constants/addresses";
import { rebaseTokenContract } from "../../abi";
import { Networks } from "../../constants/blockchain";
import { setAll } from "../../helpers";
import { IToken } from "../../helpers/tokens";
import { RootState } from "../store";

interface IGetBalances {
  address: string;
  networkID: Networks;
  provider: StaticJsonRpcProvider | JsonRpcProvider;
}

interface IAccountBalances {
  balances: {
    rebase: string;
  };
}

export const getBalances = createAsyncThunk(
  "account/getBalances",
  async ({ address, networkID, provider }: IGetBalances): Promise<IAccountBalances> => {
    const addresses = getAddresses(networkID);

    const rebaseContract = new ethers.Contract(addresses.REBASE_ADDRESS, rebaseTokenContract, provider);
    const rebaseBalance = await rebaseContract.balanceOf(address);

    return {
      balances: {
        rebase: ethers.utils.formatEther(rebaseBalance),
      },
    };
  },
);

interface ILoadAccountDetails {
  address: string;
  networkID: Networks;
  provider: StaticJsonRpcProvider | JsonRpcProvider;
}

interface IUserAccountDetails {
  balances: {
    rebase: string;
  };
}

export const loadAccountDetails = createAsyncThunk(
  "account/loadAccountDetails",
  async ({ networkID, provider, address }: ILoadAccountDetails): Promise<IUserAccountDetails> => {

    let rebaseBalance = 0;

    const addresses = getAddresses(networkID);

    if (addresses.REBASE_ADDRESS) {
      const rebaseContract = new ethers.Contract(addresses.REBASE_ADDRESS, rebaseTokenContract, provider);
      rebaseBalance = await rebaseContract.balanceOf(address);
    }

    return {
      balances: {
        rebase: ethers.utils.formatEther(rebaseBalance),
      },
    };
  },
);

interface ICalcUserTokenDetails {
  address: string;
  token: IToken;
  provider: StaticJsonRpcProvider | JsonRpcProvider;
  networkID: Networks;
}

export interface IUserTokenDetails {
  allowance: number;
  balance: number;
  isAvax?: boolean;
}

export const calculateUserTokenDetails = createAsyncThunk(
  "account/calculateUserTokenDetails",
  async ({ address, token, networkID, provider }: ICalcUserTokenDetails) => {
    if (!address) {
      return new Promise<any>(resevle => {
        resevle({
          token: "",
          address: "",
          img: "",
          balance: 0,
        });
      });
    }

    if (token.isAvax) {
      const avaxBalance = await provider.getSigner().getBalance();
      const avaxVal = ethers.utils.formatEther(avaxBalance);

      return {
        token: token.name,
        tokenIcon: token.img,
        balance: Number(avaxVal),
        isAvax: true,
      };
    }

    const tokenContract = new ethers.Contract(token.address, rebaseTokenContract, provider);

    let balance = "0";
    balance = await tokenContract.balanceOf(address);
    const balanceVal = Number(balance) / Math.pow(10, token.decimals);

    return {
      token: token.name,
      address: token.address,
      img: token.img,
      balance: Number(balanceVal),
    };
  },
);

export interface IAccountSlice {
  balances: {
    rebase: string;
  };
  loading: boolean;
  tokens: { [key: string]: IUserTokenDetails };
}

const initialState: IAccountSlice = {
  loading: true,
  balances: { rebase: "" },
  tokens: {},
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    fetchAccountSuccess(state, action) {
      setAll(state, action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadAccountDetails.pending, state => {
        state.loading = true;
      })
      .addCase(loadAccountDetails.fulfilled, (state, action) => {
        setAll(state, action.payload);
        state.loading = false;
      })
      .addCase(loadAccountDetails.rejected, (state, { error }) => {
        state.loading = false;
        console.log(error);
      })
      .addCase(getBalances.pending, state => {
        state.loading = true;
      })
      .addCase(getBalances.fulfilled, (state, action) => {
        setAll(state, action.payload);
        state.loading = false;
      })
      .addCase(getBalances.rejected, (state, { error }) => {
        state.loading = false;
        console.log(error);
      })
      .addCase(calculateUserTokenDetails.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(calculateUserTokenDetails.fulfilled, (state, action) => {
        if (!action.payload) return;
        const token = action.payload.token;
        state.tokens[token] = action.payload;
        state.loading = false;
      })
      .addCase(calculateUserTokenDetails.rejected, (state, { error }) => {
        state.loading = false;
        console.log(error);
      });
  },
});

export default accountSlice.reducer;

export const { fetchAccountSuccess } = accountSlice.actions;

const baseInfo = (state: RootState) => state.account;

export const getAccountState = createSelector(baseInfo, account => account);
