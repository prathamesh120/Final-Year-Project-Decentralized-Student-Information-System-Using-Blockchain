const {ethers} = require("hardhat");



async function main() 
{
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const MyContract = await ethers.getContractFactory("StudentInformationSystem");
  const myContract = await MyContract.deploy();

  console.log("MyContract address:", myContract.address);


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().then(() => process.exit(0)).catch((error) => {
  console.error(error);
  process.exit(1);
});