import { ethers } from "hardhat";

async function main() {

    const stakeAddr = '0x7efa933365f7C711b6164a3763baE3fEB5c5a645';
    const yohoAddr = '0x2fC0eBefDD68134809Ee359BBC8A5576c3788120';
    const nftAddr = '0xEAa352eBa5E7a81002Acd783339dDD7fe7334674';

    const [,signer2] = await ethers.getSigners();
    
    const YOHO = await ethers.getContractAt('TYOHO',yohoAddr,signer2);   
    const NFT = await ethers.getContractAt('MyToken',nftAddr,signer2);   
    const Stake = await ethers.getContractAt('Stake',stakeAddr,signer2);   

    console.log('当前地址是: ',signer2.address);
    
    const tx = await YOHO.approve(stakeAddr,'100000000000000000000');
    await tx.wait();
    const res = await YOHO.allowance(signer2.address,stakeAddr);
    console.log('YOHO 授权数量是 ====》',res);
    const res4 = await YOHO.balanceOf(signer2.address);
    console.log('YOHO 数量是 ====》',res4);
    
    const tx2= await NFT.setApprovalForAll(stakeAddr,true);
    await tx2.wait();
    const res2 = await NFT.isApprovedForAll(signer2.address,stakeAddr);
    console.log('NFT 授权情况 ====》',res2);

    const nfts = [nftAddr];
    const ids = [1];
    const amounts = [100];
    const signId = 1;
    const time = 1700465532;
    const nonce = 0
    const sign = '0xb3b77bc5552d52ad84b0f9e1d5618d3264ec50f6e92873055f11970a3f1696fa419802195dc05773c42a017751561c69f21b366f92fdd20d9d033423a77053a21b';

    // const hex = await Stake?.getUserMessageHash(signer2.address,0, nfts, ids, amounts, time, nonce);

    const tx3 = await Stake.unStake(0,nfts,ids,amounts,signId,time,nonce,sign);
    await tx3.wait();
    console.log(tx3.hash);
  
    
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
