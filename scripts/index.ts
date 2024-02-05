import { ethers } from "hardhat";

async function main() {
    const [signer,signer2] = await ethers.getSigners();
    
    const airPlane = '0xa22211a04002EcF1e8480c920C5460c1Ae71585B';
    const AirPlane = await ethers.getContractAt('AirPlane',airPlane,signer); 

    const props = '0xB530060C59cAb4F5055796B47dFAa19Dc1E03B93';
    const Props = await ethers.getContractAt('Props',props,signer); 

    const game = '0xe621200441DFe1B0c37A09eD9932246A6190f00a';
    const Game = await ethers.getContractAt('Game',game,signer); 

    //铸造飞机
    const tx1 = await AirPlane.mint(2,1,"0x",{value:'1000000000000000000'});
    //铸造道具
    // const tx2 = await Props.mint(1,1,"0x");

    //销毁飞机
    const tx = await Game.burnAir(1,1);
    //销毁道具
    //领取免费飞机
    //领取晚间礼包

 }

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
