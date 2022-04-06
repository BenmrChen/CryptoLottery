// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./LotteryNFT.sol";
import "./LotteryGame.sol";

contract Staking {
    LotteryNFT NFT;
    mapping (address => uint) public stakingHistory;

    constructor(address NFTAddress) {
        NFT = LotteryNFT(NFTAddress);
    }

    function staking (uint _tokenId) public {
        NFT.transferFrom(msg.sender, address(this), _tokenId);
        stakingHistory[msg.sender] = _tokenId;
    }

    function chkIfStaking (address _userAddress) public view returns (uint) {
        return stakingHistory[_userAddress];
    } 
}