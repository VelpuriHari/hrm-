import axios from "axios";
import { useEffect, useState } from "react";
import BarCharts from "./BarCharts";
import { useNavigate } from "react-router";
import "./Analysis.css";
import { port } from "./ProtUrl";

export default function Analysis() {
  const [data, setData] = useState([]);
  const [eventdata, setEventData] = useState([]);
  const [designationdata, setDesignation] = useState([]);
  const [journalpublications, setjournalpublications] = useState([]);
  const [onlinecertifications, setonlinecertifications] = useState([]);
  const [Switch, setSwitch] = useState("Highest Qulification");
  const navigator = useNavigate();
  const handleNavBar = (item) => {
    setSwitch(item);
  };
  useEffect(() => {
    axios.get(`${port}highestQulification`).then((res) => {
      setData(res.data);
    });
    axios.get(`${port}event`).then((res) => {
      setEventData(res.data);
    });
    axios.get(`${port}designation`).then((res) => {
      setDesignation(res.data);
    });
    axios.get(`${port}journalpublications`).then((res) => {
      setjournalpublications(res.data);
    });
    axios.get(`${port}onlinecertifications`).then((res) => {
      setonlinecertifications(res.data);
    });
  }, []);
  return (
    <>
      <div className="top">{Switch}</div>
      <div className="bodyDiv">
        <div className="NavDiv">
          <div className="NavDivItems" onClick={() => handleNavBar("Home")}>
            Home
          </div>
          <div
            className="NavDivItems"
            onClick={() => handleNavBar("Highest Qulification")}
          >
            Highest Qulification
          </div>
          <div className="NavDivItems" onClick={() => handleNavBar("Event")}>
            Event
          </div>
          <div
            className="NavDivItems"
            onClick={() => handleNavBar("Designation")}
          >
            Designation
          </div>
          <div
            className="NavDivItems"
            onClick={() => handleNavBar("Publications")}
          >
            Publications
          </div>
          <div
            className="NavDivItems"
            onClick={() => handleNavBar("onlinecertifications")}
          >
            onlinecertifications
          </div>
        </div>

        <div className="Componentdiv">
          {Switch === "Home" ? (
            navigator("/")
          ) : Switch === "Highest Qulification" ? (
            <BarCharts
              xAxisdata={["Ph.D", "M.Tech"]}
              seriesdata={data}
              label="Highest Qulification"
            />
          ) : Switch === "Event" ? (
            <BarCharts
              xAxisdata={["Attended", "Conducted"]}
              seriesdata={eventdata}
              label="Event"
            />
          ) : Switch === "Designation" ? (
            <BarCharts
              xAxisdata={["Professor", "Asso.Professor", "Assistant Professor"]}
              seriesdata={designationdata}
              label="Designation"
            />
          ) : Switch === "Publications" ? (
            <BarCharts
              xAxisdata={["2020", "2021", "2022", "2023", "2024"]}
              seriesdata={journalpublications}
              label="Publications"
            />
          ) : Switch === "onlinecertifications" ? (
            <BarCharts
              xAxisdata={[
                "2023-24",
                "2022-23",
                "2021-22",
                "2020-21",
                "2019-20",
              ]}
              seriesdata={onlinecertifications}
              label="onlinecertifications"
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
