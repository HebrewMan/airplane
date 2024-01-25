import { ethers } from "hardhat";

async function main() {
    const [,signer2] = await ethers.getSigners();
    console.log('当前地址是: ',signer2.address);
    const yohoAddr = '0x2fC0eBefDD68134809Ee359BBC8A5576c3788120';
    const stakeAddr = '0x3d8d275c07845f6A9BE5f12dC8D45dEEe8E00DD2';
    const nftAddr = '0x48642188219b7eb516a28f1363e04c7787adb53e';

       
    const YOHO = await ethers.getContractAt('TYOHO',yohoAddr,signer2);   
    const NFT = await ethers.getContractAt('TNFT',nftAddr,signer2);   
    const Stake = await ethers.getContractAt('Stake2',stakeAddr,signer2);   

    // const tx = await YOHO.approve(stakeAddr,'100000000000000000000');
    // await tx.wait();
    // const res = await YOHO.allowance(signer2.address,stakeAddr);
    // console.log('YOHO 授权数量是 ====》',res);
    // const res4 = await YOHO.balanceOf(signer2.address);
    // console.log('YOHO 数量是 ====》',res4);
    
    // const tx2= await NFT.setApprovalForAll(stakeAddr,true);
    // await tx2.wait();
    // const res2 = await NFT.isApprovedForAll(signer2.address,stakeAddr);
    // console.log('NFT 授权情况 ====》',res2);



    // const Stake = await ethers.deployContract("Stake2",[yohoAddr]);
    // await Stake.waitForDeployment();
    // const stakeAddr = Stake.target;
    // console.log('Stake.target == >',Stake.target);

    // const YOHO = await ethers.getContractAt('TYOHO',yohoAddr,signer2);   
    // const tx = await YOHO.approve(stakeAddr,'100000000000000000000');
    // await tx.wait();
    // const res = await YOHO.allowance(signer2.address,stakeAddr);
    // console.log('YOHO 授权数量是 ====》',res);
    // const res4 = await YOHO.balanceOf(signer2.address);
    // console.log('YOHO 数量是 ====》',res4);

    // const NFT = await ethers.deployContract("TNFT");
    // const nftAddr = await NFT.waitForDeployment();
    // console.log('NFT.target == >',NFT.target);

    
    const tokenId = 186;
    const tx3= await NFT.safeMint(signer2.address,tokenId);
    await tx3.wait();

    const nfts = [nftAddr];
    const ids = [tokenId];
    const amounts = ['10000000000000000'];
    const signId = 1;
    const time = 1700465532;
    const nonce = 0
    const sign = '0x90a76d4eb1aea7433c21ddc2faa8a64322c43b0300245a7bf2b87c2ed9344ec14d6e58b43fe13cb6753ef78e5aa20d3588e922d49470b829a34759e4870ae91a1b';

    try {
        const tx3 = await Stake.stake(nfts,ids,amounts,signId,time,nonce);
        await tx3.wait();
        console.log('stake ==== > ',tx3.hash);
    } catch (error) {
        console.log(error);
    }

    try {
        const tx = await Stake.unStake(1,nfts,ids,amounts,signId,time,nonce);
        await tx.wait();
        console.log('unStake ==== > ',tx.hash);
    } catch (error) {
        console.log(error);
    }
    
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
