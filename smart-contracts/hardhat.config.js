/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require('@nomiclabs/hardhat-waffle');
require('dotenv').config();

const { ALCHEMY_RINKEBY_API, RINKEBY_PRIVATE_KEY } = process.env;

module.exports = {
  solidity: '0.8.9',
  networks: {
    rinkeby: {
      url: ALCHEMY_RINKEBY_API,
      accounts: [`${RINKEBY_PRIVATE_KEY}`],
      gas: 2100000,
      gasPrice: 8000000000,
    },
  },
};
