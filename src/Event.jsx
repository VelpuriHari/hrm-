import axios from "axios";
import "./Support.css";
import { useEffect, useState } from "react";
import Cards from "./Cards";
import { port } from "./ProtUrl";

export default function Event() {
  const [data, setData] = useState([]);
  const [roles, setRoles] = useState([]);
  const [years, setYears] = useState([]);
  const [gender, setGender] = useState("");
  const [qualifications, setQualifications] = useState([]);

  const query = `?Role=${roles.join(",")}&Acc_Year=${years.join(
    ","
  )}&gender=${gender}&qualification=${qualifications.join(",")}`;

  useEffect(() => {
    axios
      .get(`${port}eventinfo${query}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [roles, years, gender, qualifications]);

  const handleRoleChange = (e) => {
    if (e.target.checked) {
      setRoles([...roles, e.target.value]);
    } else {
      setRoles(roles.filter((role) => role !== e.target.value));
    }
  };

  const handleYearChange = (e) => {
    if (e.target.checked) {
      setYears([...years, e.target.value]);
    } else {
      setYears(years.filter((year) => year !== e.target.value));
    }
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleQualificationChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setQualifications([...qualifications, value]);
    } else {
      setQualifications(qualifications.filter((q) => q !== value));
    }
  };

  return (
    <div className="support">
      <div className="filter">
        <h1>Filters</h1>

        <b>Role:</b>
        <label>
          <input type="checkbox" value="Attended" onChange={handleRoleChange} />
          Attended
        </label>

        <label>
          <input
            type="checkbox"
            value="Conducted"
            onChange={handleRoleChange}
          />
          Conducted
        </label>

        <b>Academic Year:</b>
        <label>
          <input type="checkbox" value="2021-22" onChange={handleYearChange} />
          2021-2022
        </label>

        <label>
          <input type="checkbox" value="2022-23" onChange={handleYearChange} />
          2022-2023
        </label>

        <label>
          <input type="checkbox" value="2023-24" onChange={handleYearChange} />
          2023-2024
        </label>

        <b>Gender:</b>
        <label>
          <input
            type="radio"
            name="gender"
            value="Male"
            onChange={handleGenderChange}
          />{" "}
          Male
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="Female"
            onChange={handleGenderChange}
          />{" "}
          Female
        </label>

        <b>Qualification:</b>
        <label>
          <input
            type="checkbox"
            value="Ph.D"
            onChange={handleQualificationChange}
          />{" "}
          Ph.D
        </label>

        <label>
          <input
            type="checkbox"
            value="M.Tech"
            onChange={handleQualificationChange}
          />{" "}
          M.Tech
        </label>

        <label>
          <input
            type="checkbox"
            value="B.Tech"
            onChange={handleQualificationChange}
          />{" "}
          B.Tech
        </label>
      </div>

      <Cards title="Events" data={data} />
    </div>
  );
}
