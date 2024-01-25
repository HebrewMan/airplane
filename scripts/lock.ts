import { ethers } from "hardhat";

async function main() {
    const [signer,signer2] = await ethers.getSigners();
    
    const lockAddr = '0x71F52564EbbCB68494408aAE9DD7ae60441F9e4b';
    const Lock = await ethers.getContractAt('Lock',lockAddr,signer); 

    //

// const lock = async () => {
//     const addr = '0x71F52564EbbCB68494408aAE9DD7ae60441F9e4b';//AIC 代币地址
//     const amount = '1000';//锁仓数量
//     const _amount = ethers.utils.parseUnits(amount, 18)//转换精度
//     const ethereum = (window as any).ethereum;
//     const provider = new ethers.providers.Web3Provider(ethereum);
//     const signer = await provider.getSigner();
  
//     const contract = new ethers.Contract(addr, [], signer);

//     const tx = await contract.lock(_amount);

//     
//     console.log(tx.hash);
//     try {
//       await tx.wait();
//       alert("成功");
//     } catch (error) {
//       alert("操作失败");
//     }
//   };

// }

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
