// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;


contract LotteryGameETH {
    address public owner;
    address payable[] public players;
    uint public lotteryId;
    mapping (uint => address payable) public lotteryHistory;
    address payable winner;
    bool sent;
    address tokenAddress;

    constructor() payable {
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
        require(msg.sender != owner, "owner cannot join");


        // 放入 players
        players.push(payable(msg.sender));
    }

    function getRandomNumber() public view returns (uint) {
        return uint(keccak256(abi.encodePacked(owner, block.timestamp)));
    }

    function pickWinner() public onlyOwner{
        require(msg.sender == owner);
        uint index = getRandomNumber() % players.length;
        winner = players[index];
        players[index].transfer(address(this).balance);

        lotteryHistory[lotteryId] = players[index];
        lotteryId++;

        // reset 參加者清單
        resetLottery();
    }

    function resetLottery() internal{
        players = new address payable[](0);
    }

    function chkIfInGame(address userAddress) public view returns (bool) {
        for (uint i=0; i<players.length; i++) {
            if (players[i] == userAddress) {
                return true;
            }
        }
        return false;
    }
    

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner");
        _;
    }


}