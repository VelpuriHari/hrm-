import axios from "axios";
import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "./submit_support.css";

export default function SubmitResearch({ login }) {
  const [data, setData] = useState([]);
  const [delete_, setDelete] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [modify, setModify] = useState({
    EmployeeID: login,
    Title: "",
    Application_Number: "",
    date_of_filing: "",
    Status: "",
    date_of_grant: "",
    Acc_year: "",
  });
  const [addrow, setAddRow] = useState({
    EmployeeID: login,
    Title: "",
    Application_Number: "",
    date_of_filing: "",
    Status: "",
    date_of_grant: "",
    Acc_year: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8081/certifications?userid=${login}`)
      .then((res) => {
        setData(res.data);
      })
      .then((err) => {});
  }, [refresh]);
  const handleDelete = (e, index) => {
    console.log(data[index].patentid);
    e.preventDefault();
    axios
      .delete(
        `http://localhost:8081/certifications?certificationid=${data[index].certificationid}`
      )
      .then((res) => {
        console.log(res);
        setRefresh((prev) => prev + 1);
      })
      .then((err) => {
        console.log(err);
      });
  };
  ///
  const handleModify = (e, key, index) => {
    e.preventDefault();

    setModify((prev) => ({ ...prev, [key]: e.target.value }));
    setModify((prev) => ({
      ...prev,
      certificationid: index,
    }));
    console.log(modify);
  }; ///
  const handleSubmitModify = (e, index) => {
    e.preventDefault();
    console.log(modify);
    console.log(typeof index);
    axios
      .put("http://localhost:8081/certifications", modify)
      .then(
        (res) => console.log(res),
        setRefresh((prev) => prev + 1)
      )
      .then((err) => console.log(err));
  };
  ////
  const handleAdd = (e, key) => {
    e.preventDefault();
    setAddRow((prev) => ({ ...prev, [key]: e.target.value }));
  };
  ////////
  const handleSubmitAdd = () => {
    axios
      .post(`http://localhost:8081/certifications`, addrow)
      .then(
        (res) => console.log(res),
        setRefresh((prev) => prev + 1)
      )
      .then((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <h1>Research</h1>
      NO DATA
    </>
  );
}
