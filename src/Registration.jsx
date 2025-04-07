import { useState } from "react";
import axios from "axios";
import "./Registration.css";

export default function Registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userid, setUserid] = useState("");
  const [message, setMessage] = useState("");

  const Authenticate = (e) => {
    e.preventDefault();
    console.log(email);
    if (userid !== "" && email !== "" && password !== "") {
      axios
        .post(`http://localhost:8081/users`, {
          userid,
          email,
          password,
        })
        .then((res) => {
          if (res.data) {
            setMessage("Registered Successfully");
          } else {
            setMessage("Registration Failed");
          }
        });
    } else {
      setMessage("UserId, Email, or Password cannot be empty");
    }
  };

  return (
    <div className="RegistrationCont">
      <div className="LeftSection">
        <span>HRM</span>
      </div>
      <div className="MiddleLine"></div>
      <div className="RightSection">
        <div className="RegistrationDiv">
          <h1>Registration</h1>
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
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <input
              type="submit"
              value="Register"
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
