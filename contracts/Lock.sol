// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";
contract Lock is Ownable{

    uint public unLockTime = 300;
    uint public lockAmount = 1 ether;
    bool public pause;

    mapping(address => uint) public userLockedTime;

    event Locked(address indexed user, uint indexed amount,uint indexed unLockTime);
    event UnLocked(address indexed user, uint indexed amount,uint indexed remaining);

    function lock()external payable {
        require(!pause,"pause true.");
        require(userLockedTime[msg.sender] == 0,"user already locked.");
        require(msg.value>=lockAmount,"msg.value so below");
        userLockedTime[msg.sender] = unLockTime + block.timestamp;
        _withdraw(address(this),lockAmount);
        emit Locked(msg.sender,lockAmount,userLockedTime[msg.sender]);
    }

    function unLock(uint _amount)external{
        require(userLockedTime[msg.sender] > lockAmount,"user amount error.");
        require(userLockedTime[msg.sender] <= block.timestamp,"user amount error.");
        _withdraw(msg.sender,_amount);
        emit UnLocked(msg.sender,_amount,userLockedTime[msg.sender]);
    }

    function _withdraw(address _to,uint _amount) private {
        (bool sent,) = payable(_to).call{value: _amount}("");
        require(sent, "Failed to send Ether");
    }

    function setLockTime(uint _time)external onlyOwner{
        unLockTime = _time;
    }

    function setPause(bool _bool)external onlyOwner{
        pause = _bool;
    }

    fallback() external payable {}
    receive() external payable {}

}
