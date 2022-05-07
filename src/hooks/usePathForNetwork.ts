import { History } from "history";
import { useEffect } from "react";
import { NetworkId, VIEWS_FOR_NETWORK } from "src/constants";

/**
 * will redirect from paths that aren't active on a given network yet.
 */
export function usePathForNetwork({
  pathName,
  networkID,
  history,
}: {
  pathName: string;
  networkID: NetworkId;
  history: History;
}) {
  const handlePathForNetwork = () => {
    // do nothing if networkID is -1 since that's a default state
    // if (networkID === -1) return;

    switch (pathName) {
      default:
        console.log("pathForNetwork ok");
    }
  };

  useEffect(() => {
    handlePathForNetwork();
  }, [networkID]);
}
