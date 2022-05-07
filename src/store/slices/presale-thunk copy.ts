import { JsonRpcProvider, StaticJsonRpcProvider } from "@ethersproject/providers";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import { PresaleContract } from "../../abi";
import { getAddresses } from "../../constants";
import { Networks } from "../../constants/blockchain";
import { messages } from "../../constants/messages";
import { sleep } from "../../helpers";
import { getGasPrice } from "../../helpers/get-gas-price";
import { metamaskErrorWrap } from "../../helpers/metamask-error-wrap";
import { info, success, warning } from "./messages-slice";
import { getBalances } from "./account-slice";
import { clearPendingTxn, fetchPendingTxns, getStakingTypeText } from "./pending-txns-slice";
interface IPayWl {
    action: string;
    value: string;
    provider: StaticJsonRpcProvider | JsonRpcProvider;
    address: string;
    networkID: Networks;
}

export const payWl = createAsyncThunk("presale/payWl", async ({ action, value, provider, address, networkID }: IPayWl, { dispatch }) => {
    if (!provider) {
        dispatch(warning({ text: messages.please_connect_wallet }));
        return;
    }
    const addresses = getAddresses(networkID);
    const signer = provider.getSigner();
    const rebaseWl = new ethers.Contract(addresses.PRESALE_ADDRESS, PresaleContract, signer);

    let payWlTx;

    try {
        const gasPrice = await getGasPrice(provider);
        payWlTx = await rebaseWl.payWl(ethers.utils.parseUnits(value, "gwei"), true, { gasPrice });
        dispatch(fetchPendingTxns({ txnHash: payWlTx.hash, text: "Filling WL", type: "paywl" }));
        await payWlTx.wait();
        dispatch(success({ text: messages.tx_successfully_send }));
    } catch (err: any) {
        return metamaskErrorWrap(err, dispatch);
    } finally {
        if (payWlTx) {
            dispatch(clearPendingTxn(payWlTx.hash));
        }
    }
    dispatch(info({ text: messages.your_balance_update_soon }));
    await sleep(10);
    await dispatch(getBalances({ address, networkID, provider }));
    dispatch(info({ text: messages.your_balance_updated }));
    return;
});
