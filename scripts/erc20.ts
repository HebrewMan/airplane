import { ethers } from "hardhat";

async function main() {
    const [signer] = await ethers.getSigners();
    
    const yoho = '0x2fC0eBefDD68134809Ee359BBC8A5576c3788120';
    const bnb = '0x7E8f38dA1648Fc520cf83B643390F15e7aD0a4a4';

    const YOHO = await ethers.getContractAt('TYOHO',yoho,signer); 
    const BNB = await ethers.getContractAt('TYOHO',bnb,signer); 


    const yohoBalance = await YOHO.balanceOf('0xa062d64F99b2383f4355770A409458398001270C')
    const bnbBalance = await BNB.balanceOf('0xa062d64F99b2383f4355770A409458398001270C')


    console.log(yohoBalance);
    console.log(bnbBalance);
    
   
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
