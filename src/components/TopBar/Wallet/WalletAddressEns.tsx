import { Link } from "@material-ui/core";
import { shorten } from "src/helpers";
import { useWeb3Context } from "src/hooks";

export default function WalletAddressEns() {
  const { address } = useWeb3Context();

  if (!address) return null;

  return (
    <div className="wallet-link">
      <Link href={`https://snowtrace.io/address/${address}`} target="_blank">
        {shorten(address)}
      </Link>
    </div>
  );
}
