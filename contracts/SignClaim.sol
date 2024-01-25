// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
contract SignClaim is Ownable {

    mapping(address => uint) public userNonce;

    address public signer = 0xa89CDa0dB7e7fEa6cb46b00cd3ee293ae1967926;

    function setSigner(address _newSigner)external onlyOwner{
        signer = _newSigner;
    }
 
    function getUserMessageHash(address _account,address _token,uint _amount,uint _expirationTime,uint _nonce)public virtual pure returns(bytes32){
        return keccak256(abi.encodePacked(_account,_token,_amount,_expirationTime,_nonce));
    }

    function verify(bytes32 _msgHash, bytes memory _signature) public view returns (bool) {
        bytes32 _ethSignedMessageHash = ECDSA.toEthSignedMessageHash(_msgHash); 
        return ECDSA.recover(_ethSignedMessageHash, _signature) == signer;
    }

}
