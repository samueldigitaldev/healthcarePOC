var PatientFactory = artifacts.require("./PatientFactory.sol");

module.exports = function(deployer) {
  deployer.deploy(PatientFactory);
};
