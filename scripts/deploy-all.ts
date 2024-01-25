import { ethers } from "hardhat";

async function main() {
 
  const RewardsPool = await ethers.deployContract("RewardsPool");
  await RewardsPool.waitForDeployment();

  const Referral = await ethers.deployContract("Referral",[RewardsPool.target]);
  await Referral.waitForDeployment();

  const Airdrop = await ethers.deployContract("Airdrop");
  await Airdrop.waitForDeployment();

  const Stake = await ethers.deployContract("Stake");
  await Stake.waitForDeployment();

  // //0返佣合约  1超级节点账户 2奖金池合约 3黑洞账户  
  const baseUri = 'http://www-pre.yoho.global/api/contract-wallet-web/v1/nft/metadata/';
  const superNode = '0x54a0E00C939A4B7044c1c7f5B3B1B02F522B49f0';
  const addr0 = '0x000000000000000000000000000000000000dEaD';   

  const MyToken721 = await ethers.deployContract("MyToken721",[baseUri,Referral.target,superNode,RewardsPool.target,addr0]);
  await MyToken721.waitForDeployment();
 

  const SimpleSwap = await ethers.deployContract("SimpleSwap");
  await SimpleSwap.waitForDeployment();
  console.log('SimpleSwap.target == >',SimpleSwap.target);

  console.log('Referral (返佣合约) = ',Referral.target);
  console.log('RewardsPool (奖金池合约) = ',RewardsPool.target);
  console.log('Airdrop (空投合约) =',Airdrop.target);
  console.log('Stake (质押合约) = ',Stake.target);
  console.log('YOHO-NFT (1.2) = ',MyToken721.target);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
