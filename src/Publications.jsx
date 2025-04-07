import axios from "axios";
import "./Support.css";
import { useEffect, useState } from "react";
import Cards from "./Cards";
export default function Publicatons() {
  const [data, setData] = useState([]);
  const [filter, setFilters] = useState([]);
  const qurey = `?IndexedIn=${filter.join(",")}`;
  useEffect(() => {
    axios
      .get(`http://localhost:8081/publications${qurey}`)
      .then((res) => {
        setData(res.data);
        //console.log(data);
      })
      .then((err) => {
        console.log(err);
      });
  }, [filter]);
  const filterHandler = (e) => {
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
          <b>Indexd:</b>
          <br />
          <lable>
            <input type="checkbox" value="Scopus" onChange={filterHandler} />
            Scopus
          </lable>
          <br />
          <label>
            <input
              type="checkbox"
              value="Web of Science"
              onChange={filterHandler}
            />
            Web of Science
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              value="Google Scholar"
              onChange={filterHandler}
            />
            Google Scholar
          </label>
        </div>
        <Cards title="Publications" data={data} />
      </div>
    </>
  );
}
