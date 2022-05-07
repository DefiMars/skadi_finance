import { PrimaryButton } from "@olympusdao/component-library";
import React from "react";
import { DEFAULD_NETWORK } from "src/constants/blockchain";
import { useWeb3Context } from "src/hooks/web3Context";

const ConnectButton: React.FC = () => {
  const { connect, connected, networkId, checkWrongNetwork } = useWeb3Context();

  if (connected && (networkId !== DEFAULD_NETWORK)) {

    <PrimaryButton size="large" style={{ fontSize: "1.2857rem" }} onClick={checkWrongNetwork}>
      Wrong Network
    </PrimaryButton>

  }

  return (
    <PrimaryButton size="large" style={{ fontSize: "1.2857rem" }} onClick={connect}>
      Connect Wallet
    </PrimaryButton>
  );
};

export default ConnectButton;
