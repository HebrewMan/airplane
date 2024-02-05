// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
contract Game is Ownable{

    address public airNft;
    address public proNft;
    mapping(uint=>uint) airBind;

    event AirBurned(uint indexed airitemId,uint indexed id, uint indexed amount);
    event ProBurned(uint indexed proItemId,uint indexed airitemId, uint indexed proId);

    constructor(address _air,address _pro){
        airNft = _air;
        proNft = _pro;
    }

    function burnAir(uint256 _airitemId, uint _id) public {
        IERC1155(airNft).safeTransferFrom(msg.sender,address(0xdead),_id,1,"");
        emit AirBurned(_airitemId,_id,1);
    } 

    function burnPro(uint _proItemId, uint256 _airitemId, uint _id,uint256 _value) public {
        require(airBind[_airitemId]==0,"Already Bind");
        airBind[_airitemId] = _proItemId;
        IERC1155(proNft).safeTransferFrom(msg.sender,address(0xdead),_id,_value,"");
        emit ProBurned(_proItemId,_airitemId,_id);
    }

    function checkBind(uint airId)public view returns(uint){
        return airBind[airId];
    }
}