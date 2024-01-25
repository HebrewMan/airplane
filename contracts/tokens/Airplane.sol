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

    uint public basePrice = 1 ether;

    address public signer = 0xa89CDa0dB7e7fEa6cb46b00cd3ee293ae1967926;
    mapping(address=>uint) public userNonce;
    mapping(address=>bool) public mintFree;

    uint[] public airplanePrice = [1 ether,2 ether,3 ether,4 ether];

    event Minted(uint indexed id,uint indexed amount,uint indexed price,string inviteCode);

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

    function mintForFree(
        address account,
        uint id,
        uint amount
    ) public{
        require(!mintFree[msg.sender],"The user has already minted.");
        mintFree[msg.sender] = true;
        _mint(account, 0, 1, "0x");
        emit Minted(id, amount,0,"0x");
    }

    function mintBySignForRewrads(address account,uint id,uint nonce,bytes calldata signatrue)external{

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
        emit Minted(id, amount,airplanePrice[id]*amount,inviteCode);
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

    function getUserMessageHash(address _account,uint _nonce)public virtual pure returns(bytes32){
        return keccak256(abi.encodePacked(_account,_nonce));
    }

    function verify(bytes32 _msgHash, bytes memory _signature) public view returns (bool) {
        bytes32 _ethSignedMessageHash = ECDSA.toEthSignedMessageHash(_msgHash); 
        return ECDSA.recover(_ethSignedMessageHash, _signature) == signer;
    }

}