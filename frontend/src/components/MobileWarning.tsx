import { Link } from "react-router-dom";

const MobileWarning: React.FC = () => {
  return (
    <div className="md:hidden flex flex-col font-press-start space-y-10 px-5">
      <p className="text-lg">Please use a desktop to mint a Hyper D NFT</p>

      <p className="text-lg">
        You can find out more information{" "}
        <Link to="/About" className=" text-gray-600 underline">
          here
        </Link>
      </p>
    </div>
  );
};

export default MobileWarning;
