import axios from "axios";
import "./Support.css";
import { useEffect, useState } from "react";
import Cards from "./Cards";
import { port } from "./ProtUrl";

export default function Publications() {
  const [data, setData] = useState([]);
  const [filter, setFilters] = useState([]); // IndexedIn
  const [years, setYears] = useState([]); // Year
  const [gender, setGender] = useState("");
  const [qualifications, setQualifications] = useState([]);

  const query = `?IndexedIn=${filter.join(",")}&Year=${years.join(
    ","
  )}&gender=${gender}&qualification=${qualifications.join(",")}`;

  useEffect(() => {
    axios
      .get(`${port}publications${query}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [filter, years, gender, qualifications]);

  const filterHandler = (e) => {
    if (e.target.checked) {
      setFilters([...filter, e.target.value]);
    } else {
      setFilters(filter.filter((item) => item !== e.target.value));
    }
  };

  const yearHandler = (e) => {
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

        <b>Indexed:</b>
        <label>
          <input type="checkbox" value="Scopus" onChange={filterHandler} />
          Scopus
        </label>
        <label>
          <input
            type="checkbox"
            value="Web of Science"
            onChange={filterHandler}
          />
          Web of Science
        </label>
        <label>
          <input
            type="checkbox"
            value="Google Scholar"
            onChange={filterHandler}
          />
          Google Scholar
        </label>

        <b>Year:</b>
        <label>
          <input type="checkbox" value="2024" onChange={yearHandler} />
          2024
        </label>
        <label>
          <input type="checkbox" value="2023" onChange={yearHandler} />
          2023
        </label>
        <label>
          <input type="checkbox" value="2022" onChange={yearHandler} />
          2022
        </label>
        <label>
          <input type="checkbox" value="2021" onChange={yearHandler} />
          2021
        </label>

        <div>
          <label htmlFor="gender">Gender:</label>
          <select id="gender" value={gender} onChange={handleGenderChange}>
            <option value="">--Select--</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <b>Qualification:</b>
        <label>
          <input
            type="checkbox"
            value="M.Tech"
            onChange={handleQualificationChange}
          />
          MTech
        </label>
        <label>
          <input
            type="checkbox"
            value="Ph.D"
            onChange={handleQualificationChange}
          />
          Ph.D
        </label>
        <label>
          <input
            type="checkbox"
            value="B.Tech"
            onChange={handleQualificationChange}
          />
          BTech
        </label>
      </div>

      <Cards title="Publications" data={data} />
    </div>
  );
}
