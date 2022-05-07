export type AddressMap = Partial<Record<NetworkId, string>>;

import { NetworkId } from "src/networkDetails";
import { Networks } from "./blockchain";

const CRONOS = {
  REBASE_ADDRESS: "0xEDdeF578a930DDc6F8Ceef10f4B00829c54686C2",
  TREASURY_WALLET: "0x34a4892E3004b7a7e577E45075Be9d69C9f13b3E",
  RFV_WALLET: "0xD67e4A31A74c3A709f64c353c9c1698654bf9938",
  STABLE_LP_ADDRESS: "0x781655d802670bba3c89aebaaea59d3182fd755d", // WAVAX-MIM
  PRESALE_ADDRESS: "0xa3529ef462Fe9E72238f25A384ce642C3fb38AD3",
};

export const getAddresses = (networkID: number) => {
  if (networkID === Networks.CRONOS) return CRONOS;
  throw Error("Network don't support");
};
