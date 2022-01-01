import { ethers } from "ethers";
import abi from "../smart-contract/abi.json";
import { useEffect, useState } from "react";
import { getEtherscanUrl, getOpenseaUrl } from "../libs/utils";
import MobileWarning from "../components/MobileWarning";
import { Link } from "react-router-dom";

const rinkebyContract = process.env
  .REACT_APP_CONTRACT_ADDRESS_RINKEBY as string;

const mainnetContract = process.env
  .REACT_APP_CONTRACT_ADDRESS_MAINNET as string;

const isLive = process.env.REACT_APP_IS_LIVE_ON_MAINNET as string;

type HomeProps = {
  provider: any;
};

const getContract = async (provider: any): Promise<string> => {
  const { chainId } = await provider.getNetwork();
  console.log("chaidId", chainId);
  let contract;
  if (chainId === 4) {
    contract = rinkebyContract;
  } else {
    contract = mainnetContract;
  }

  return contract;
};

const Home: React.FC<HomeProps> = ({ provider }) => {
  const [remainingCount, setRemainingCount] = useState<number | undefined>(
    undefined
  );
  const [minting, setMinting] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);
  const [successfulTx, setSuccessfulTx] = useState<string | null>(null);
  const [address, setAddress] = useState<null | string>(null);

  useEffect(() => {
    async function setCount() {
      const contract = await getContract(provider);
      const nft = new ethers.Contract(contract, abi, provider);
      try {
        const supply = await nft.totalSupply();

        setRemainingCount(1729 - supply);
      } catch (e) {
        setRemainingCount(undefined);
      }
    }

    if (provider !== undefined) {
      setCount();
    }
  }, [provider]);

  const mint = async () => {
    setError(null);
    var inputValue = (document.getElementById("mintNumber") as HTMLInputElement)
      .value;
    let signer;
    if (!provider) {
      setError("Please connect your wallet");
      return;
    }

    // set the minting address
    try {
      await provider.send("eth_requestAccounts", []);
      signer = provider.getSigner();
      const address = await signer.getAddress();
      setAddress(address);
    } catch (e: any) {
      setError(e.message);
      return;
    }

    const contract = await getContract(provider);
    const nft = new ethers.Contract(contract, abi, signer);
    try {
      setMinting(true);
      const tx = await nft.mint(inputValue, {
        value: ethers.utils.parseEther("0.0318").mul(inputValue),
      });

      console.log(tx);

      await tx.wait();

      setMinting(false);
      setSuccessfulTx(tx.transactionHash);
    } catch (e: any) {
      const message = e.error ? e.error.message : e.message;
      setError(`${message}`);
      setMinting(false);
    }
  };

  useEffect(() => {
    console.log(successfulTx);
  }, [successfulTx]);

  if (isLive !== "true") {
    return (
      <div className="flex flex-col w-full px-20 justify-center items-center font-press-start text-3xl h-screen">
        <h2>COMING</h2>
        <h2>SOON</h2>
        <Link
          to="/about"
          className="text-xs mt-10 underline text-gray-400 hover:text-gray-500 md:hidden"
        >
          Learn More
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-5 justify-center items-center mt-10 font-press-start">
      <MobileWarning />
      <div className="w-1/2 hidden md:inline">
        <div className="flex flex-col justify-center items-center ">
          <img alt="equation" src="/images/equation.png" className="my-10" />

          <div className="flex h-28 justify-center space-x-10 mb-10">
            {/* Change these to real images after launch */}
            <img className="w-36 h-36" alt="newton" src="/images/newton.png" />
            <img
              className="w-36 h-36"
              alt="riemann"
              src="/images/riemann.png"
            />
            <img
              className="w-36 h-36"
              alt="galileo"
              src="/images/galileo.png"
            />
          </div>

          {successfulTx !== null ? (
            <div className="flex-col flex mt-10">
              <span className="text-cyan-400 mb-5">Success!</span>
              <span className="text-xs">
                Congratulations you have minted in hyperdimensional space, you
                can view the details of your objects on{" "}
                {/* TODO: Make sure this to env var or something */}
                <a
                  href={`${getOpenseaUrl("rinkeby")}/${
                    address ? address : "account"
                  }`}
                  className="underline hover:text-purple-500 "
                >
                  OpenSea
                </a>{" "}
                or check out the{" "}
                {/* TODO: Make sure this to env var or something */}
                <a
                  href={`${getEtherscanUrl("rinkeby")}/${successfulTx}`}
                  className="underline hover:text-green-400"
                >
                  transaction
                </a>
              </span>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center ">
              <h1 className="mt-5">Mint a symmetrical object in hyperspace</h1>
              {remainingCount && (
                <span className="text-xs mt-2 text-gray-600">
                  {remainingCount}/1729 left at 0.0318 ETH each
                </span>
              )}
              <button
                className="h-10 w-44 flex justify-center items-center border px-8 rounded-full border-black hover:bg-gray-100 text-3xl mt-10 mb-5"
                onClick={() => mint()}
              >
                {minting ? (
                  <div>
                    <div
                      style={{ borderTopColor: "transparent" }}
                      className="h-6 w-6 border-2 border-black border-solid rounded-full animate-spin"
                    />
                  </div>
                ) : (
                  "mint"
                )}
              </button>
              {minting && (
                <span className="text-xs mt-2 mb-5 text-gray-300">
                  Once you have confirmed the transaction this may take some
                  time. Please wait while your token is minting.
                </span>
              )}
              {error && (
                <span className="text-xs mt-2 mb-5 text-red-600">{error}</span>
              )}
              <select
                name="mintNumber"
                id="mintNumber"
                className="form-select appearance-none
                            block
                            px-3
                            text-base
                            font-normal
                            bg-white bg-clip-padding bg-no-repeat
                            border border-solid border-black
                            transition
                            ease-in-out
                            m-0
                            focus:bg-white"
              >
                <option selected={true} value="1">
                  1
                </option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          )}
        </div>

        <div className="mt-20">
          <span className="text-xs">
            People have staked a claim on stars, new species of animals, craters
            on the moon, even comets... but how about owning a symmetrical
            object in hyperspace. Marcus du Sautoy has discovered some
            significant new symmetrical objects but they currently have no
            owners. For 0.0318 ETH you can have one of these new symmetrical
            object named after a significant mathematician of the past. Which
            one will you get? A portion of the money raised will be donated to
            Common Hope, an educational charity supporting and empowering
            children and their families in Guatemala through education. You will
            receive a unique symmetrical object immortalized as an nft. Early
            supporters will be able to trade in these first generation objects
            for future naming rights.
          </span>
        </div>

        <div className="my-20">
          <h2 className="text-2xl">Team</h2>
          <div className="flex justify-around mt-10">
            <div className="flex flex-col items-center w-80">
              <img
                className="w-36 h-36 rounded-full"
                src="/images/marcus2.jpg"
                alt="Marcus"
              />
              <a
                className="mt-5 hover:text-gray-600"
                href="https://mobile.twitter.com/marcusdusautoy"
              >
                @MarcusduSautoy
              </a>
              <span className="mt-5 text-xs">
                Simonyi Professor for the Public Understanding of Science and
                Professor of Mathematics.
              </span>
            </div>
            <div className="flex flex-col items-center w-80">
              <img
                className="w-36 h-36 rounded-full"
                src="/images/tomer.JPG"
                alt="Tomer"
              />
              <a
                className="mt-5 hover:text-gray-600"
                href="https://mobile.twitter.com/tomerdusautoy"
              >
                @TomerduSautoy
              </a>
              <span className="mt-5 text-xs">
                Blockchain engineer, helping artists and creators make nfts
                since 2019.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
