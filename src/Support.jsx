import axios from "axios";
import "./Support.css";
import { useEffect, useState, useRef } from "react";
import Cards from "./Cards";
import { port } from "./ProtUrl";

export default function Support() {
  const [data, setData] = useState([]);
  const [filter, setFilters] = useState([]);
  const [selected, setSelected] = useState([]); // Academic years array
  const [gender, setGender] = useState("");
  const [qualifications, setQualifications] = useState([]);

  const scope = filter.join(",");
  const academicYears = selected.join(",");
  const qualificationStr = qualifications.join(",");

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleFilterChange = (e) => {
    if (e.target.checked) {
      setFilters([...filter, e.target.value]);
    } else {
      setFilters(filter.filter((item) => item !== e.target.value));
    }
  };

  const handleAcademicYearChange = (e) => {
    if (e.target.checked) {
      setSelected([...selected, e.target.value]);
    } else {
      setSelected(selected.filter((item) => item !== e.target.value));
    }
  };

  const handleQualificationChange = (e) => {
    if (e.target.checked) {
      setQualifications([...qualifications, e.target.value]);
    } else {
      setQualifications(
        qualifications.filter((item) => item !== e.target.value)
      );
    }
  };

  useEffect(() => {
    axios
      .get(
        `${port}support?scope=${scope}&Acc_Year=${academicYears}&gender=${gender}&qualification=${qualificationStr}`
      )
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [filter, selected, gender, qualifications]);

  return (
    <div className="support">
      <div className="filter">
        <h1>Filters</h1>

        <b>Scope:</b>
        <label>
          <input
            type="checkbox"
            value="Department"
            onChange={handleFilterChange}
          />
          Department
        </label>

        <label>
          <input
            type="checkbox"
            value="Institute"
            onChange={handleFilterChange}
          />
          Institute
        </label>

        <b>Academic Year:</b>
        {["2024-25", "2023-24", "2022-23", "2021-22"].map((year) => (
          <label key={year}>
            <input
              type="checkbox"
              value={year}
              onChange={handleAcademicYearChange}
              checked={selected.includes(year)}
            />
            {year}
          </label>
        ))}

        <div>
          <label htmlFor="gender">
            <b>Gender:</b>
          </label>
          <select id="gender" value={gender} onChange={handleGenderChange}>
            <option value="">--Select--</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <b>Qualification:</b>
        {["M.Tech", "Ph.D", "B.Tech"].map((qual) => (
          <label key={qual}>
            <input
              type="checkbox"
              value={qual}
              onChange={handleQualificationChange}
              checked={qualifications.includes(qual)}
            />
            {qual}
          </label>
        ))}
      </div>

      <Cards title="Support" data={data} />
    </div>
  );
}
