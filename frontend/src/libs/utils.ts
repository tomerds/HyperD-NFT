

export const getOpenseaUrl = (network: string): string => {
    if(network == 'rinkeby') {
        return 'https://testnets.opensea.io'
    } else {
        return 'https://opensea.io'
    }
}

export const getEtherscanUrl = (network: string): string => {
    if(network == 'rinkeby') {
        return 'https://rinkeby.etherscan.io/'
    } else {
        return 'https://etherscan.io/'
    }
}