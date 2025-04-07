import axios from "axios";
import "./Support.css";
import { useEffect, useState } from "react";
import Cards from "./Cards";

export default function Event() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8081/eventinfo/")
      .then((res) => {
        setData(res.data);
        //console.log(data);
      })
      .then((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="support">
        <div className="filter">
          <h1>Filters</h1>
          <b>Scope:</b>
        </div>
        <Cards title="Events" data={data} />
      </div>
    </>
  );
}
