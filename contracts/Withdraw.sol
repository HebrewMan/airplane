// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
contract Withdraw is Ownable{
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