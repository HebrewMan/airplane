import { ethers } from "hardhat";

async function main() {
 
  // const Lock = await ethers.deployContract("Lock");
  // await Lock.waitForDeployment();

  // const Airplane = await ethers.deployContract("Airplane",['','']);
  // await Airplane.waitForDeployment();

  const Props = await ethers.deployContract("Props",['','']);
  await Props.waitForDeployment();

  // const Game = await ethers.deployContract("Game",[Airplane.target,Props.target]);
  // await Game.waitForDeployment();
 
  // console.log("==========Airplane==========",Airplane.target);
  console.log("==========Props==========",Props.target);
  // console.log("==========Game==========",Game.target);
  // console.log("==========Lock==========",Lock.target);
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
