var PatientRecord = artifacts.require("./PatientRecord.sol");

module.exports = function(deployer) {
  deployer.deploy(PatientRecord);
};
