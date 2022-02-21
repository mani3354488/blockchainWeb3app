require("dotenv").config();
require("@nomiclabs/hardhat-waffle");

const fs = require("fs");

const privateKey = fs.readFileSync(".secret").toString();
const projectId = process.env.ProjectId;

module.exports = {
  solidity: "0.8.4",
  networks: {
    hardhat: { chainId: 1337 },
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${projectId}`,
      accounts: [privateKey],
    },
    mainnet: {
      url: `https://polygon-mumbai.infura.io/v3/${projectId}`,
      accounts: [privateKey],
    },
  },
};
