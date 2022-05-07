import { JsonRpcProvider } from "@ethersproject/providers";
import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import { useWeb3Context } from "src/hooks";
import { PresaleContract } from "../../abi";
import { getAddresses } from "../../constants";
import { setAll } from "../../helpers";
import { RootState } from "../store";

interface ILoadPresaleDetails {
    address: string;
    networkID: number;
    provider: JsonRpcProvider;
}

export const loadPresaleDetails = createAsyncThunk(
    "presale/loadPresaleDetails",
    //@ts-ignore
    async ({ address, networkID, provider }: ILoadPresaleDetails) => {
        const addresses = getAddresses(networkID);
        const presaleContract = new ethers.Contract(addresses.PRESALE_ADDRESS, PresaleContract, provider);
        const currentBlock = await provider.getBlockNumber();
        const currentBlockTime = (await provider.getBlock(currentBlock)).timestamp;

        const whitelistCount = await presaleContract.getWhitelistCount();

        const totalFund = Number(ethers.utils.formatEther(await presaleContract.getTotalFund()));
        const currentPayment = Number(ethers.utils.formatEther(await presaleContract.getAddressCurrentPayments(address)));

        const wlTier = Number(await presaleContract.whitelistTier(address));

        let minAllocation = 0;
        let maxAllocation = 0;
        switch (wlTier) {
            case (1):
                minAllocation = Number(ethers.utils.formatEther(await presaleContract.getTier1WhitelistMinAllocation()));
                maxAllocation = Number(ethers.utils.formatEther(await presaleContract.getTier1WhitelistAllocation()));
                break;
            case (2):
                minAllocation = Number(ethers.utils.formatEther(await presaleContract.getTier2WhitelistMinAllocation()));
                maxAllocation = Number(ethers.utils.formatEther(await presaleContract.getTier2WhitelistAllocation()));
                break;
            case (3):
                minAllocation = Number(ethers.utils.formatEther(await presaleContract.getTier3WhitelistMinAllocation()));
                maxAllocation = Number(ethers.utils.formatEther(await presaleContract.getTier3WhitelistAllocation()));
                break;
            default:
                break;
        }

        return {
            whitelistCount,
            currentBlock,
            currentBlockTime,
            totalFund,
            currentPayment,
            wlTier,
            minAllocation,
            maxAllocation
        };
    },
);

const initialState = {
    loading: true,
};

export interface IPresaleSlice {
    loading: boolean;
    whitelistCount: number;
    currentBlock: number;
    currentBlockTime: number;
    totalFund: number;
    currentPayment: number;
    wlTier: number;
    minAllocation: number;
    maxAllocation: number;
    networkID: number;
}

const presaleSlice = createSlice({
    name: "presale",
    initialState,
    reducers: {
        fetchPresaleSuccess(state, action) {
            setAll(state, action.payload);
        },
    },
    extraReducers: builder => {
        builder
            .addCase(loadPresaleDetails.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(loadPresaleDetails.fulfilled, (state, action) => {
                setAll(state, action.payload);
                state.loading = false;
            })
            .addCase(loadPresaleDetails.rejected, (state, { error }) => {
                state.loading = false;
                console.log(error);
            });
    },
});

const baseInfo = (state: RootState) => state.presale;

export default presaleSlice.reducer;

export const { fetchPresaleSuccess } = presaleSlice.actions;

export const getPresaleState = createSelector(baseInfo, presale => presale);