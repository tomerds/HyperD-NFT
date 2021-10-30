const {
  expect,
} = require('chai');
const { BigNumber } = require('ethers');

describe('HyperDimensionalNft contract', () => {
  let NFT;
  let hdNFT;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async () => {
    // Get the ContractFactory and Signers here.
    NFT = await ethers.getContractFactory('HyperDimensionalNft');
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    // To deploy our contract, we just have to call Token.deploy() and await
    // for it to be deployed(), which happens onces its transaction has been
    // mined.
    hdNFT = await NFT.deploy();
    await hdNFT.deployed();
  });

  describe('Deployment', () => {
    it('Should set the right owner', async () => {
      expect(await hdNFT.owner()).to.equal(owner.address);
    });
  });

  describe('Deployment', () => {
    it('Minting 1 token requires 0.123 eth to be sent', async () => {
      await hdNFT.mint();
    });
  });
});
