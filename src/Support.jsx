import axios from "axios";
import "./Support.css";
import { useEffect, useState } from "react";
import Cards from "./Cards";

export default function Support() {
  const [data, setData] = useState([]);
  const [filter, setFilters] = useState([]);

  const query = `?Scope=${filter.join(",")}`;

  useEffect(() => {
    axios
      .get(`http://localhost:8081/support/${query}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [filter]);

  const handleFilterChange = (e) => {
    if (e.target.checked) {
      setFilters([...filter, e.target.value]);
    } else {
      setFilters(filter.filter((item) => item !== e.target.value));
    }
  };

  return (
    <div className="support">
      <div className="filter">
        <h1>Filters</h1>
        <b>Scope:</b>
        <br />
        <label>
          <input
            type="checkbox"
            value="Department"
            onChange={handleFilterChange}
          />
          Department
          <br />
        </label>
        <label>
          <input
            type="checkbox"
            value="Institute"
            onChange={handleFilterChange}
          />
          Institute
        </label>
      </div>

      <Cards title="Support" data={data} />
    </div>
  );
}
