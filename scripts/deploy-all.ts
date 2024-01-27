import { ethers } from "hardhat";

async function main() {
 
  const Game = await ethers.deployContract("Game");
  await Game.waitForDeployment();

  const Lock = await ethers.deployContract("Lock");
  await Lock.waitForDeployment();


  const Airplane = await ethers.deployContract("Airplane",['','']);
  await Airplane.waitForDeployment();

  const Props = await ethers.deployContract("Props",['','']);
  await Props.waitForDeployment();
 
  console.log("==========Game==========",Game.target);
  console.log("==========Lock==========",Lock.target);
  console.log("==========Airplane==========",Airplane.target);
  console.log("==========Props==========",Props.target);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
