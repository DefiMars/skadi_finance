import { ReactElement } from "react";

export interface ExternalUrl {
  title: string;
  url: string;
  icon: string;
}

const externalUrls: ExternalUrl[] = [
  // {
  //   title: "Swap",
  //   url: "https://traderjoexyz.com/trade?outputCurrency=0xEDdeF578a930DDc6F8Ceef10f4B00829c54686C2#/",
  //   icon: "zap",
  // },
  {
    title: "Docs",
    url: "https://docs.skadi.finance/",
    icon: "docs",
  },
];

export default externalUrls;
