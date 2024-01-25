// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";
contract Lock is Ownable{

    uint public unLockTime = 300;
    uint public lockAmount = 1 ether;
    bool public pause;

    mapping(address => LockData) public userLocked;

    struct LockData{
        uint amount;
        uint lockTime;
    }

    event Locked(address indexed user, uint indexed amount,uint indexed unLockTime);
    event UnLocked(address indexed user, uint indexed amount,uint indexed remaining);

    function lock()external payable {
        require(!pause,"pause true.");
        require(userLocked[msg.sender].amount == 0,"user already locked.");
        require(msg.value>=lockAmount,"msg.value so below");
        userLocked[msg.sender] = LockData(lockAmount,unLockTime + block.timestamp);
        _withdraw(address(this),lockAmount);
        emit Locked(msg.sender,lockAmount,userLocked[msg.sender].lockTime);
    }

    function unLock(uint _amount)external{
        require(userLocked[msg.sender].amount >= _amount,"user amount error.");
        require(userLocked[msg.sender].lockTime <= block.timestamp,"user amount error.");
        userLocked[msg.sender].amount -= _amount;
        _withdraw(msg.sender,_amount);
        emit UnLocked(msg.sender,_amount,userLocked[msg.sender].amount);
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
