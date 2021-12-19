const hre = require('hardhat');

const { ethers } = hre;

async function main() {
  await hre.run('compile');
  const NFT = await ethers.getContractFactory('HyperDimensionalNft');
  const nft = await NFT.attach('0xc7dc463dc36196aa725f14950967a01269ea436f');

  await nft.mint(1, { value: ethers.utils.parseEther('0.0318') });
}

main().then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
