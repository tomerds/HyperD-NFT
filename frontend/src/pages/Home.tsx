import React from 'react'
import { Contract, ethers } from 'ethers'
import abi from '../smart-contract/abi.json'

const contract = '0xc7dc463dc36196aa725f14950967a01269ea436f'

const Home = () => {
    const provider = new ethers.providers.Web3Provider((window as any).ethereum)

    const connectMetamask = async () => {
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        
        const nft = new ethers.Contract(contract, abi, signer)

        try {
            await nft.mint(1, { value: ethers.utils.parseEther('0.0318')})
            alert('succesful mint')
        } catch (e: any) {
            alert(e.message)
        }


    }



    return <div>
        <button onClick={() => connectMetamask()}>connect</button>
    </div>
}

export default Home