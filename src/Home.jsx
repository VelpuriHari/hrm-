import "./Home.css";
import { useNavigate } from "react-router-dom";
import BusHome from "./images/BusHome.png";
export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <div className="HomeNavBar">
        <div className="titlediv">HRM</div>
        <div className="homediv">Home</div>
        <div
          className="analasysdiv"
          onClick={() => {
            navigate("/analysis");
          }}
        >
          Analysis
        </div>
        <div
          className="filtersdiv"
          onClick={() => {
            navigate("/filters");
          }}
        >
          Filters
        </div>
        <div
          className="logindiv"
          onClick={() => {
            navigate("/Login");
          }}
        >
          Login
        </div>
      </div>
      <img src={BusHome} className="Img" />
      <div className="Contact">Contacts</div>
    </>
  );
}
