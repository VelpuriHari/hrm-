import axios from "axios";
import "./Support.css";
import { useEffect, useState } from "react";
import Cards from "./Cards";
import { port } from "./ProtUrl";

export default function Certifications() {
  const [data, setData] = useState([]);
  const [years, setYears] = useState([]);
  const [gender, setGender] = useState("");
  const [qualifications, setQualifications] = useState([]);

  const handleYearFilter = (e) => {
    const value = e.target.value;
    setYears(
      e.target.checked ? [...years, value] : years.filter((y) => y !== value)
    );
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleQualificationChange = (e) => {
    const value = e.target.value;
    setQualifications(
      e.target.checked
        ? [...qualifications, value]
        : qualifications.filter((q) => q !== value)
    );
  };

  const query = `?Acc_Year=${years.join(
    ","
  )}&gender=${gender}&qualification=${qualifications.join(",")}`;

  useEffect(() => {
    axios
      .get(`${port}certifications${query}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [years, gender, qualifications]);

  return (
    <div className="support">
      <div className="filter">
        <h1>Filters</h1>

        <b>Academic Year:</b>
        <label>
          <input type="checkbox" value="2024-25" onChange={handleYearFilter} />{" "}
          2024-25
        </label>

        <label>
          <input type="checkbox" value="2023-24" onChange={handleYearFilter} />{" "}
          2023-24
        </label>

        <label>
          <input type="checkbox" value="2022-23" onChange={handleYearFilter} />{" "}
          2022-23
        </label>

        <label>
          <input type="checkbox" value="2021-22" onChange={handleYearFilter} />{" "}
          2021-22
        </label>

        <b>Gender:</b>
        <select value={gender} onChange={handleGenderChange}>
          <option value="">--Select--</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <br />

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

      <Cards title="Certifications" data={data} />
    </div>
  );
}
