// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract StudentInformationSystem {

    event StudentRegistered(address indexed studentAddress, uint256 indexed aadharNumber);

    //uint256[] public registeredAadharNumbers;

    struct BasicInfo {
        string name;
        string addresss;
        string dateOfBirth;
        string mailid;
        string parentsName;
        string mobileNumber;
        string parentsMobileNumber;
        string caste;
        uint256 aadharNumber;
    }

    struct MarksInfo {
        string tenMarksheet;
        string twelveMarksheet;
        string diploma;
        string results;
    }

    struct OtherInfo {
        string yearOfAdmission;
        string branch;
        string feesPaid;
        string scholarshipStatus;
        string achievements;
        string otherCourses;
        string paperPublished;
        string placements;
    }

    struct AccommodationInfo {
        string accommodationHostel;
        string roomAddress;
        string busFacility;
    }

    mapping(uint256 => string[]) private value;
    mapping(address => BasicInfo) public basicInfoMap;
    mapping(uint256 => address) private aadharToAddress;
    mapping(address => MarksInfo) public marksInfoMap;
    mapping(address => OtherInfo) public otherInfoMap;
    mapping(address => AccommodationInfo) public accommodationInfoMap;
    mapping(address => mapping(string => bytes)) pdfFiles;
    mapping(string => address) aadhaarToAddress;

    function registerBasicInfo(string memory _name, string memory _address, string memory _dateOfBirth, string memory _mailid, string memory _parentsName, string  memory _mobileNumber, string memory _parentsMobileNumber, string memory _caste, uint256 _aadharNumber) public {
        require(aadharToAddress[_aadharNumber] == address(0), "This Aadhar number is already registered");
        address aadharNumber = msg.sender;
        basicInfoMap[aadharNumber] = BasicInfo(_name, _address, _dateOfBirth, _mailid, _parentsName, _mobileNumber, _parentsMobileNumber, _caste, _aadharNumber);
        aadharToAddress[_aadharNumber] = aadharNumber;
       // registeredAadharNumbers.push(_aadharNumber);
        emit StudentRegistered(aadharNumber, _aadharNumber);
    }

    function registerMarksInfo(string memory _tenMarksheet, string memory _twelveMarksheet, string memory _diploma, string memory _results) public {
        address aadharNumber = msg.sender;
        marksInfoMap[aadharNumber] = MarksInfo(_tenMarksheet, _twelveMarksheet, _diploma, _results);
    }

    function registerOtherInfo(string memory _yearOfAdmission, string memory _branch, string memory _feesPaid,string memory _scholarshipStatus, string memory _achievements, string memory _otherCourses, string memory _paperPublished, string memory _placements) public {
        address aadharNumber = msg.sender;
        otherInfoMap[aadharNumber] = OtherInfo(_yearOfAdmission, _branch, _feesPaid, _scholarshipStatus, _achievements, _otherCourses, _paperPublished, _placements);
    }

    function registerAccommodationInfo(string memory _accommodationHostel, string memory _roomAddress, string memory _busFacility) public {
        address aadharNumber = msg.sender;
        accommodationInfoMap[aadharNumber] = AccommodationInfo(_accommodationHostel, _roomAddress, _busFacility);
    }

    function updateStudentInfoByAadhar(uint256 _aadharNumber, BasicInfo memory _basicInfo, MarksInfo memory _marksInfo, OtherInfo memory _otherInfo, AccommodationInfo memory _accommodationInfo) public {
    address studentAddress = aadharToAddress[_aadharNumber];
    require(studentAddress != address(0), "This Aadhar number is not registered");
    require(msg.sender == studentAddress, "Only the student can update their information");
    basicInfoMap[studentAddress] = _basicInfo;
    marksInfoMap[studentAddress] = _marksInfo;
    otherInfoMap[studentAddress] = _otherInfo;
    accommodationInfoMap[studentAddress] = _accommodationInfo;
    //emit StudentInfoUpdated(studentAddress);
    }

   function uploadPDF(uint256 _aadhaar, string memory _url) public {
        value[_aadhaar].push(_url);
    }

    function getpdf(uint256 _aadhaar, uint256 _index) public view returns (string memory) {
        return value[_aadhaar][_index];
    }

//    function uploadPDF(string memory _fileName, bytes memory _fileData) public {
//     pdfFiles[msg.sender][_fileName] = _fileData;
//    }
    //  function uploadPDF(string memory _fileName, bytes memory _fileData, string memory _aadhaar) public {
    //     pdfFiles[msg.sender][_fileName] = _fileData;
    //     aadhaarToAddress[_aadhaar] = msg.sender;
    // }

    // function getPDFByAadhaar(string memory _aadhaar, string memory _fileName) public view returns (bytes memory) {
    //     require(aadhaarToAddress[_aadhaar] != address(0), "Aadhaar not found");
    //     address uploader = aadhaarToAddress[_aadhaar];
    //     return pdfFiles[uploader][_fileName];
    // }






   function getStudentInfoByAadhar(uint256 _aadharNumber) public view returns (BasicInfo memory, MarksInfo memory, OtherInfo memory, AccommodationInfo memory) {
    address studentAddress = aadharToAddress[_aadharNumber];
    require(studentAddress != address(0), "This Aadhar number is not registered");
    return (basicInfoMap[studentAddress], marksInfoMap[studentAddress], otherInfoMap[studentAddress], accommodationInfoMap[studentAddress]);
}

   function isStudentRegistered(uint256 _aadharNumber) public view returns (bool) {
    return aadharToAddress[_aadharNumber] != address(0);
}

  
}
