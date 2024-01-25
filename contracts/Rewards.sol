// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
contract Rewards is Ownable{

    mapping(address => uint) public userNonce;
    
    address public AIC = 0x4dbFf8BEAF5cDA3cd4f8eFB472b12e99EbA544c2;
    address public signer = 0x34D1330e3BA0B2cfB0fa606CAD0850Dc3eDDdCcd;

    event Claimed(uint indexed _type,uint indexed signId,uint indexed amount,uint endTime,uint nonce);
    //这里的endTIme 是过期时间
    function claimAIC(uint _signId,uint _amount,uint _endTime,uint _nonce,bytes calldata _signature)external{
        require(userNonce[msg.sender] == _nonce,"Nonce: Nonce error");
        require(block.timestamp <= _endTime,"Time:The signature has expired.");

        bytes32 _msgHash = getUserMessageHash(0,msg.sender,_amount,_endTime,_nonce);
        require(verify(_msgHash, _signature), "Signature: Error signature.");

        userNonce[msg.sender] ++;

        IERC20(AIC).transfer(msg.sender,_amount);

        emit Claimed(0,_signId,_amount,_endTime,_nonce);
    }

    function claimAIA(uint _signId,uint _amount,uint _endTime,uint _nonce,bytes calldata _signature)external{
        require(userNonce[msg.sender] == _nonce,"Nonce: Nonce error");
        require(block.timestamp <= _endTime,"Time:The signature has expired.");

        bytes32 _msgHash = getUserMessageHash(1,msg.sender,_amount,_endTime,_nonce);
        require(verify(_msgHash, _signature), "Signature: Error signature.");

        userNonce[msg.sender] ++;

        (bool sent,) = payable(msg.sender).call{value: _amount}("");
        require(sent, "Failed to send Ether");

        emit Claimed(1,_signId,_amount,_endTime,_nonce);
    }

    function setSigner(address _newSigner)external onlyOwner{
        signer = _newSigner;
    }
 
    function getUserMessageHash(uint _type,address _account,uint _amount,uint _endTime,uint _nonce)public virtual pure returns(bytes32){
        return keccak256(abi.encodePacked(_type,_account,_amount,_endTime,_nonce));
    }

    function verify(bytes32 _msgHash, bytes memory _signature) public view returns (bool) {
        bytes32 _ethSignedMessageHash = ECDSA.toEthSignedMessageHash(_msgHash); 
        return ECDSA.recover(_ethSignedMessageHash, _signature) == signer;
    }

    function withdraw(address _erc20,address _to,uint _amount)external onlyOwner{
        IERC20(_erc20).transferFrom(msg.sender,_to,_amount);
    }
    
    function withdraw(address _to,uint _amount)external onlyOwner{
        (bool sent,) = payable(_to).call{value: _amount}("");
        require(sent, "Failed to send Ether");
    }

    fallback() external payable {}
    receive() external payable {}

}
