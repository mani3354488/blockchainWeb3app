require("dotenv").config();

require("@nomiclabs/hardhat-waffle");

const projectId = process.env.ProjectId;

module.exports = {
  solidity: "0.8.4",
  networks: {
    chainId: 1337,
  },
  mumbai: {
    url: `https://polygon-mumbai.infura.io/v3/${projectId}`,
  },
  mainnet: {},
};
