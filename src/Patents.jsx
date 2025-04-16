import axios from "axios";
import "./Support.css";
import { useEffect, useState } from "react";
import Cards from "./Cards";
import { port } from "./ProtUrl";

export default function Patents() {
  const [data, setData] = useState([]);
  const [years, setYears] = useState([]);
  const [statuses, setStatuses] = useState([]);

  const [selectedYears, setSelectedYears] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [selectedQualifications, setSelectedQualifications] = useState([]);
  const [gender, setGender] = useState("");

  const query = `?Acc_Year=${selectedYears.join(
    ","
  )}&Status=${selectedStatuses.join(
    ","
  )}&gender=${gender}&qualification=${selectedQualifications.join(",")}`;

  useEffect(() => {
    axios
      .get(`${port}patents${query}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedYears, selectedStatuses, selectedQualifications, gender]);

  const handleCheckboxChange = (e, setFn, values) => {
    if (e.target.checked) {
      setFn([...values, e.target.value]);
    } else {
      setFn(values.filter((val) => val !== e.target.value));
    }
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  useEffect(() => {
    setYears(["2021-22", "2022-23", "2023-24"]);
    setStatuses(["Published", "Granted", "Attended", "Conducted"]);
  }, []);

  return (
    <div className="support">
      <div className="filter">
        <h1>Filters</h1>

        <b>Academic Year:</b>
        {years.map((year) => (
          <label key={year}>
            <input
              type="checkbox"
              value={year}
              onChange={(e) =>
                handleCheckboxChange(e, setSelectedYears, selectedYears)
              }
            />
            {year}
          </label>
        ))}

        <b>Status:</b>
        {statuses.map((status) => (
          <label key={status}>
            <input
              type="checkbox"
              value={status}
              onChange={(e) =>
                handleCheckboxChange(e, setSelectedStatuses, selectedStatuses)
              }
            />
            {status}
          </label>
        ))}

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
            onChange={(e) =>
              handleCheckboxChange(
                e,
                setSelectedQualifications,
                selectedQualifications
              )
            }
          />
          Ph.D
        </label>
        <label>
          <input
            type="checkbox"
            value="M.Tech"
            onChange={(e) =>
              handleCheckboxChange(
                e,
                setSelectedQualifications,
                selectedQualifications
              )
            }
          />
          M.Tech
        </label>
        <label>
          <input
            type="checkbox"
            value="B.Tech"
            onChange={(e) =>
              handleCheckboxChange(
                e,
                setSelectedQualifications,
                selectedQualifications
              )
            }
          />
          B.Tech
        </label>
      </div>

      <Cards title="Patents" data={data} />
    </div>
  );
}
