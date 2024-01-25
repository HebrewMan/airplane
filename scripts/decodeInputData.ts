import { ethers,TransactionResponse,Result } from "ethers";
import * as dotenv from "dotenv";
import {abi} from '../artifacts/contracts/Airdrop.sol/Airdrop.json';

dotenv.config();

async function main() {

    const provider = new ethers.JsonRpcProvider("http://http-testnet.aitd.io");

    const hash = "0xb4141c48e4be50874347037e39d9049c98dd7598c7f8d05a2992a67509674c17";

    const INTERFACE = ["function mint((uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256[6],string) params, bytes _signature)"];

    const tx = await provider.getTransaction(hash) as TransactionResponse;

    const callData = tx.data;

    const iface = new ethers.Interface(INTERFACE);

    const decodeDataResult:Result = iface.decodeFunctionData("mint",tx.data);
    
    let decodeData = "";

    decodeDataResult.forEach((item,index) =>{
        let strItem = `${index} => ${item}\n`;
        decodeData = decodeData + strItem;
        console.log(decodeData);
    })
    
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
