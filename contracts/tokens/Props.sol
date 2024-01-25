// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import '../Withdraw.sol';
contract Props is ERC1155, Ownable, ERC1155Supply,ERC1155Burnable,Withdraw{

    string public name;
    string public baseURI;

    uint public basePrice = 1 ether;

    mapping(address=>uint) public userNonce;

    uint[] public airplanePrice = [1 ether,2 ether,3 ether,4 ether];

    event Minted(uint indexed id,uint indexed amount,string indexed inviteCode);

    constructor(
        string memory _name,
        string memory _baseURI
    ) ERC1155("") {
        name = _name;
        baseURI = _baseURI;
    }

    function uri(
        uint256 _tokenId
    ) public view override returns (string memory) {
        return string(abi.encodePacked(baseURI,Strings.toString(_tokenId),".json"));
    }

    function setURI(string memory newuri) public onlyOwner {
        baseURI = newuri;
    }

    function setAirplanePrice(uint[] calldata _prices) public onlyOwner {
        airplanePrice = _prices;
    }

    function mint(
        address account,
        uint256 id,
        uint256 amount,
        string calldata inviteCode
    ) public payable{
        require(airplanePrice[id]>0,"The current id does not exist.");
        require(msg.value >= airplanePrice[id]*amount);
        _mint(account, id, amount, "0x");
        emit Minted(id, amount,inviteCode);
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal override(ERC1155, ERC1155Supply) {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

    

}