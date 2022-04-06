// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { ethers } = require("hardhat")
require("@nomiclabs/hardhat-ethers");
// const fs = require('fs');
const Fs = require('@supercharge/filesystem')


const deployContract = async (name, params = []) => {
  const contractFactory = await ethers.getContractFactory(name)
  const contract = await contractFactory.deploy(...params)
  await contract.deployed()
  console.log(`${name} address:`, contract.address)
  // genderate file
  try {
    await Fs.ensureFile(`./address/${name}.json`)
    await Fs.writeFile(`./address/${name}.json`, JSON.stringify({ address: contract.address }, null, 2));
    console.log(`update contract address to ../address/${name}.json`);
  } catch (e) {
    console.log(e)
  }
  return contract
}

async function main() {
  const deployers = await ethers.getSigners();
  const deployer = deployers[0].address
  // We get the contract to deploy
  const initSupply = 5000 * 10 ** 4;
  const CLToken = await deployContract('CLToken', [initSupply])
  const Vendor = await deployContract('Vendor', [CLToken.address])
  const LotteryNFT = await deployContract('LotteryNFT')
  const LotteryGame = await deployContract('LotteryGame')
  const Account = await deployContract('Account', [CLToken.address, LotteryNFT.address])

  await CLToken.approve(Vendor.address, 1000000)
  await Vendor.addToken(CLToken.address, 1000000)
  console.log('done!')
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
