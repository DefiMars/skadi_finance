import { JsonRpcProvider, StaticJsonRpcProvider } from "@ethersproject/providers";
import { ContractReceipt, ethers } from "ethers";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { DecimalBigNumber } from "src/helpers/DecimalBigNumber/DecimalBigNumber";
import { error as createErrorToast, info as createInfoToast } from "src/slices/MessagesSlice";
import { PresaleContract } from "../../abi";
import { getAddresses } from "../../constants";
import { Networks } from "../../constants/blockchain";

interface IPayWl {
    provider: StaticJsonRpcProvider | JsonRpcProvider;
    address: string;
    networkID: Networks;
}

export const payWl = ({ provider, address, networkID }: IPayWl) => {
    const dispatch = useDispatch();

    return useMutation<ContractReceipt, Error, string>(
        async amount => {
            const addresses = getAddresses(networkID);
            const signer = provider.getSigner();
            console.log(addresses.PRESALE_ADDRESS);
            const rebaseWl = new ethers.Contract(addresses.PRESALE_ADDRESS, PresaleContract, signer);

            if (!amount || isNaN(Number(amount))) throw new Error("Please enter a number");

            const _amount = new DecimalBigNumber(amount, 9);

            if (!_amount.gt(new DecimalBigNumber("0", 9))) throw new Error("Please enter a number greater than 0");

            if (!rebaseWl) throw new Error("Please switch to the Cronos network to fill your whitelist");

            if (!address) throw new Error("Please refresh your page and try again");

            const options = { value: ethers.utils.parseEther(amount) };
            const transaction = await rebaseWl.payWL(options);
            return transaction.wait();
        },
        {
            onError: error => {
                dispatch(createErrorToast(error.message));
            },
            onSuccess: async () => {
                dispatch(createInfoToast("Success"));
            },
        },
    );
}
