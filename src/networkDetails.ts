import avalanche from "./assets/tokens/AVAX.svg";
import { Providers } from "./helpers/providers/Providers/Providers";

export enum NetworkId {
  CRONOS = 25,
}

interface IAddresses {
  [key: number]: { [key: string]: string };
}

export const addresses: IAddresses = {
  [NetworkId.CRONOS]: {
    REBASE_ADDRESS: "0xEDdeF578a930DDc6F8Ceef10f4B00829c54686C2",
    TREASURY_WALLET: "0x34a4892E3004b7a7e577E45075Be9d69C9f13b3E",
    RFV_WALLET: "0xD67e4A31A74c3A709f64c353c9c1698654bf9938",
    STABLE_LP_ADDRESS: "0x781655d802670bba3c89aebaaea59d3182fd755d",
  },
};

/**
 * Network details required to add a network to a user's wallet, as defined in EIP-3085 (https://eips.ethereum.org/EIPS/eip-3085)
 */

interface INativeCurrency {
  name: string;
  symbol: string;
  decimals?: number;
}

interface INetwork {
  chainName: string;
  chainId: number;
  nativeCurrency: INativeCurrency;
  rpcUrls: string[];
  blockExplorerUrls: string[];
  image: SVGImageElement | string;
  imageAltText: string;
  uri: () => string;
}

export const USER_SELECTABLE_NETWORKS = [NetworkId.CRONOS];
export const NEWEST_NETWORK_ID = NetworkId.CRONOS;

export const NETWORKS: { [key: number]: INetwork } = {
  [NetworkId.CRONOS]: {
    chainName: "Cronos",
    chainId: 25,
    nativeCurrency: {
      name: "CRO",
      symbol: "CRO",
      decimals: 18,
    },
    rpcUrls: ["https://cronos-rpc.heavenswail.one/ext/bc/C/rpc"],
    blockExplorerUrls: ["https://cronoscan.com/"],
    image: avalanche,
    imageAltText: "Cronos Logo",
    uri: () => Providers.getProviderUrl(NetworkId.CRONOS),
  },
};

interface IViewsForNetwork {
  dashboard: boolean;
  account: boolean;
  calculator: boolean;
  presale: boolean;
  network: boolean;
}

export const VIEWS_FOR_NETWORK: { [key: number]: IViewsForNetwork } = {

  [NetworkId.CRONOS]: {
    dashboard: true,
    account: true,
    calculator: true,
    presale: true,
    network: true,
  },
};
