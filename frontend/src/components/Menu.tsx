import { Link } from "react-router-dom";
import { ethers } from "ethers";

const Menu = () => {
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);

  const connectMetamask = async () => {
    let signer;
    try {
      await provider.send("eth_requestAccounts", []);
      signer = provider.getSigner();
    } catch (e: any) {
      alert(e.message);
      return;
    }
  };

  return (
    <div className="flex justify-between w-full px-20 font-press-start">
      <div>Hyper-D-NFT</div>
      <div className="space-x-5">
        <Link className="hover:text-green-400" to="/">
          Home
        </Link>
        <Link className="hover:text-cyan-400" to="/About">
          About
        </Link>
        <a className="hover:text-purple-500" href="https://opensea.io">
          Opensea
        </a>
      </div>

      <button
        className="border w-32 rounded-full border-black hover:bg-gray-100"
        onClick={() => connectMetamask()}
      >
        connect
      </button>
    </div>
  );
};

export default Menu;
