import { JsonRpcProvider } from "@ethersproject/providers";
import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import { getAddresses } from "src/constants/addresses";

import { rebaseTokenContract } from "../../abi";
import { getMarketPrice, setAll } from "../../helpers";
import { RootState } from "../store";

interface ILoadAppDetails {
    networkID: number;
    provider: JsonRpcProvider;
}

export const loadAppDetails = createAsyncThunk(
    "app/loadAppDetails",
    //@ts-ignore
    async ({ networkID, provider }: ILoadAppDetails) => {
        const addresses = getAddresses(networkID);
        const currentBlock = await provider.getBlockNumber();
        const currentBlockTime = (await provider.getBlock(currentBlock)).timestamp;
        // main contract
        const rebaseContract = new ethers.Contract(addresses.REBASE_ADDRESS, rebaseTokenContract, provider);

        // marketPrice
        const marketPrice = await getMarketPrice(networkID, provider);

        // marketCap
        const rebaseCircSupply = (await rebaseContract.getCirculatingSupply()) / Math.pow(10, 9);
        const marketCap = (rebaseCircSupply * marketPrice) / Math.pow(10, 9);

        // nextRebase
        const nextRebase = await rebaseContract.nextRebase();

        // rebase calcs
        const nextRebaseYield = (await rebaseContract.rewardYield()) / (await rebaseContract.rewardYieldDenominator());
        const oneDayRate = Math.pow(1 + nextRebaseYield, 1 * 48) - 1;
        const fiveDayRate = Math.pow(1 + nextRebaseYield, 5 * 48) - 1;
        const rebaseAPY = Math.pow(1 + nextRebaseYield, 365 * 48) - 1;

        // const treasuryBalance = await provider.getBalance(addresses.TREASURY_WALLET);
        // const rfvBalance = await provider.getBalance(addresses.RFV_WALLET);
        // const treasuryAssets = Number(ethers.utils.formatEther(treasuryBalance)) * tokenInStable;
        // const rfvAssets = Number(ethers.utils.formatEther(rfvBalance)) * tokenInStable;

        return {
            marketCap,
            marketPrice,
            nextRebase,
            rebaseAPY,
            nextRebaseYield,
            oneDayRate,
            fiveDayRate,
            currentBlock,
            currentBlockTime,
        };
    },
);

const initialState = {
    loading: true,
};

export interface IAppSlice {
    loading: boolean;
    marketCap: number;
    marketPrice: number;
    nextRebase: number;
    rebaseAPY: number;
    nextRebaseYield: number;
    oneDayRate: number;
    fiveDayRate: number;
    networkID: number;
    currentBlock: number;
    currentBlockTime: number;
}

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        fetchAppSuccess(state, action) {
            setAll(state, action.payload);
        },
    },
    extraReducers: builder => {
        builder
            .addCase(loadAppDetails.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(loadAppDetails.fulfilled, (state, action) => {
                setAll(state, action.payload);
                state.loading = false;
            })
            .addCase(loadAppDetails.rejected, (state, { error }) => {
                state.loading = false;
                console.log(error);
            });
    },
});

const baseInfo = (state: RootState) => state.app;

export default appSlice.reducer;

export const { fetchAppSuccess } = appSlice.actions;

export const getAppState = createSelector(baseInfo, app => app);
