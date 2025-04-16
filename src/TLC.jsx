import axios from "axios";
import "./Support.css";
import { useEffect, useState } from "react";
import Cards from "./Cards";
import { port } from "./ProtUrl";

export default function TLC() {
  const [data, setData] = useState([]);
  const [filter, setFilters] = useState([]); // Section
  const [years, setYears] = useState([]); // Year
  const [gender, setGender] = useState("");
  const [qualifications, setQualifications] = useState([]); // Qualification

  const query = `?Sec=${filter.join(",")}&Year=${years.join(
    ","
  )}&gender=${gender}&qualification=${qualifications.join(",")}`;

  useEffect(() => {
    axios
      .get(`${port}tlp/${query}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [filter, years, gender, qualifications]);

  const handleFilterChange = (e) => {
    if (e.target.checked) {
      setFilters([...filter, e.target.value]);
    } else {
      setFilters(filter.filter((item) => item !== e.target.value));
    }
  };

  const handleYearChange = (e) => {
    if (e.target.checked) {
      setYears([...years, e.target.value]);
    } else {
      setYears(years.filter((item) => item !== e.target.value));
    }
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
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

  return (
    <div className="support">
      <div className="filter">
        <h1>Filters</h1>

        <b>Section:</b>
        <label>
          <input type="checkbox" value="A" onChange={handleFilterChange} /> A
          Section
        </label>
        <label>
          <input type="checkbox" value="B" onChange={handleFilterChange} /> B
          Section
        </label>

        <br />
        <b>Year:</b>
        <label>
          <input type="checkbox" value="2024-25" onChange={handleYearChange} />{" "}
          2024-25
        </label>
        <label>
          <input type="checkbox" value="2023-24" onChange={handleYearChange} />{" "}
          2023-24
        </label>
        <label>
          <input type="checkbox" value="2022-23" onChange={handleYearChange} />{" "}
          2022-23
        </label>
        <label>
          <input type="checkbox" value="2021-22" onChange={handleYearChange} />{" "}
          2021-22
        </label>

        <br />
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

      <Cards title="Teaching and Learning" data={data} />
    </div>
  );
}
