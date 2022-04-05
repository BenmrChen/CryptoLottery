// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "./CLToken.sol";
import "./LotteryNFT.sol";

contract LotteryGame {
    address public owner;
    address payable[] public players;
    uint public lotteryId;
    mapping (uint => address payable) public lotteryHistory;
    address payable winner;

    CLToken token;
    LotteryNFT NFT;

    uint lotteryPriceNormal = 200;
    uint lotteryPriceWithNFT = 160;
    bool sent;


    constructor() {
        owner = msg.sender;
        lotteryId = 1;
    }

    function getWinnerByLottery(uint _lotteryId) public view returns (address payable) {
        return lotteryHistory[_lotteryId];
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function getPlayser() public view returns (address payable[] memory) {
        return players;
    }

    function enter() public payable {
        // Owner 不允許參與
        require(msg.sender != owner);

        uint256 tokenBalance = token.balanceOf(msg.sender);
        if (NFT.balanceOf(msg.sender) > 0) {
            require(tokenBalance > lotteryPriceWithNFT);
            sent = token.transferFrom(msg.sender, address(this), lotteryPriceWithNFT);
        } else {
            require(tokenBalance > lotteryPriceNormal);
            sent = token.transferFrom(msg.sender, address(this), lotteryPriceNormal);
        }
        require(sent, "Failed to transfer tokens from user to vendor");

        // 放入
        players.push(payable(msg.sender));
    }

    function getRandomNumber() public view returns (uint) {
        return uint(keccak256(abi.encodePacked(owner, block.timestamp)));
    }

    function pickWinner() public onlyOwner{
        require(msg.sender == owner);
        uint index = getRandomNumber() % players.length;
        winner = players[index];
        players[index].transfer(token.balanceOf(address(this)));

        lotteryHistory[lotteryId] = players[index];
        lotteryId++;

        // reset 參加者清單
        resetLottery();
    }

    function resetLottery() internal{
        players = new address payable[](0);
    }
    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner");
        _;
    }


}