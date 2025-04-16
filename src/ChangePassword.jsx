import { useState } from "react";
import axios from "axios";
import "./ChangePassword.css";
import { port } from "./ProtUrl";

export default function ChangePassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [userid, setUserid] = useState("");
  const [message, setMessage] = useState("");

  const Authenticate = (e) => {
    e.preventDefault();
    if (password === repassword) {
      axios
        .put(`${port}users`, {
          userid,
          email,
          password,
        })
        .then((res) => {
          setMessage("Password changed successfully");
        })
        .catch((err) => {
          setMessage("Error changing password");
        });
    } else {
      setMessage("Passwords do not match");
    }
  };

  return (
    <div className="ChangePasswordCont">
      <div className="LeftSection">
        <span>HRM</span>
      </div>
      <div className="MiddleLine"></div>
      <div className="RightSection">
        <div className="ChangePasswordDiv">
          <h1>Change Password</h1>
          {message && <p className="errorMessage">{message}</p>}
          <form>
            <input
              type="text"
              placeholder="UserId"
              onChange={(e) => {
                setUserid(e.target.value);
              }}
            />
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="New Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Retype Password"
              onChange={(e) => {
                setRePassword(e.target.value);
              }}
            />
            <input
              type="submit"
              value="Change Password"
              onClick={(e) => {
                Authenticate(e);
              }}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
