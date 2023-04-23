import React from "react";
import { Header } from "../Header/Header";
import StudentInformationSystem from "../../artifacts/contracts/StudentInformationSystem.sol/StudentInformationSystem.json";
import { ethers } from "ethers";
import { useState } from "react";
import { useEffect } from "react";
import { UpdateInfo } from "./UpdateInfo/UpdateInfo";
import { useNavigate } from "react-router-dom";
import { UploadPdf } from "./UploadPdf/UploadPdf";
//const aadharNumber = parseInt(localStorage.getItem('aadharNumber'));

const studentinformationsystemAddress =
  "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [aadharNumber, setAadharNumber] = useState("");
  const [basicInfo, setBasicInfo] = useState({});
  const [marksInfo, setMarksInfo] = useState({});
  const [otherInfo, setOtherInfo] = useState({});
  const [accommodationInfo, setAccommodationInfo] = useState({});
  const [showData, setShowData] = useState(false);
  const [updateInfo, setUpdateInfo] = useState(false);
  const [show, setShow] = useState(false);
  const [uploadPdf, setUploadPdf] = useState(false);
  let Mobile;

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }
  async function showForm(e) {
    setShow(true);
  }
  async function handleGetData(e) {
    //   setUpdateInfo(false);
    //   await requestAccount();
    //   const providers = new ethers.providers.Web3Provider(window.ethereum);
    //   const signer = providers.getSigner();
    //   const contract = new ethers.Contract(
    //     studentinformationsystemAddress,
    //     StudentInformationSystem.abi,
    //     signer
    //   );

    //   const data = await contract.getStudentInfoByAadhar(aadharNumber);
    //   setBasicInfo(data[0]);
    //   setMarksInfo(data[1]);
    //   setOtherInfo(data[2]);
    //   setAccommodationInfo(data[3]);
    //   console.log(basicInfo[1]);
    //   setShowData(true);

    e.preventDefault();
    await requestAccount();
    const providers = new ethers.providers.Web3Provider(window.ethereum);
    const signer = providers.getSigner();
    const contract = new ethers.Contract(
      studentinformationsystemAddress,
      StudentInformationSystem.abi,
      signer
    );
    const regst = await contract.isStudentRegistered(aadharNumber);
    console.log(regst);

    console.log("hi out");
    if (regst) {
      const data = await contract.getStudentInfoByAadhar(aadharNumber);
      setBasicInfo(data[0]);
      setMarksInfo(data[1]);
      setOtherInfo(data[2]);
      setAccommodationInfo(data[3]);
      console.log("in");
      setShowData(true);
    } else {
      alert("Student not register");
    }
  }

  async function handleUpdateInfo() {
    setShowData(false);
    setShow(false);
    setUploadPdf(false);
    setUpdateInfo(true);
  }

  async function handleLogut() {
    localStorage.clear();
    navigate("/");
  }
  async function handleUploeadPdf() {
    setShow(false);
    setShowData(false);
    setUpdateInfo(false);
    setUploadPdf(true);
  }

  console.log("s", aadharNumber);
  console.log("ak", basicInfo);

  return (
    <>
      <Header></Header>

      <div className="container">
        <div className="ele" onClick={showForm}>
          See Your Information
        </div>
        <div className="ele" onClick={handleUpdateInfo}>
          Update Info
        </div>
        <div className="ele" onClick={handleUploeadPdf}>
          Upload Or Download PDF
        </div>

        <div className="ele" onClick={handleLogut}>
          Logout
        </div>
      </div>

      {show && (
        // <div >
        //  <div style={{border: "1px solid black", display:"flex", fontWeight:"bolder", fontSize:"20px"}}>
        //   <div style={{border: "1px solid black", paddingLeft:"30px", paddingRight:"30px"}}>
        //   <h3 style={{color:"blueviolet", fontFamily:"cursive"}}>Basic Information</h3>
        //  <p>Name : {basicInfo[0]}</p>
        //  <p>address: {basicInfo[1]}</p>
        //  <p>date of birth: {basicInfo[2]}</p>
        //  <p>Email Id: {basicInfo[3]}</p>
        //  <p>Parent Name: {basicInfo[4]}</p>
        //   <p>Mobile Number: {basicInfo[5]}</p>
        //   <p>Parent Mobile Number: {basicInfo[5]}</p>
        //   <p>Caste: {basicInfo[6]}</p>
        //   <p>Aadhaar Number: {aadharNumber}</p>
        //   </div>

        //   <div style={{border: "1px solid black",paddingLeft:"35px", paddingRight:"35px"}}>
        //   <h3 style={{color:"blueviolet", fontFamily:"cursive"}}>Marks Information</h3>
        //  <p>10th percentage : {marksInfo[0]}</p>
        //  <p>12th percentage: {marksInfo[1]}</p>
        //  <p>Diploma: {marksInfo[2]}</p>
        //  <p>Result: {marksInfo[3]}</p>

        //   </div>

        //   <div style={{border: "1px solid black",paddingLeft:"35px", paddingRight:"35px"}}>
        //   <h3 style={{color:"blueviolet", fontFamily:"cursive"}}>Other Information</h3>
        //  <p>Year Of Admission: {otherInfo[0]}</p>
        //  <p>Branch: {otherInfo[1]}</p>
        //  <p>Fees Paid: {otherInfo[2]}</p>
        //  <p>Scholarship Status: {otherInfo[3]}</p>
        //  <p>Achievements: {otherInfo[4]}</p>
        //  <p>Other Courses: {otherInfo[5]}</p>
        //  <p>Paper Published: {otherInfo[6]}</p>
        //  <p>Placements: {otherInfo[7]}</p>

        //   </div>
        //   <div style={{border: "1px solid black",paddingLeft:"30px", paddingRight:"30px"}}>
        //   <h3 style={{color:"blueviolet", fontFamily:"cursive"}}>Accommodation Information</h3>
        //  <p>Hostel Accommodation: {accommodationInfo[0]}</p>
        //  <p>Address Of Room: {accommodationInfo[1]}</p>
        //  <p>Bus Facility: {accommodationInfo[2]}</p>

        //   </div>

        //  </div>

        // </div>

        <div>
          {showData ? (
            <div>
              <div
                style={{
                  border: "1px solid black",
                  display: "flex",
                  fontWeight: "bolder",
                  fontSize: "30px",
                }}
              >
                <div
                  style={{
                    border: "1px solid black",
                    paddingLeft: "30px",
                    paddingRight: "30px",
                  }}
                >
                  <h3 style={{ color: "blueviolet", fontFamily: "cursive" }}>
                    Basic Information
                  </h3>
                  <p>Name : {basicInfo[0]}</p>
                  <p>address: {basicInfo[1]}</p>
                  <p>date of birth: {basicInfo[2]}</p>
                  <p>Email Id: {basicInfo[3]}</p>
                  <p>Parent Name: {basicInfo[4]}</p>
                  <p>Mobile Number: {basicInfo[5]}</p>
                  <p>Parent Mobile Number: {basicInfo[5]}</p>
                  <p>Caste: {basicInfo[6]}</p>
                  <p>Aadhaar Number: {aadharNumber}</p>
                </div>

                <div
                  style={{
                    border: "1px solid black",
                    paddingLeft: "35px",
                    paddingRight: "35px",
                  }}
                >
                  <h3 style={{ color: "blueviolet", fontFamily: "cursive" }}>
                    Marks Information
                  </h3>
                  <p>10th percentage : {marksInfo[0]}</p>
                  <p>12th percentage: {marksInfo[1]}</p>
                  <p>Diploma: {marksInfo[2]}</p>
                  <p>Result: {marksInfo[3]}</p>
                </div>

                <div
                  style={{
                    border: "1px solid black",
                    paddingLeft: "35px",
                    paddingRight: "35px",
                  }}
                >
                  <h3 style={{ color: "blueviolet", fontFamily: "cursive" }}>
                    Other Information
                  </h3>
                  <p>Year Of Admission: {otherInfo[0]}</p>
                  <p>Branch: {otherInfo[1]}</p>
                  <p>Fees Paid: {otherInfo[2]}</p>
                  <p>Scholarship Status: {otherInfo[3]}</p>
                  <p>Achievements: {otherInfo[4]}</p>
                  <p>Other Courses: {otherInfo[5]}</p>
                  <p>Paper Published: {otherInfo[6]}</p>
                  <p>Placements: {otherInfo[7]}</p>
                </div>
                <div
                  style={{
                    border: "1px solid black",
                    paddingLeft: "30px",
                    paddingRight: "30px",
                  }}
                >
                  <h3 style={{ color: "blueviolet", fontFamily: "cursive" }}>
                    Accommodation Information
                  </h3>
                  <p>Hostel Accommodation: {accommodationInfo[0]}</p>
                  <p>Address Of Room: {accommodationInfo[1]}</p>
                  <p>Bus Facility: {accommodationInfo[2]}</p>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h1 style={{ textAlign: "center" }}>
                Get Your Information For by Aadhar Number
              </h1>

              <div className="LoginForm">
                <form onSubmit={handleGetData}>
                  <div>
                    <p>
                      <label htmlFor="Aadhar">Aadhar Number </label>

                      <input
                        type="tel"
                        name="aadharNumber"
                        id="aadharNumber"
                        autoComplete="off"
                        value={aadharNumber}
                        onChange={(e) => setAadharNumber(e.target.value)}
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
                    Show data
                  </button>
                </form>
                <br />
                <br />
              </div>
            </div>
          )}
        </div>
      )}

      <div>
        {updateInfo ? (
          <div>
            <UpdateInfo />
          </div>
        ) : (
          <div></div>
        )}

        {uploadPdf ? (
          <div>
            <UploadPdf />
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
};
