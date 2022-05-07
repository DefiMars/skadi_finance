import { formatUnits } from "@ethersproject/units";
import { BigNumber, BigNumberish } from "ethers";
import fromExponential from "from-exponential";
import { NetworkId } from "src/networkDetails";

export * from "./get-market-price";
export * from "./shorten";
export * from "./trim";
export * from "./seconds-until-block";
export * from "./prettify-seconds";
export * from "./pretty-vesting-period";
export * from "./set-all";
export * from "./sleep";

export function shouldTriggerSafetyCheck() {
  const _storage = window.sessionStorage;
  const _safetyCheckKey = "-oly-safety";
  // check if sessionStorage item exists for SafetyCheck
  if (!_storage.getItem(_safetyCheckKey)) {
    _storage.setItem(_safetyCheckKey, "true");
    return true;
  }
  return false;
}

export const formatNumber = (number: number, precision = 0) => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  }).format(number);
};

export const parseBigNumber = (value: BigNumber, units: BigNumberish = 9) => {
  return parseFloat(formatUnits(value, units));
};

export function formatCurrency(c: number, precision = 0, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: precision,
    minimumFractionDigits: precision,
  }).format(c);
}

export const trim = (number: number = 0, precision?: number) => {
  const array = fromExponential(number).split(".");
  if (array.length === 1) return fromExponential(number);
  //@ts-ignore
  array.push(array.pop().substring(0, precision));
  const trimmedNumber = array.join(".");
  return trimmedNumber;
};

export const isTestnet = (networkId: NetworkId) => {
  const testnets = [
    NetworkId.AVALANCHE_TESTNET,
  ];

  return testnets.includes(networkId);
};
