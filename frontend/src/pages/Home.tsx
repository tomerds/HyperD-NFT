import React from 'react'
import { Contract, ethers } from 'ethers'


const Home = () => {
    const provider = new ethers.providers.Web3Provider((window as any).ethereum)

    const connectMetamask = async () => {
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        console.log("Account:", await signer.getAddress());
    }

    return <div>
        <button onClick={() => connectMetamask()}>connect</button>
    </div>
}

export default Home