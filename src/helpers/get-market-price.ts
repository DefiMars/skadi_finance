import { ethers } from "ethers";

import { Lp2ReserveContract, LpReserveContract } from "../abi";
import { Networks } from "../constants/blockchain";
import { REBASE_LP_ADDRESS, STABLE_LP_ADDRESS } from "./constant";

export async function getMarketPrice(
  networkID: Networks,
  provider: ethers.Signer | ethers.providers.Provider,
): Promise<number> {
  const stable = new ethers.Contract(STABLE_LP_ADDRESS, Lp2ReserveContract, provider);
  const stableReserves = await stable.getReserves();

  const rebaseToken = new ethers.Contract(REBASE_LP_ADDRESS, Lp2ReserveContract, provider);
  const rebaseTokenReserves = await rebaseToken.getReserves();

  const tokenInStable = stableReserves[0] / stableReserves[1];
  const rebaseInToken = rebaseTokenReserves[1] / rebaseTokenReserves[0] * 10000;

  return tokenInStable * rebaseInToken;
}
