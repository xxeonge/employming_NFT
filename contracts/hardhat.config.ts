import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    sepolia: {
      url: "https://sepolia.infura.io/v3/cf7afa2c9c6440d1a29cf1ab51bee72f",
      accounts: [""]
    }
  }
};

export default config;