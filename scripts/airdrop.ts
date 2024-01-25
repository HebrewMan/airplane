import { ethers } from "hardhat";

async function main() {
    const [signer,signer2] = await ethers.getSigners();
    
    const airdrop = '0x71F52564EbbCB68494408aAE9DD7ae60441F9e4b';
    const Airdrop = await ethers.getContractAt('Airdrop',airdrop,signer); 

    console.log('signer:====> ',signer.address);

    const owner:any = await Airdrop.owner();
    console.log('owner is addr :  ',owner);
    
    const tx1:any = await Airdrop.setStartTime(1703495037);
    await tx1?.wait();
    const tx2:any = await Airdrop.setEndTime(1735117437);
    await tx2?.wait();

    const time = await Airdrop.startT();
    const time2 = await Airdrop.endT();
    console.log('当前结束时间是： ',time);
    console.log('当前结束时间是： ',time2);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
