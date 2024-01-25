const { ethers } = require('ethers');

async function main() {

    const privateKey = "e714d873c046aa25df761d7f0f263caa2d4594778c8174e075bfeb26a9b968f1";

    const provider = new ethers.JsonRpcProvider("http://http-testnet.aitd.io");
    const wallet = new ethers.Wallet(privateKey, provider);

    console.log('address =>',wallet.address);

    const addr1 = '0x1d99d05a9616973ba67751e7dd3600abb29d9698';
    const addr2 = '0x38b39be0a93c901c138f3ca7e665ff3f7747a561';
    const types = 1;

    // 按照Solidity合约的方式对消息进行格式化和哈希
    const hash1 = ethers.solidityPackedKeccak256(["address", "address"], [addr1, addr2]);
    const hash2 = ethers.solidityPackedKeccak256(["uint"], [types]);
    const messageHash = ethers.solidityPackedKeccak256(["bytes32", "bytes32"], [hash1, hash2]);

    console.log('finalHash =>:', messageHash);
    const signature = await wallet.signMessage(ethers.getBytes(messageHash));
    console.log('signature =>',signature);
    const { r, s, v } = ethers.Signature.from(signature);

    console.log("r============>: ", r);
    console.log("s============>: ", s);
    console.log("v============>: ", v);
  
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
