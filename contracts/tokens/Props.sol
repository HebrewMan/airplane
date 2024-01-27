// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import '../Withdraw.sol';
contract Props is ERC1155, Ownable, ERC1155Supply,ERC1155Burnable,Withdraw{

    string public name;
    string public baseURI;

    uint public counter;
    uint[] public propsPrice = [1 ether,2 ether,3 ether,4 ether];

    address public signer = 0x34D1330e3BA0B2cfB0fa606CAD0850Dc3eDDdCcd;
    address public AIC = 0x4dbFf8BEAF5cDA3cd4f8eFB472b12e99EbA544c2;

    mapping(address=>bool) public mintFree;

    event Minted(uint id,uint indexed itemId,uint indexed amount,uint indexed price, string inviteCode);

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

    function setSigner(address _newSigner)external onlyOwner{
        signer = _newSigner;
    }

    function setpropsPrice(uint[] calldata _prices) public onlyOwner {
        propsPrice = _prices;
    }

    function mint(
        address account,
        uint256 id,
        uint256 amount,
        string calldata inviteCode
    ) public payable{
        require(propsPrice[id-1]>0,"The current id does not exist.");
        require(msg.value >= propsPrice[id-1]*amount);
        counter++;
        _mint(account, id, amount, "0x");
        IERC20(AIC).transferFrom(msg.sender, address(this), propsPrice[id-1]*amount);
        emit Minted(id,counter,amount,propsPrice[id-1]*amount,inviteCode);
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

     function _withdraw(address _to,uint _amount) private {
        (bool sent,) = payable(_to).call{value: _amount}("");
        require(sent, "Failed to send Ether");
    }

}