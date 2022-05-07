import { ethers } from "ethers";
import { useQuery } from "react-query";
import { PresaleContract } from "src/abi";
import { NetworkId } from "src/constants";
import { getAddresses } from "src/constants/addresses";
import { useWeb3Context } from "src/hooks";

export const presalePaymentQueryKey = () => ["usePresalePayement"];

export const usePresalePayement = () => {

  const { provider } = useWeb3Context();
  const addresses = getAddresses(NetworkId.AVALANCHE);

  const presaleContract = new ethers.Contract(addresses.PRESALE_ADDRESS, PresaleContract, provider);

  const key = presalePaymentQueryKey();
  return useQuery<string, Error>(key, async () => {
    return await presaleContract.getTotalFund();
  });
};
