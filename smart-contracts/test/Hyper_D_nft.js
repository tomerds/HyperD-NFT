const { expect } = require('chai');

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

  describe('Pre Activation', () => {
    it('Sale must be active in order to mint', async () => {
      await expect(hdNFT.mint(1)).to.be.revertedWith('Sale must be active to mint tokens');
    });

    it('Minting is possible once sale activated', async () => {
      await hdNFT.setSaleState(true);
      const overrides = { value: ethers.utils.parseEther('0.123') };

      await hdNFT.mint(1, overrides);

      expect(await hdNFT.ownerOf(0)).to.equal(owner.address);
    });
  });

  describe('Minting', () => {
    beforeEach(async () => {
      await hdNFT.setSaleState(true);
    });

    it('Minting is limited to 10', async () => {
      let overrides = { value: ethers.utils.parseEther('1.243') };

      await expect(hdNFT.mint(11, overrides)).to.revertedWith('Exceeded max token purchase');

      overrides = { value: ethers.utils.parseEther('1.23') };

      await hdNFT.mint(10, overrides);

      expect(await hdNFT.balanceOf(owner.address)).to.equal(10);
    });
  });
});
