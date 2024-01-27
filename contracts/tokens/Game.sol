// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
contract Game is Ownable{

    address public nft;

    event Burned(uint indexed itemId,uint indexed id, uint indexed amount);
   
    function burn(address _nft, uint256 _id, uint _itemId,uint256 _value) public {
        IERC1155(_nft).safeTransferFrom(msg.sender,address(0),_id,_value,"");
        emit Burned(_itemId,_id,_value);
    } 
}