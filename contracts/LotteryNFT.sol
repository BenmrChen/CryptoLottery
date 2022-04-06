// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./CLToken.sol";

contract LotteryNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
    CLToken token;

    constructor() ERC721("LotteryNFT", "LNFT") {}

    function safeMintOwer(address to) public payable onlyOwner {
        require(msg.value >= 0.3 ether, "Not sufficient ETH to mint");
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    function safeMintUser() public payable {
        require(msg.value >= 0.3 ether, "Not sufficient ETH to mint");
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
    }
}