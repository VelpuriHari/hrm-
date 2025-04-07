import axios from "axios";
import "./Support.css";
import { useEffect, useState } from "react";
import Cards from "./Cards";
export default function TLC() {
  const [data, setData] = useState([]);
  const [filter, setFilters] = useState([]);
  const query = `?Sec=${filter.join(",")}`;
  useEffect(() => {
    axios
      .get(`http://localhost:8081/tlp/${query}`)
      .then((res) => {
        setData(res.data);
        //console.log(data);
      })
      .then((err) => {
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
    <>
      <div className="support">
        <div className="filter">
          <h1>Filters</h1>
          <b>Section:</b>
          <br />
          <label>
            <input type="checkbox" value="A" onChange={handleFilterChange} />
            A Section
            <br />
          </label>
          <label>
            <input type="checkbox" value="B" onChange={handleFilterChange} />B
            Section
          </label>
        </div>
        <Cards title="Teaching and Learning " data={data} />
      </div>
    </>
  );
}
