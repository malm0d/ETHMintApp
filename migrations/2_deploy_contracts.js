var MalcolmERC20 = artifacts.require("MalcolmERC20");
var MalcolmERC721 = artifacts.require("MalcolmERC721");

module.exports = function (deployer) {
    deployer.deploy(MalcolmERC20);
    deployer.deploy(MalcolmERC721);
  };
