import "./Login.css";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { port } from "./ProtUrl";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [login, setLogin] = useState("");
  const navigate = useNavigate();

  const Authenticate = (e) => {
    e.preventDefault();
    if (email !== "" && password !== "") {
      axios
        .get(`${port}users?email=${email}&password=${password}`)
        .then((res) => {
          if (res.data.success) {
            navigate("/profile", { state: { login: res.data.user.userid } });
          } else {
            setMessage("Email or Password incorrect");
          }
        })
        .catch((error) => {
          setMessage("An error occurred");
          console.log(error);
        });
    } else {
      setMessage("Email or Password cannot be empty");
    }
  };

  return (
    <div className="LoginCont">
      <div className="LeftSection">
        <span>HRM</span>
      </div>
      <div className="MiddleLine"></div>
      <div className="RightSection">
        <div className="LoginDiv">
          <h1>Login</h1>
          {message && <p className="errorMessage">{message}</p>}
          <form>
            <input
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="submit"
              value="Login"
              onClick={(e) => Authenticate(e)}
            />
          </form>
          <div className="links">
            <Link to="/admin">Login as Admin</Link> |{" "}
            <Link to="/changepassword">Change Password</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
