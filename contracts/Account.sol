// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./CLToken.sol";
import "./LotteryNFT.sol";
import "./LotteryGame.sol";


contract Account {
    CLToken token;
    LotteryNFT NFT;

    constructor(address tokenAddress, address NFTAddress) {
        token = CLToken(tokenAddress);
        NFT = LotteryNFT(NFTAddress);
    }

    // tood: 是否參與本期樂透、是否質押
    function getAccountBalance() public view {
        uint256 tokenBalance = token.balanceOf(msg.sender);
        uint256 NFTBalance = NFT.balanceOf(msg.sender);

    }
}