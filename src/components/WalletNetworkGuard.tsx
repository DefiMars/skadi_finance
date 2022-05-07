import { Box, Typography } from "@material-ui/core";
import { PrimaryButton } from "@olympusdao/component-library";
import { DEFAULD_NETWORK } from "src/constants";
import { useWeb3Context } from "src/hooks";
import ConnectButton from "./ConnectButton/ConnectButton";

export const WalletNetworkGuard: React.FC<{ message: string }> = props => {
  const { networkId } = useWeb3Context();
  const { checkWrongNetwork } = useWeb3Context();

  if (networkId != DEFAULD_NETWORK)
    return (
      <Box display="flex" flexDirection="column" alignItems="center" mt={3}>
        <Box display="flex" flexDirection="column" alignItems="center">
                  <PrimaryButton onClick={checkWrongNetwork}>
                    Switch Network
                </PrimaryButton>
        </Box>
      </Box>
    );

  return <>{props.children}</>;
};
