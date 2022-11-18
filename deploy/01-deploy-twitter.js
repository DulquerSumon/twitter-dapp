const { network } = require("hardhat");
const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  const twitter = await deploy("Twitter", {
    from: deployer,
    log: true,
    args: [],
    waitConfirmations: network.config.blockConfirmations || 1,
  });
  if (network.config.chainId == 5 && process.env.ETHERSCAN_API_KEY) {
    await verify(twitter.address, []);
  }
  console.log(`Contract deployed at : ${twitter.address}`);
};
