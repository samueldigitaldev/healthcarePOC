pragma solidity ^0.4.19;


contract PatientFactory{
    
    address[] public deployedPatients;
    
    function createPatient() public {
        address newPatient = new Patient(msg.sender);
        deployedPatients.push(newPatient);
    }
    
    function getDeployedPatients() public view returns (address[]) {
        return deployedPatients;
    }
}


contract Patient {
    
    string patientImage;
    address public manager;
    uint16 visitCount = 0;

    struct PatientVisit {
        string date;
        string reasonOfVisit;
        string prescription;
    }

    struct PatientRecord {
      string name;
      uint8 age;
      string sex;
      uint16 visitCount;
      address doctor;
      mapping (uint => PatientVisit) visit;

    }
    
    
    PatientRecord[] public patient;

    mapping(address => bool) public doctor;

    modifier restricted() {
        require(msg.sender == manager);
      _;
    }

    function Patient(address creator) public {
        manager = creator;
    }
            
    function _createPatientRecord(string _name, uint8 _age, string _sex) public restricted {
        PatientRecord memory newPatientRecord = PatientRecord(_name, _age, _sex, 0, msg.sender);
        patient.push(newPatientRecord);
    }
    
    function addPatientVisit(string _date, string _reasonOfVisit, string _prescription) public restricted {
        PatientVisit memory newVisit = PatientVisit({date: _date, reasonOfVisit: _reasonOfVisit, prescription: _prescription});
        patient[visitCount].visit[visitCount] = newVisit;
        visitCount++;
    }


    function setPatientImage(string x) public restricted {
      patientImage = x;
    }

    function getPatientImage() public restricted view returns (string) {
      return patientImage;
    }


}
