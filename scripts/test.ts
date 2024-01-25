import { ethers } from "hardhat";

async function main() {
    const [signer,signer2] = await ethers.getSigners();

    const airdrop = '0x71F52564EbbCB68494408aAE9DD7ae60441F9e4b';
    const Airdrop = await ethers.getContractAt('Airdrop',airdrop,signer); 

    const nft = '0x1B69e3211971106858e983dCB6072499D27B7795';
    const NFT = await ethers.getContractAt('MyToken721',nft,signer); 

    const referral = '0xf86B98660848400167991E08416a30BA9f891D98';
    const Referral = await ethers.getContractAt('Referral',referral,signer); 

    const rewardsPool = '0x66DBB3969E8C352EbaB01EB28d8E13E7AE2BfEFD';
    const RewardsPool = await ethers.getContractAt('RewardsPool',rewardsPool,signer); 

    const stake = '0x5ca920596D4e2de13fe3A270147ee21C88265B59';
    const Stake = await ethers.getContractAt('Stake',stake,signer); 

    console.log('signer:====> ',signer.address);


    const tx1:any = await Airdrop.setSigner('0xa89CDa0dB7e7fEa6cb46b00cd3ee293ae1967926');
    await tx1?.wait();
    const tx2:any = await NFT.setSigner('0xa89CDa0dB7e7fEa6cb46b00cd3ee293ae1967926');
    await tx2?.wait();
    const tx3:any = await Referral.setSigner('0xa89CDa0dB7e7fEa6cb46b00cd3ee293ae1967926');
    await tx3?.wait();
    const tx4:any = await RewardsPool.setSigner('0xa89CDa0dB7e7fEa6cb46b00cd3ee293ae1967926');
    await tx4?.wait();
    const tx5:any = await Stake.setSigner('0xa89CDa0dB7e7fEa6cb46b00cd3ee293ae1967926');
    await tx5?.wait();

    console.log('sucesse')


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
