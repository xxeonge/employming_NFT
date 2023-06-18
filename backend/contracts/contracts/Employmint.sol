// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Employmint is ERC721, Ownable {

    error Employmint__TokenIdExceedsLimit();
    error Employmint__TransferForbidded();

    using Counters for Counters.Counter;
    Counters.Counter private currentTokenId;
    uint256 public limit;
    string private url;
    
    constructor(string memory _name, string memory _symbol, uint256 _limit, address _owner,string memory _url) ERC721(_name, _symbol) {
        limit = _limit; 
        transferOwnership(_owner);
        url = _url;
    }
    
    function mintTo(address recipient)
        public
        returns (uint256)
    {
        // limit을 0으로 설정하면 제한 없이 mint 가능
        if(limit > 0 && limit <= currentTokenId.current())
            revert Employmint__TokenIdExceedsLimit();
        currentTokenId.increment();
        uint256 newItemId = currentTokenId.current();
        _safeMint(recipient, newItemId);
        return newItemId;
    }

    function _transfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override {
        revert Employmint__TransferForbidded();
    }


    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        //_requireMinted(tokenId);
        return string(abi.encodePacked(url));
    }
}