pragma solidity 0.4.24;

contract PatientRecord {
  string patientImage;
  address public patient;

    modifier restricted() {
      require(msg.sender == patient);
      _;
  }

  function setPatientImage(string x) public restricted {
    patientImage = x;
  }

  function getPatientImage() public restricted view returns (string) {
    return patientImage;
  }

  function PatientRecord() public {
       patient = msg.sender;//who is attempting to create the contract
  }


}


// contract Campaign {
    
//     struct Request {
//         string description;
//         uint value;
//         address recipient;
//         bool complete;
//         uint approvalCount; //value type - need to initialize
//         mapping(address => bool) approvals; //reference type - no need to initialize as there is not value, only lookup
//     }
//     //This is not an instance of a variable - cannot modify it in the functions
//     Request[] public requests;
//     address public manager;
//     uint public minimumContribution;
//     mapping(address => bool) public approvers;
//     uint public approversCount;

    
//     modifier restricted() {
//         require(msg.sender == manager);
//         _;
//     }

//     function Campaign(uint minimum, address creator) public {
//         manager = creator;//who is attempting to create the contract
//         minimumContribution = minimum;
//     }
    
//     function contribute() public payable {
//         require(msg.value > minimumContribution);
//         approvers[msg.sender] = true;
//         approversCount++;
//     }
    
//     function createRequest(string description, uint value, address recipient) 
//         public restricted {
//             Request memory newRequest = Request({
//                description: description,
//                value: value,
//                recipient: recipient,
//                complete: false,
//                approvalCount: 0
//             });
//             requests.push(newRequest);
//     }
    
//     function approveRequest(uint index) public {
//         Request storage request = requests[index];
        
//         require(approvers[msg.sender]);
//         require(!request.approvals[msg.sender]);
        
//         request.approvals[msg.sender] = true;
//         request.approvalCount++;
//     }
    
//     function finalizeRequest(uint index) public restricted {
//         Request storage request = requests[index];
//         require(request.approvalCount > (approversCount/2));
//         require(!request.complete);
    
//         request.recipient.transfer(request.value);
//         request.complete = true;
        
//     }

//     function getSummary() public view returns (
//         uint, uint, uint, uint, address
//     ) {
//         return (
//             minimumContribution,
//             this.balance,
//             requests.length,
//             approversCount,
//             manager
//         );
//     }

//     function getRequestsCount() public view returns (uint) {
//         return requests.length;
//     }
    
// }
