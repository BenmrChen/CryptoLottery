import baycAbi from "../../external/bayc.json"; // external contract

import accountContract from "../../artifacts/contracts/Account.sol/Account.json";
import account_contract_address from "../../address/Account.json";

import CLToken from "../../artifacts/contracts/CLToken.sol/CLToken.json";
import cl_token_address from "../../address/CLToken.json";

import LotteryGameContract from "../../artifacts/contracts/LotteryGame.sol/LotteryGame.json";
import lottery_game_contract_address from "../../address/LotteryGame.json";

import LotteryNFTToken from "../../artifacts/contracts/LotteryNFT.sol/LotteryNFT.json";
import lottery_nft_token_address from "../../address/LotteryNFT.json";

import VendorContract from "../../artifacts/contracts/Vendor.sol/Vendor.json";
import vendor_contract_address from "../../address/Vendor.json";

import StakingContract from "../../artifacts/contracts/Staking.sol/Staking.json";
import staking_contract_address from "../../address/Staking.json";

// old
import nftAbi from "../../external/nft.json";

export const account_contract = {
  address: account_contract_address.address,
  abi: accountContract.abi,
};

// 代幣 token
export const cl_token = {
  address: cl_token_address.address,
  abi: CLToken.abi,
};

export const lottery_game = {
  address: lottery_game_contract_address.address,
  abi: LotteryGameContract.abi,
};

export const vendor_contract = {
  address: vendor_contract_address.address,
  abi: VendorContract.abi,
};

export const staking_contract = {
  address: staking_contract_address.address,
  abi: StakingContract.abi,
};

export const lottery_nft = {
  address: lottery_nft_token_address.address,
  abi: LotteryNFTToken.abi,
};

export const bayc_contract = {
  address: "0x8FFC91DB3C4cD77250130828a08926CC73B0d366",
  abi: baycAbi,
};

export const ERC721_contract = {
  abi: nftAbi,
};

export const market_contract = {
  address: vendor_contract_address.address,
  abi: VendorContract.abi,
};
