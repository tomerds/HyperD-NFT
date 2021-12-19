import { ethers } from 'ethers';

export enum Errors {
    NO_PROVIDER = 'no_provider',
    WRONG_NETWORK = 'wrong_network'

}

const web3Connection = async (expectedNetwork: any, onBadNetwork: ({error, message}: {error: Errors | null, message: string| null}) => void, onConnection: any) => {
    try {
  await (window as any).ethereum.enable()
  const provider = new ethers.providers.Web3Provider((window as any).ethereum)
  const network = await provider.getNetwork()

  if (network.name !== expectedNetwork.toLowerCase()) {
    // onBadNetwork(`Wrong network. Please connect to the ${expectedNetwork} test network.`)
    onBadNetwork({error: Errors.WRONG_NETWORK, message: `Please connect to the ${expectedNetwork} test network.`})
    setTimeout(
      () => web3Connection(expectedNetwork, onBadNetwork, onConnection), 
      500
    )
    return
  }
  onConnection(provider);
} catch (e: any) {
    onBadNetwork({error: Errors.NO_PROVIDER, message: 'install metamask'})
  }
}

export default web3Connection