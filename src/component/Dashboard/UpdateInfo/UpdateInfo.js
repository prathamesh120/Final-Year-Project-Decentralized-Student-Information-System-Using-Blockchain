import React from "react";
import { Header } from "../../Header/Header";
import "../UpdateInfo/UpdateInfo.css";
import { ethers } from "ethers";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Nav } from "../../Nav/Nav";


//Import ABI Code to interact with smart contract
import StudentInformationSystem from "../../../artifacts/contracts/StudentInformationSystem.sol/StudentInformationSystem.json";

const aadharNum = parseInt(localStorage.getItem("aadharNumber"));
//The contract Address

const studentinformationsystemAddress =
  "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export const UpdateInfo = () => {
  const navigate = useNavigate();
  //Property Variable
  const [showForm, setShowForm] = useState(false);
  const [aadharNumber, setAadharNumber] = useState("");
  const [inputAadhaar, setInputAadhar] = useState("");
  const [basicInfo, setBasicInfo] = useState({
    name: "",
    address: "",
    dateOfBirth: "",
    mailid: "",
    parentsName: "",
    mobileNumber: "",
    parentsMobileNumber: "",
    caste: "",
    aadharNumber: "",
  });

  const [markInfo, setMarkInfo] = useState({
    tenMarksheet: "",
    twelveMarksheet: "",
    diploma: "",
    results: "",
  });

  const [otherInfo, setOtherInfo] = useState({
    yearOfAdmission: "",
    branch: "",
    feesPaid: "",
    scholarshipStatus: "",
    achievements: "",
    otherCourses: "",
    paperPublished: "",
    placements: "",
  });

  const [accommodationInfo, setAccommodationInfo] = useState({
    accommodationHostel: "",
    roomAddress: "",
    busFacility: "",
  });
  
  async function showform(){
    setShowForm(true);

  }

  

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function HandleupdateInfo(e) {
    e.preventDefault();

    if (!basicInfo) return;

    //If Metask exits
    try {
      if (typeof window.ethereum !== "undefined") {
        await requestAccount();
        const providers = new ethers.providers.Web3Provider(window.ethereum);
        const signer = providers.getSigner();
        const contract = new ethers.Contract(
          studentinformationsystemAddress,
          StudentInformationSystem.abi,
          signer
        );
        const aadhar = parseInt(inputAadhaar);
        console.log("hi");
      
          const transaction1 = await contract.updateStudentInfoByAadhar(aadhar, basicInfo, markInfo,otherInfo,accommodationInfo);
        console.log("hi2");
      
      
        console.log("hi2");
        await transaction1.wait();
        setBasicInfo({
          name: "",
          address: aadharNum,
          dateOfBirth: "",
          mailid: "",
          parentsName: "",
          mobileNumber: "",
          parentsMobileNumber: "",
          caste: "",
          aadharNumber: "",
        });
        setMarkInfo({
          tenMarksheet: "",
          twelveMarksheet: "",
          diploma: "",
          results: "",
        });

        setOtherInfo({
          yearOfAdmission: "",
          branch: "",
          feesPaid: "",
          scholarshipStatus: "",
          achievements: "",
          otherCourses: "",
          paperPublished: "",
          placements: "",
        });

        setAccommodationInfo({
          accommodationHostel: "",
          roomAddress: "",
          busFacility: "",
        });
        setShowForm(false);
        
        console.log("End function");
        
      }
    } catch (err) {
      alert(err);
      setShowForm(false);
    }
  }

  // async function registerMarksInfo(e){
  //   e.preventDefault();

  //   if(!markInfo) return;

  //   //If MetaMask exists
  //   if (typeof window.ethereum !== "undefined") {
  //     await requestAccount();
  //     const providers = new ethers.providers.Web3Provider(window.ethereum);
  //     const signer = providers.getSigner();
  //     const contract = new ethers.Contract(
  //       studentinformationsystemAddress,
  //       StudentInformationSystem.abi,
  //       signer
  //     );

  //     const transaction = await contract.registerMarksInfo(
  //       markInfo.tenMarksheet,
  //       markInfo.twelveMarksheet,
  //       markInfo.diploma,
  //       markInfo.results,
  //     );
  //     console.log("markI", markInfo);
  //     setMarkInfo({
  //       tenMarksheet:'',
  //       twelveMarksheet:'',
  //       diploma:'',
  //       results:'',
  //     });

  //     await transaction.wait();

  //     console.log("End markInfo function");
  //   }

  // }

  const handlevalues = (e) => {
    setBasicInfo({
      ...basicInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleMarkInfo = (e) => {
    setMarkInfo({
      ...markInfo,
      [e.target.name]: e.target.value,
    });
  };
  const handleOtherInfo = (e) => {
    setOtherInfo({
      ...otherInfo,
      [e.target.name]: e.target.value,
    });
  };
  const handleAccommodationInfo = (e) => {
    setAccommodationInfo({
      ...accommodationInfo,
      [e.target.name]: e.target.value,
    });
  };
  return (

    <div>
      
      {showForm ? (

<div id="Forms">
<br />
<br />
<br />
<h2>Update Your Information</h2>
<br />
<br />

<div id="">
  <div className="formbox">
    <form onSubmit={HandleupdateInfo}>
    <label htmlFor="name" style={{ color: "black" }}>
              Name
            </label>
            <input
              type="text"
              name="name"
              value={basicInfo.name}
              onChange={handlevalues}
              required
            ></input>

            <label htmlFor="address" style={{ color: "black" }}>
              Address
            </label>
            <input
              type="text"
              name="address"
              value={basicInfo.address}
              onChange={handlevalues}
              required
            ></input>

            <label htmlFor="birthday" style={{ color: "black" }}>
              Birthday
            </label>
            <input
              type="date"
              id="birthday"
              name="dateOfBirth"
              value={basicInfo.dateOfBirth}
              onChange={handlevalues}
              required
            ></input>
            <label htmlFor="mailid" style={{ color: "black" }}>
              Email Id
            </label>
            <input
              type="email"
              id="email"
              name="mailid"
              value={basicInfo.mailid}
              onChange={handlevalues}
              required
            ></input>

            <label htmlFor="parentname" style={{ color: "black" }}>
              Parent Name
            </label>
            <input
              type="text"
              name="parentsName"
              value={basicInfo.parentsName}
              onChange={handlevalues}
              required
            ></input>

            <label htmlFor="phone" style={{ color: "black" }}>
              Mobile Number
            </label>
            <input
              type="tel"
              id="phone"
              name="mobileNumber"
              value={basicInfo.mobileNumber}
              onChange={handlevalues}
              required
            ></input>

            <label htmlFor="parentphone" style={{ color: "black" }}>
              Parent Mobile Number
            </label>
            <input
              type="tel"
              id="phone"
              name="parentsMobileNumber"
              value={basicInfo.parentsMobileNumber}
              onChange={handlevalues}
              required
            ></input>

            <label htmlFor="caste" style={{ color: "black" }}>
              Caste
            </label>
            <input
              type="text"
              name="caste"
              value={basicInfo.caste}
              onChange={handlevalues}
              required
            ></input>

            <label htmlFor="aadharnumber" style={{ color: "black" }}>
              Aadhar Number
            </label>
            <input
              type="tel"
              id="aadharnumber"
              name="aadharNumber"
              value={basicInfo.aadharNumber}
              onChange={handlevalues}
              required
            ></input>

            {/* Mark Info */}
            <label htmlFor="10thmarks" style={{ color: "black" }}>
              10<sup>th</sup> Percentage
            </label>
            <input
              type="tel"
              id="10thmarks"
              name="tenMarksheet"
              value={markInfo.tenMarksheet}
              onChange={handleMarkInfo}
              required
            ></input>

            <label for="12thmarks" style={{ color: "black" }}>
              12<sup>th</sup> Percentage
            </label>
            <input
              type="tel"
              id="12thmarks"
              name="twelveMarksheet"
              value={markInfo.twelveMarksheet}
              onChange={handleMarkInfo}
              required
            ></input>

            <label for="diploma" style={{ color: "black" }}>
              Diploma if
            </label>
            <input
              type="tel"
              id="diploma"
              name="diploma"
              value={markInfo.diploma}
              onChange={handleMarkInfo}
              required
            ></input>

            <label for="result" style={{ color: "black" }}>
              Result
            </label>
            <input
              type="tel"
              id="result"
              name="results"
              value={markInfo.results}
              onChange={handleMarkInfo}
              required
            ></input>

            {/* OtherInfo */}

            <label for="yearofadmission" style={{ color: "black" }}>
              Year Of Admission
            </label>
            <input
              type="number"
              id="yearofadmission"
              name="yearOfAdmission"
              min="1993"
              value={otherInfo.yearOfAdmission}
              onChange={handleOtherInfo}
              required
            ></input>

            <label for="branch" style={{ color: "black" }}>
              Branch
            </label>

            <input
              name="branch"
              id="branch"
              onChange={handleOtherInfo}
              
              value={otherInfo.branch}
              required
            >
            
            </input>

            <label for="feesPaid" style={{ color: "black" }}>
              Fees Paid
            </label>
            <input
              type="tel"
              id="feesPaid"
              name="feesPaid"
              value={otherInfo.feesPaid}
              onChange={handleOtherInfo}
              required
            ></input>

            <label for="scholarshipStatus" style={{ color: "black" }}>
              ScholarShip Status
            </label>
            <input
              type="text"
              id="scholarshipStatus"
              name="scholarshipStatus"
              value={otherInfo.scholarshipStatus}
              onChange={handleOtherInfo}
              
            ></input>

            <label for="achievements" style={{ color: "black" }}>
              Achievements
            </label>
            <input
              type="text"
              id="achievements"
              name="achievements"
              value={otherInfo.achievements}
              onChange={handleOtherInfo}
              required
            ></input>

            <label for="otherCourses" style={{ color: "black" }}>
              Other courses
            </label>
            <input
              type="text"
              id="otherCourses"
              name="otherCourses"
              value={otherInfo.otherCourses}
              onChange={handleOtherInfo}
            ></input>

            <label for="paperPublished" style={{ color: "black" }}>
              Paper Published
            </label>
            <input
              type="text"
              id="paperPublished"
              name="paperPublished"
              value={otherInfo.paperPublished}
              onChange={handleOtherInfo}
        
            ></input>

            <label for="Placements" style={{ color: "black" }}>
              Placements
            </label>
          
            <input
              type="text"
              id="placements"
              name="placements"
              value={otherInfo.placements}
              onChange={handleOtherInfo}
          
            ></input>

            {/* Accommodation Info */}

            <label for="accommodationHostel" style={{ color: "black" }}>
              Accommodation Hostel
            </label>
            
            <input
              type="text"
              id="accommodationHostel"
              name="accommodationHostel"
              value={accommodationInfo.accommodationHostel}
              onChange={handleAccommodationInfo}
            
            ></input>

            <label for="roomAddress" style={{ color: "black" }}>
              Room Address
            </label>
            <input
              type="text"
              id="roomAddress"
              name="roomAddress"
              value={accommodationInfo.roomAddress}
              onChange={handleAccommodationInfo}
              required
            ></input>

            <label for="busFacility" style={{ color: "black" }}>
              Bus Facility
            </label>
    
            <input
              type="text"
              id="busFacility"
              name="busFacility"
              value={accommodationInfo.busFacility}
              onChange={handleAccommodationInfo}
              
            ></input>
            <br></br>
            <br></br>

            <button type="submit">Update</button>
    </form>
  </div>
  <br></br>
</div>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
</div>

      ):(

           <div>
          <h1 style={{ textAlign: "center" }}>
           Update Your Info by Aadhar Number
           </h1>

            <div className="LoginForm">
             <form onSubmit={showform}>
              <div>
            <p>
              <label htmlFor="Aadhar">Enter Your Aadhar Number to updateInfo</label>

              <input
                type="tel"
                name="inputAadhar"
                id="aadharNumber"
                autoComplete="off"
                value={inputAadhaar}
                onChange={(e) => setInputAadhar(e.target.value)}
              />
            </p>
          </div>
          <br></br>
          <br></br>
          <br></br>

          <br></br>
          <br />
          <br />
          <br />
          <button type="submit" id="bt">
            Update Info
          </button>
        </form>
        <br />
        <br />
        </div>
        </div>

      )}
    </div>

    
   
  );
};
