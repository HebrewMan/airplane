import {
    time,
    loadFixture,
  } from "@nomicfoundation/hardhat-toolbox/network-helpers";
  import { expect } from "chai";
  import { ethers } from "hardhat";
  
  describe("Stake", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployOneYearLockFixture() {

      // Contracts are deployed using the first signer/account by default
      const [owner, otherAccount] = await ethers.getSigners();

      const YOHO = await ethers.getContractFactory("TYOHO");
      const yoho = await YOHO.deploy();
        console.log('yoho address is =>>>> ',yoho.target);
        
      const NFT = await ethers.getContractFactory("TNFT");
      const nft = await NFT.deploy();
      console.log('NFT address is =>>>> ',nft.target);

  
      const Stake = await ethers.getContractFactory("Stake");
      const stake = await Stake.deploy();
      console.log('stake address is =>>>> ',stake.target);


      return { stake, nft, yoho, owner, otherAccount };
    }
  
    describe("Deployment", function () {
      it("Should set the right unstakeTime", async function () {
        const { stake, yoho, nft,owner } = await loadFixture(deployOneYearLockFixture);

        //nft mint
        const tx1= await nft.safeMint(owner.address,1);
        await tx1.wait();
        expect(await nft.ownerOf(1)).to.equal(owner.address);

        const tx2= await nft.setApprovalForAll(stake.target,true);
        await tx2.wait();

        //yoho
        const tx = await yoho.approve(stake.target,'100000000000000000000');
        await tx.wait();
        
        //stake
    
        const nfts = [nft.target];
        const ids = [1];
        const amounts = ['20000000000000000'];
        const signId = 1;
        const time = 1700465532;
        const nonce = 0
    
      
        const tx3 = await stake.stake(nfts,ids,amounts,signId,time,nonce,'');
        await tx3.wait();
      
        expect(await nft.ownerOf(1)).to.equal(stake.target);

        const tx4 = await stake.unStake(1,nfts,ids,amounts,signId,time,nonce,'');
        await tx4.wait();
       
        // expect(await nft.ownerOf(1)).to.equal(owner.address);
        //unstake
  
        // expect(await stake.unstakeTime()).to.equal(unstakeTime);
      });
  
 
    });
  
  });
  