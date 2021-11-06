pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract HyperDimensionalNft is ERC721, ERC721Enumerable, Ownable {
    // TODO: Think about how you want to ensure the drop is proveably not editable
    // string public PROVENANCE;

    bool public saleIsActive = false;
    string private _baseURIextended;

    uint256 public constant MAX_SUPPLY = 10000;
    uint256 public constant MAX_PUBLIC_MINT = 10;
    uint256 public constant PRICE_PER_TOKEN = 0.0318 ether;

    constructor() ERC721("Hyper Dimensional Symmetrical Object", "HYPERD") {}

    /**
     * @dev set aside tokens for creators
     */
    function reserve(uint256 n) public onlyOwner {
        uint256 supply = totalSupply();
        uint256 i;
        for (i = 0; i < n; i++) {
            _safeMint(msg.sender, supply + i);
        }
    }

    function setSaleState(bool newState) public onlyOwner {
        saleIsActive = newState;
    }

    function setBaseURI(string memory baseURI_) external onlyOwner {
        _baseURIextended = baseURI_;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _baseURIextended;
    }

    function mint(uint256 numberOfTokens) public payable {
        uint256 ts = totalSupply();
        require(saleIsActive, "Sale must be active to mint tokens");
        require(
            numberOfTokens <= MAX_PUBLIC_MINT,
            "Exceeded max token purchase"
        );
        require(
            ts + numberOfTokens <= MAX_SUPPLY,
            "Purchase would exceed max tokens"
        );
        require(
            PRICE_PER_TOKEN * numberOfTokens <= msg.value,
            "Ether value sent is not correct"
        );

        for (uint256 i = 0; i < numberOfTokens; i++) {
            _safeMint(msg.sender, ts + i);
        }
    }

    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        payable(msg.sender).transfer(balance);
    }

    /**
     * @dev required overrrides for openzeppelin contracts
     */

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
