const switchRequest = () => {
  return window.ethereum.request({
    method: "wallet_switchEthereumChain",
    params: [{ chainId: "0x19" }],
  });
};

const addChainRequest = () => {
  return window.ethereum.request({
    method: "wallet_addEthereumChain",
    params: [
      {
        chainId: "0x19",
        chainName: "Evmos",
        rpcUrls: ["https://cronos-rpc.heavenswail.one/ext/bc/C/rpc"],
        blockExplorerUrls: ["https://cronoscan.com/"],
        nativeCurrency: {
          name: "CRO",
          symbol: "CRO",
          decimals: 18,
        },
      },
    ],
  });
};

export const swithNetwork = async () => {
  if (window.ethereum) {
    try {
      await switchRequest();
    } catch (error: any) {
      if (error.code === 4902) {
        try {
          await addChainRequest();
          await switchRequest();
        } catch (addError) {
          console.log(error);
        }
      }
      console.log(error);
    }
  }
};
