// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "./CLToken.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Vendor is Ownable {

  CLToken token;

  // 設置  0.1 ETH 換 200 CLT
  uint256 public tokensPerEth = 2000;

  event BuyTokens(address buyer, uint256 amountOfETH, uint256 amountOfTokens);

  constructor(address tokenAddress) {
    token = CLToken(tokenAddress);
  }

  function addToken(address tokenAddress, uint amount) public{
    IERC20(tokenAddress).transferFrom(msg.sender, address(this), amount);
  }

  /**
  * 以 ETH 買 CLT
  */
  function buyTokens() public payable returns (uint256 tokenAmount) {
    require(msg.value > 0, "Send ETH to buy some tokens");

    uint256 amountToBuy = msg.value * tokensPerEth;

    // 確認餘額是否足夠
    uint256 vendorBalance = token.balanceOf(address(this));
    require(vendorBalance >= amountToBuy, "Vendor contract has not enough tokens in its balance");

    // transfer CLT 至 user
    (bool sent) = token.transfer(msg.sender, amountToBuy);
    require(sent, "Failed to transfer token to user");

    emit BuyTokens(msg.sender, msg.value, amountToBuy);

    return amountToBuy;
  }


  /**
  * Onwer 可提取 ETH 出來
  */
  function withdraw() public onlyOwner {
    uint256 ownerBalance = address(this).balance;
    require(ownerBalance > 0, "Owner has not balance to withdraw");

    (bool sent,) = msg.sender.call{value: address(this).balance}("");
    require(sent, "Failed to send user balance back to the owner");
  }

    // 賣 token 換 ETH
    function sellTokens(uint256 tokenAmountToSell) public {
    // 檢查 user 要賣的 token > 0
      require(tokenAmountToSell > 0, "Specify an amount of token greater than zero");

      // 檢查使用者餘額足夠
      uint256 userBalance = token.balanceOf(msg.sender);
      require(userBalance >= tokenAmountToSell, "Your balance is lower than the amount of tokens you want to sell");

      // 檢查合約的餘額是否足夠
      uint256 amountOfETHToTransfer = tokenAmountToSell / tokensPerEth;
      uint256 ownerETHBalance = address(this).balance;
      require(ownerETHBalance >= amountOfETHToTransfer, "Vendor has not enough funds to accept the sell request");

      (bool sent) = token.transferFrom(msg.sender, address(this), tokenAmountToSell);
      require(sent, "Failed to transfer tokens from user to vendor");


      (sent,) = msg.sender.call{value: amountOfETHToTransfer}("");
      require(sent, "Failed to send ETH to the user");
  }
}