type MintProps = {
  remainingCount?: number;
  minting: boolean;
  mint: () => void;
  error: string | null;
};

const Mint: React.FC<MintProps> = ({
  remainingCount,
  mint,
  minting,
  error,
}) => {
  return (
    <div className="flex flex-col justify-center items-center">
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
          Once you have confirmed the transaction this may take some time.
          Please wait while your token is minting.
        </span>
      )}
      {error && <span className="text-xs mt-2 mb-5 text-red-600">{error}</span>}
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
  );
};

export default Mint;
