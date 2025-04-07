import axios from "axios";
import "./Support.css";
import { useEffect, useState } from "react";
import Cards from "./Cards";

export default function Certifications() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8081/certifications/")
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
        <Cards title="Certifications" data={data} />
      </div>
    </>
  );
}
