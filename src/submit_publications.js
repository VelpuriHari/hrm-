import axios from "axios";
import { useEffect, useState } from "react";
import "./submit_support.css";
import { port } from "./ProtUrl";

export default function SubmitPublications({ login }) {
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [editIndex, setEditIndex] = useState(null);

  const [modify, setModify] = useState({
    EmployeeID: login,
    Title: "",
    PaperTitle: "",
    ISSN: "",
    Details: "",
    IndexedIn: "",
    Month: "",
    Year: "",
    journalid: "",
  });
  const [addrow, setAddRow] = useState({
    EmployeeID: login,
    Title: "",
    PaperTitle: "",
    ISSN: "",
    Details: "",
    IndexedIn: "",
    Month: "",
    Year: "",
  });

  useEffect(() => {
    axios
      .get(`${port}publications?userid=${login}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);

  const handleDelete = (e, index) => {
    e.preventDefault();
    axios
      .delete(`${port}publications?journalid=${data[index].journalid}`)
      .then((res) => {
        setRefresh((prev) => prev + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleModify = (e, key, index) => {
    e.preventDefault();
    setModify((prev) => ({
      ...prev,
      [key]: e.target.value,
      journalid: index,
    }));
  };

  const handleSubmitModify = (e) => {
    e.preventDefault();
    axios
      .put(`${port}publications`, modify)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setRefresh((prev) => prev + 1);
  };

  const handleAdd = (e, key) => {
    e.preventDefault();
    setAddRow((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleSubmitAdd = () => {
    axios
      .post(`${port}publications`, addrow)
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
      });
    setAddRow({
      EmployeeID: login,
      Title: "",
      PaperTitle: "",
      ISSN: "",
      Details: "",
      IndexedIn: "",
      Month: "",
      Year: "",
    });
    setRefresh((prev) => prev + 1);
  };

  return (
    <>
      <div className="Container">
        <div className="HeadingDiv">
          Publications
          <input
            type="button"
            value="Add Row"
            id="Btn"
            onClick={() => setEditIndex("add")}
          />
        </div>
        <div className="DisplyaDiv">
          {data.map((id, index) => {
            return (
              <div key={index} className="profile">
                {editIndex === index ? (
                  <div>
                    <b>EmployeeId:</b> {id.EmployeeID}
                    <br />
                    <b>Title:</b>{" "}
                    <input
                      type="text"
                      defaultValue={id.Title}
                      onChange={(e) => handleModify(e, "Title", id.journalid)}
                    />
                    <br />
                    <b>PaperTitle:</b>{" "}
                    <input
                      type="text"
                      defaultValue={id.PaperTitle}
                      onChange={(e) =>
                        handleModify(e, "PaperTitle", id.journalid)
                      }
                    />
                    <br />
                    <b>ISSN:</b>{" "}
                    <input
                      type="text"
                      defaultValue={id.ISSN}
                      onChange={(e) => handleModify(e, "ISSN", id.journalid)}
                    />
                    <br />
                    <b>Details:</b>{" "}
                    <input
                      type="text"
                      defaultValue={id.Details}
                      onChange={(e) => handleModify(e, "Details", id.journalid)}
                    />
                    <br />
                    <b>IndexedIn:</b>{" "}
                    <input
                      type="text"
                      defaultValue={id.IndexedIn}
                      onChange={(e) =>
                        handleModify(e, "IndexedIn", id.journalid)
                      }
                    />
                    <br />
                    <b>Month:</b>{" "}
                    <input
                      type="text"
                      defaultValue={id.Month}
                      onChange={(e) => handleModify(e, "Month", id.journalid)}
                    />
                    <br />
                    <b>Year:</b>{" "}
                    <input
                      type="text"
                      defaultValue={id.Year}
                      onChange={(e) => handleModify(e, "Year", id.journalid)}
                    />
                    <br />
                    <input
                      type="button"
                      id="Btn"
                      value="Save"
                      onClick={(e) => {
                        handleSubmitModify(e);
                        setEditIndex(null);
                      }}
                    />
                    <input
                      type="button"
                      id="Btn"
                      value="Cancel"
                      onClick={() => setEditIndex(null)}
                    />
                  </div>
                ) : (
                  <div>
                    <b>EmployeeId:</b> {id.EmployeeID}
                    <br />
                    <b>Title:</b> {id.Title}
                    <br />
                    <b>PaperTitle:</b> {id.PaperTitle}
                    <br />
                    <b>ISSN:</b> {id.ISSN}
                    <br />
                    <b>Details:</b> {id.Details}
                    <br />
                    <b>IndexedIn:</b> {id.IndexedIn}
                    <br />
                    <b>Month:</b> {id.Month}
                    <br />
                    <b>Year:</b> {id.Year}
                    <br />
                    <input
                      type="button"
                      id="Btn"
                      value="Modify"
                      onClick={() => setEditIndex(index)}
                    />
                    <input
                      type="button"
                      id="Btn"
                      value="Delete"
                      onClick={(e) => handleDelete(e, index)}
                    />
                  </div>
                )}
              </div>
            );
          })}
          {editIndex === "add" && (
            <div className="profile1">
              <b>EmployeeId:</b> {addrow.EmployeeID}
              <br />
              <b>Title:</b>{" "}
              <input type="text" onChange={(e) => handleAdd(e, "Title")} />
              <br />
              <b>PaperTitle:</b>{" "}
              <input type="text" onChange={(e) => handleAdd(e, "PaperTitle")} />
              <br />
              <b>ISSN:</b>{" "}
              <input type="text" onChange={(e) => handleAdd(e, "ISSN")} />
              <br />
              <b>Details:</b>{" "}
              <input type="text" onChange={(e) => handleAdd(e, "Details")} />
              <br />
              <b>IndexedIn:</b>{" "}
              <input type="text" onChange={(e) => handleAdd(e, "IndexedIn")} />
              <br />
              <b>Month:</b>{" "}
              <input type="text" onChange={(e) => handleAdd(e, "Month")} />
              <br />
              <b>Year:</b>{" "}
              <input type="text" onChange={(e) => handleAdd(e, "Year")} />
              <br />
              <input
                type="button"
                id="Btn"
                value="Save"
                onClick={() => {
                  handleSubmitAdd();
                  setEditIndex(null);
                }}
              />
              <input
                type="button"
                id="Btn"
                value="Cancel"
                onClick={() => setEditIndex(null)}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
