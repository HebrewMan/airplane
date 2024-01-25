import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

// 引入 dotenv 或其他环境变量的处理方式
import * as dotenv from 'dotenv';
dotenv.config();

const privateKey = process.env.PRIVATE_KEY?.toString()||'';
const privateKey2 = process.env.PRIVATE_KEY2?.toString()||'';

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  networks: {
    aiaTest: {
      url: "http://http-testnet.aitd.io",
      accounts: [privateKey , privateKey2]
    },
    aiaMain: {
      url: "https://walletrpc.aitd.io",
      accounts: [privateKey , privateKey2]
    },
    goerli: {
      url: "https://api.zan.top/node/v1/eth/goerli/public",
      accounts: [privateKey , privateKey2]
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.8.21",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          },
          viaIR: true
        }
      },
      {
        version: "0.8.18",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          },
          viaIR: true
        }
      },
      {
        version: "0.8.9",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          },
          viaIR: true
        }
      },
    ]
  },
};

export default config;
