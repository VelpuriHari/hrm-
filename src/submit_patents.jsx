import axios from "axios";
import { useEffect, useState } from "react";
import "./submit_support.css";
import { port } from "./ProtUrl";

export default function SubmitPatents({ login }) {
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [modify, setModify] = useState({
    EmployeeID: login,
    Title: "",
    Application_Number: "",
    date_of_filing: "",
    Status: "",
    date_of_grant: "",
    Acc_year: "",
    patentuserid: "",
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
    axios.get(`${port}patents?userid=${login}`).then((res) => {
      setData(res.data);
    });
  }, [refresh]);

  const handleDelete = (e, index) => {
    e.preventDefault();
    axios
      .delete(`${port}patents?patentuserid=${data[index].patentuserid}`)
      .then((res) => {
        setRefresh((prev) => prev + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleModify = (e, key, index) => {
    const newData = [...data];
    newData[index][key] = e.target.value;
    setData(newData);
  };

  const handleSubmitModify = (e, index) => {
    e.preventDefault();
    axios
      .put(`${port}patents`, data[index])
      .then((res) => {
        setRefresh((prev) => prev + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAdd = (e, key) => {
    setAddRow((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleSubmitAdd = (e) => {
    e.preventDefault();
    axios
      .post(`${port}patents`, addrow)
      .then((res) => {
        setRefresh((prev) => prev + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="Container">
      <div className="HeadingDiv">
        Patents
        <button
          onClick={() =>
            setData([...data, { ...addrow, patentuserid: Date.now() }])
          }
          id="Btn"
        >
          Add Row
        </button>
      </div>

      <div className="DisplyaDiv">
        {data.map((id, index) => (
          <div key={id.patentuserid} className="profile">
            <div>
              <b>EmployeeID: </b>
              {id.EmployeeID}
              <br />
              <b>Title:</b>
              <input
                type="text"
                value={id.Title}
                onChange={(e) => handleModify(e, "Title", index)}
              />
              <br />
              <b>Application_Number:</b>
              <input
                type="text"
                value={id.Application_Number}
                onChange={(e) => handleModify(e, "Application_Number", index)}
              />
              <br />
              <b>date_of_filing:</b>
              <input
                type="text"
                value={id.date_of_filing}
                onChange={(e) => handleModify(e, "date_of_filing", index)}
              />
              <br />
              <b>Status:</b>
              <input
                type="text"
                value={id.Status}
                onChange={(e) => handleModify(e, "Status", index)}
              />
              <br />
              <b>date_of_grant:</b>
              <input
                type="text"
                value={id.date_of_grant}
                onChange={(e) => handleModify(e, "date_of_grant", index)}
              />
              <br />
              <b>Acc_year:</b>
              <input
                type="text"
                value={id.Acc_year}
                onChange={(e) => handleModify(e, "Acc_year", index)}
              />
            </div>

            <div>
              <button onClick={(e) => handleSubmitModify(e, index)} id="Btn">
                Submit
              </button>
              <button onClick={(e) => handleDelete(e, index)} id="Btn">
                Delete
              </button>
            </div>
          </div>
        ))}

        <div className="profile">
          <b>New Row:</b>
          <div>
            <input
              type="text"
              value={addrow.Title}
              onChange={(e) => handleAdd(e, "Title")}
              placeholder="Title"
            />
            <input
              type="text"
              value={addrow.Application_Number}
              onChange={(e) => handleAdd(e, "Application_Number")}
              placeholder="Application Number"
            />
            <input
              type="text"
              value={addrow.date_of_filing}
              onChange={(e) => handleAdd(e, "date_of_filing")}
              placeholder="Date of Filing"
            />
            <input
              type="text"
              value={addrow.Status}
              onChange={(e) => handleAdd(e, "Status")}
              placeholder="Status"
            />
            <input
              type="text"
              value={addrow.date_of_grant}
              onChange={(e) => handleAdd(e, "date_of_grant")}
              placeholder="Date of Grant"
            />
            <input
              type="text"
              value={addrow.Acc_year}
              onChange={(e) => handleAdd(e, "Acc_year")}
              placeholder="Acc Year"
            />
            <button onClick={handleSubmitAdd} id="Btn">
              Submit New Row
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
