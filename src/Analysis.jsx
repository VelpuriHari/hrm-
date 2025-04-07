import { BarChart } from "@mui/x-charts/BarChart";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Analysis() {
  const [data, setData] = useState([]);
  const [eventdata, setEventData] = useState([]);
  const [designationdata, setDesignation] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:8081/highestQulification`).then((res) => {
      setData(res.data);
    });
    axios.get(`http://localhost:8081/event`).then((res) => {
      setEventData(res.data);
    });
    axios.get(`http://localhost:8081/designation`).then((res) => {
      setDesignation(res.data);
    });
  }, []);
  return (
    <>
      <BarChart
        xAxis={[
          {
            id: "barCategories",
            data: ["Ph.D", "M.Tech"],
            scaleType: "band",
          },
        ]}
        series={[
          {
            data: data,
            label: "Highest Qulification ",
          },
        ]}
        width={500}
        height={300}
        barLabel="value"
      />
      <BarChart
        xAxis={[
          {
            id: "barCategories",
            data: ["Attended", "Conducted"],
            scaleType: "band",
          },
        ]}
        series={[
          {
            data: eventdata,
            label: "Event  ",
          },
        ]}
        width={500}
        height={300}
        barLabel="value"
      />

      <BarChart
        xAxis={[
          {
            id: "barCategories",
            data: ["Professor", "Asso.Professor", "Assistant Professor"],
            scaleType: "band",
          },
        ]}
        series={[
          {
            data: designationdata,
            label: "Designation  ",
          },
        ]}
        width={500}
        height={300}
        barLabel="value"
      />
    </>
  );
}
