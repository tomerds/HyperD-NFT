import { Link } from "react-router-dom";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import web3Connection, { Errors } from "../libs/web3Connector";

type MenuProps = {
  setProvider: (thing: any) => void;
  provider: any;
};

const Menu: React.FC<MenuProps> = ({ setProvider, provider }) => {
  const [error, setError] = useState<{
    error: Errors | null;
    message: string | null;
  }>({ error: null, message: null });

  const connect = async () => {
    web3Connection("rinkeby", setError, setProvider);
  };

  const connectMetamask = async () => {
    if (!provider) {
      await connect();
    }
  };

  return (
    <div className="flex justify-between w-full px-20 font-press-start h-20">
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

      <div className="flex flex-col">
        <div className="flex flex-col">
          <button
            className={`border w-48 flex-grow-0 px-5 rounded-full border-black ${
              provider
                ? "border-green-400 pointer-events-none"
                : "hover:text-yellow-300"
            } hover:bg-gray-100`}
            onClick={() => connectMetamask()}
          >
            {provider ? "connected" : "connect"}
          </button>
        </div>
        {error.error === Errors.NO_PROVIDER && (
          <div className={"flex flex-col w-48"}>
            <span className="text-red-600 text-xs w-48 mt-5">Error</span>
            <a
              href="https://metamask.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 text-xs w-48 mt-5 underline hover:text-red-900"
            >
              {error.message}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
