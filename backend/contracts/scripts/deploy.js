const hre = require("hardhat");

async function main() {

  const EmploymintFactory = await hre.ethers.getContractFactory("EmploymintFactory");
  const employmint = await EmploymintFactory.deploy();

  await employmint.deployed();
  console.log("=EmploymintFactory== ", employmint.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
