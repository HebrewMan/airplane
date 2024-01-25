import { ethers } from "hardhat";

async function main() {
    const [signer] = await ethers.getSigners();
    
    const nft = '0xf3E9E6bEa3bad316a9168A39b30E90Cb0B8bCf42';
    const NFT = await ethers.getContractAt('MyToken721',nft,signer); 

    console.log('signer:====> ',signer.address);

    // const referralAddr = '0xa062d64F99b2383f4355770A409458398001270C';
    // const superNode = '0x54a0E00C939A4B7044c1c7f5B3B1B02F522B49f0';
    // const rewardsPoolAddr = '0x7b6Be006Ec3172033A86eE6adEF2E9aBA15BCE2A';
    // const zero = '0x000000000000000000000000000000000000dEaD';

    // const tx = await NFT.setAssignAddress([referralAddr,superNode,rewardsPoolAddr,zero])

    // tx.wait();

    const arr1 = await NFT.assignAddress(0);
    const arr2 = await NFT.assignAddress(1);
    const arr3 = await NFT.assignAddress(2);
    const arr4 = await NFT.assignAddress(3);

    //0返佣合约  1超级节点账户 2奖金池合约 3黑洞账户  

    console.log("address 返佣合约地址 ====> ",arr1);
    console.log("address 超级节点账户 ====> ",arr2);
    console.log("address 奖金池地址 ====> ",arr3);
    console.log("address 黑洞地址 ====> ",arr4);

  
  
    // const owner:any = await NFT.owner();
    // console.log('owner is addr :  ',owner);
    
    // const tx1:any = await NFT.setPause(false);
    // await tx1?.wait();

    // const res = await NFT.pause();
  
    // console.log('当前铸造是否开启： ',!res);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
