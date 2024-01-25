// import {ethers} from 'ethers';

// async function signBondFunction() {

//     const privateKey = "e714d873c046aa25df761d7f0f263caa2d4594778c8174e075bfeb26a9b968f1";
//     //http://http-testnet.aitd.io
//     const provider = new ethers.providers.JsonRpcProvider('http://http-testnet.aitd.io');
//     const wallet = new ethers.Wallet(privateKey, provider);
    
//     console.log('address =>',wallet.address);
   
//     // 要签名的参数
//     const addr1 = '0x1d99d05a9616973ba67751e7dd3600abb29d9698';
//     const addr2 = '0x38b39be0a93c901c138f3ca7e665ff3f7747a561';
//     const types = 1;

//     // 按照Solidity合约的方式对消息进行格式化和哈希
//     const hash1 = ethers.utils.solidityKeccak256(["address", "address"], [addr1, addr2]);
//     const hash2 = ethers.utils.solidityKeccak256(["uint"], [types]);
//     const messageHash = ethers.utils.solidityKeccak256(["bytes32", "bytes32"], [hash1, hash2]);
//     console.log('messageHash===>: ',messageHash);

//     // 签名哈希
//     const signature = await wallet.signMessage(ethers.utils.arrayify(messageHash));
//     const { r, s, v } = ethers.utils.splitSignature(signature);

//     console.log('Signature:', signature);
//     console.log('r:', r);
//     console.log('s:', s);
//     console.log('v:', v);

// }

// signBondFunction().catch(console.error);