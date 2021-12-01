import { ethers } from "ethers";
import abi from "../smart-contract/abi.json";
import Menu from "../components/Menu";

const contract = "0xc7dc463dc36196aa725f14950967a01269ea436f";

const Home = () => {
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);

  const mint = async () => {
    var inputValue = (document.getElementById("mintNumber") as HTMLInputElement)
      .value;
    let signer;
    try {
      await provider.send("eth_requestAccounts", []);
      signer = provider.getSigner();
    } catch (e: any) {
      alert(e.message);
      return;
    }

    const nft = new ethers.Contract(contract, abi, signer);

    try {
      await nft.mint(inputValue, {
        value: ethers.utils.parseEther("0.0318").mul(inputValue),
      });
      alert("succesful mint");
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <div className="flex flex-col space-y-5 justify-center items-center mt-10 font-press-start">
      <Menu />

      <div className="w-1/2">
        <div className="flex flex-col justify-center items-center ">
          <img src="/images/equation.png" />

          <div className="flex h-28 justify-center space-x-10 mb-10">
            <img src="/images/newton.png" />
            <img src="/images/riemann.png" />
            <img src="/images/galileo.png" />
          </div>

          <span>Mint a symmetrical object in hyperspace</span>
          <button
            className="border px-8 rounded-full border-black hover:bg-gray-100 text-3xl mt-10 mb-5"
            onClick={() => mint()}
          >
            mint
          </button>
          <select name="mintNumber" id="mintNumber">
            <option selected={true} value="1">
              1
            </option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>

        <div className="mt-10">
          <span className="text-xs">
            People have stars bought stars, craters on the moon, even
            comets...but how about owning a symmetrical object in hyperspace.
            Marcus du Sautoy has discovered some significant new symmetrical
            objects but they currently have no owners. For 0.0318 ETH you can
            have one of these new symmetrical object named after significant
            mathematicians of the past. A portion of the money raised will be
            donated to Common Hope, an educational charity supporting and
            empowering children and their families in Guatemala through
            education. You will receive a unique symmetrical object immortalized
            as an nft. Early supporters will be able to trade in these first
            generation objects for future naming rights.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Home;
