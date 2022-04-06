// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./CLToken.sol";
import "./LotteryNFT.sol";
import "./LotteryGame.sol";
import "./LotteryGameETH.sol";
import "./Staking.sol";

contract Account {
    CLToken token;
    LotteryNFT NFT;
    Staking staking;
    LotteryGame lotteryGame;
    LotteryGameETH lotteryGameETH;


    constructor(address tokenAddress, address NFTAddress) {
        token = CLToken(tokenAddress);
        NFT = LotteryNFT(NFTAddress);
    }

    // tood: 是否參與本期樂透、是否質押
    function getAccountBalance() public view returns (uint, uint, uint, bool) {
        uint tokenBalance = token.balanceOf(msg.sender);
        uint NFTBalance = NFT.balanceOf(msg.sender);
        uint stakingNFT = staking.chkIfStaking(msg.sender);
        bool ifInGame = lotteryGame.chkIfInGame(msg.sender);
        return (tokenBalance, NFTBalance, stakingNFT, ifInGame);
    }
}