import "./Nav.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Nav = () => {
  const navigate = useNavigate();

  async function HomeHandle(e) {
    navigate("/");
  }

  async function RegisterHandle(e) {
    navigate("/NewUserForm");
  }

  async function AboutHandle(e) {
    window.open("https://aecc.ac.in/anuradha/");
  }
  async function LoginHandle(e) {
    navigate("/Login");
  }
  async function FacultyHandle(e) {
    navigate("/Faculty");
  }

  return (
    <>
      <div className="container">
        <div className="ele" onClick={HomeHandle}>
          Home
        </div>
        <div className="ele" onClick={AboutHandle}>
          About
        </div>
        <div className="ele" onClick={LoginHandle}>
          Login
        </div>
        <div className="ele" onClick={RegisterHandle}>
          Register As New Student
        </div>
        <div className="ele" onClick={FacultyHandle}>
          For Faculty
        </div>
      </div>
    </>
  );
};
