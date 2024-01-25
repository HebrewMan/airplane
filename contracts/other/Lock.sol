// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";
contract Lock is Ownable{

    uint public unLockTime = 30;

    mapping(address => LockData) public userLocked;

    struct LockData{
        uint amount;
        uint lockTime;
        bool isLocked;
    }

    event Locked(address indexed user, uint indexed amount,uint indexed unLockTime);
    event UnLocked(address indexed user, uint indexed amount,uint indexed remaining);

    function lock(uint _amount)external payable {
        require(userLocked[msg.sender].amount==0,"user locked amount >0");
        require(msg.value>=_amount,"msg.value so below");
        require(!userLocked[msg.sender].isLocked,"This user is locked.");
        userLocked[msg.sender] = LockData(_amount,unLockTime + block.timestamp,true);
        _withdraw(address(this),_amount);
        emit Locked(msg.sender,_amount,userLocked[msg.sender].lockTime);
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

    fallback() external payable {}
    receive() external payable {}

}
