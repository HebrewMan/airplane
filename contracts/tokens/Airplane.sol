// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import '../Withdraw.sol';
contract Airplane is ERC1155, Ownable, ERC1155Supply,ERC1155Burnable,Withdraw{

    string public name;
    string public baseURI;

    address public signer = 0x34D1330e3BA0B2cfB0fa606CAD0850Dc3eDDdCcd;
    mapping(address=>uint) public userNonce;
    mapping(address=>bool) public mintFree;

    uint[] public airplanePrice = [1 ether,2 ether,3 ether,4 ether];

    event AirMinted(uint indexed id,uint indexed amount,uint indexed price, string inviteCode);
    event SignMinted(uint indexed itemId,uint indexed id,uint indexed amount,uint nonce);

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

    function setAirplanePrice(uint[] calldata _prices) public onlyOwner {
        airplanePrice = _prices;
    }

    function mintForFree() public{
        require(!mintFree[msg.sender],"The user has already minted.");

        mintFree[msg.sender] = true;
        _mint(msg.sender, 1, 1, "0x");
        emit AirMinted(1,1,0,"0x");
    }

    function mintBySignForRewrads(uint itemId,uint id,uint nonce,bytes calldata signature)external{
        require(userNonce[msg.sender] == nonce,"Nonce: Nonce error");
        bytes32 _msgHash = getUserMessageHash(msg.sender,id,nonce);
        require(verify(_msgHash, signature), "Signature: Error signature.");
        _mint(msg.sender, id, 1, "0x");
        emit SignMinted(itemId,id,1,nonce);
    }

    function mint(
        uint256 id,
        uint256 amount,
        string calldata inviteCode
    ) public payable{
        require(id>1 && id<6,"The current id does not exist.");
        require(msg.value >= airplanePrice[id-2]*amount);
        _mint(msg.sender, id, amount, "0x");
        _withdraw(address(this),msg.value);
        emit AirMinted(id,amount,airplanePrice[id-2]*amount,inviteCode);
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


    function getUserMessageHash(address _account,uint _id,uint _nonce)public virtual pure returns(bytes32){
        return keccak256(abi.encodePacked(_account,_id,_nonce));
    }

    function verify(bytes32 _msgHash, bytes memory _signature) public view returns (bool) {
        bytes32 _ethSignedMessageHash = ECDSA.toEthSignedMessageHash(_msgHash); 
        return ECDSA.recover(_ethSignedMessageHash, _signature) == signer;
    }


}