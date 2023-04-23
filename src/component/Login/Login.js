import React, { createContext, useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { Header } from "../Header/Header";
import { Nav } from "../Nav/Nav";
import { useNavigate } from "react-router-dom";
import { providers } from "ethers";
import { ethers } from "ethers";

//Import ABI Code to interact with smart contract
import StudentInformationSystem from "../../artifacts/contracts/StudentInformationSystem.sol/StudentInformationSystem.json";
//The contract Address

const studentinformationsystemAddress =
  "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const Login = () => {
  const navigate = useNavigate();

  const [aadharNumber, setAadharNumber] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  const detectMetamask = () => {
    let provider = false;
    if (window.ethereum) {
      provider = true;
    } else {
      alert(
        console.log(
          "MetaMask not install in browser detect. You should install Metamask"
        )
      );
      return provider;
    }
    return provider;
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (!aadharNumber) return;

    let metaMaskExist = detectMetamask();
    if (metaMaskExist) {
      await requestAccount();
      const providers = new ethers.providers.Web3Provider(window.ethereum);
      const signer = providers.getSigner();
      const contract = new ethers.Contract(
        studentinformationsystemAddress,
        StudentInformationSystem.abi,
        signer
      );

      const LoginCredentialCheck = await contract.isStudentRegistered(
        aadharNumber
      );
      //Use usestate here
      if (LoginCredentialCheck) {
        //
        localStorage.setItem("aadharNumber", aadharNumber);
        navigate("/Dashboard");
      } else {
        alert("Put Valid credential");
      }
    }
  }

  return (
    <>
      <Header></Header>
      <Nav></Nav>
      <div className="LoginForm">
        <form onSubmit={handleSubmit}>
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
            Login
          </button>
        </form>
        <br />
        <br />
      </div>
    </>
  );
};

export default Login;
