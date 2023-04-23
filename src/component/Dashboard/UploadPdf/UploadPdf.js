import React, { useState } from "react";
import { ethers } from "ethers";
import "./UploadPdf.css";
import StudentInformationSystem from "../../../artifacts/contracts/StudentInformationSystem.sol/StudentInformationSystem.json";
const studentinformationsystemAddress =
  "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export const UploadPdf = () => {
  const [aadhaar, setAadhaar] = useState();
  const [file, setFile] = useState();
  const [index, setIndex] = useState();

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function downloadPdf(e) {
    e.preventDefault();
    await requestAccount();
    const providers = new ethers.providers.Web3Provider(window.ethereum);
    const signer = providers.getSigner();
    const contract = new ethers.Contract(
      studentinformationsystemAddress,
      StudentInformationSystem.abi,
      signer
    );
    const transaction = await contract.getpdf(aadhaar, index);
    await transaction.wait();
    console.log("end");
  }
  async function handleSubmit(e) {
    e.preventDefault();
    await requestAccount();
    const providers = new ethers.providers.Web3Provider(window.ethereum);
    const signer = providers.getSigner();
    const contract = new ethers.Contract(
      studentinformationsystemAddress,
      StudentInformationSystem.abi,
      signer
    );
    const transaction = await contract.uploadPDF(aadhaar, file);

    await transaction.wait();
    console.log("end");
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className="forb">
        <label>
          Aadhaar:
          <input
            type="number"
            value={aadhaar}
            onChange={(e) => setAadhaar(e.target.value)}
          />
        </label>
        <label>
          PDF file
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        </label>
        <button type="submit" disabled={!aadhaar || !file}>
          Upload PDF
        </button>
      </form>

      <form onSubmit={downloadPdf} className="forb">
        <label>
          Index of File
          <input
            type="number"
            value={index}
            onChange={(e) => setIndex(e.target.value)}
          />
        </label>

        <button type="submit">Download PDF</button>
      </form>
    </div>
  );
};
