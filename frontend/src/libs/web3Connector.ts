import { ethers } from "ethers";

export enum Errors {
  NO_PROVIDER = "no_provider",
  WRONG_NETWORK = "wrong_network",
}

const web3Connection = async (
  expectedNetwork: any,
  onBadNetwork: ({
    error,
    message,
  }: {
    error: Errors | null;
    message: string | null;
  }) => void,
  onConnection: any
) => {
  try {
    await (window as any).ethereum.enable();
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    const network = await provider.getNetwork();

    console.log(network.name, "network");

    if (network.name !== expectedNetwork.toLowerCase()) {
      console.log("error");
      onBadNetwork({
        error: Errors.WRONG_NETWORK,
        message: `Please connect to the ${expectedNetwork} test network.`,
      });
      // retry until switching to correect network
      setTimeout(
        () => web3Connection(expectedNetwork, onBadNetwork, onConnection),
        500
      );
      return;
    }
    onBadNetwork({ error: null, message: null });
    onConnection(provider);
  } catch (e: any) {
    onBadNetwork({ error: Errors.NO_PROVIDER, message: "install metamask" });
  }
};

export default web3Connection;
