import axios from "axios";
import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "./submit_support.css";

export default function SubmitEvents({ login }) {
  const [data, setData] = useState([]);
  const [delete_, setDelete] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [modify, setModify] = useState({
    EmployeeID: login,
    ProgramName: "",
    DateFrom: "",
    DateTo: "",
    Outcome: "",
    Role: "",
    Acc_year: "",
    eventuserid: "",
  });
  const [addrow, setAddRow] = useState({
    EmployeeID: login,
    ProgramName: "",
    DateFrom: "",
    DateTo: "",
    Outcome: "",
    Role: "",
    Acc_year: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8081/eventinfo?userid=${login}`)
      .then((res) => {
        setData(res.data);
      })
      .then((err) => {});
  }, [refresh]);
  const handleDelete = (e, index) => {
    console.log(data[index].eventid);
    e.preventDefault();
    axios
      .delete(
        `http://localhost:8081/eventinfo?eventuserid=${data[index].eventuserid}`
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
      eventuserid: index,
    }));
    console.log(modify);
  }; ///
  const handleSubmitModify = (e, index) => {
    e.preventDefault();
    console.log(modify);
    console.log(typeof index);
    axios
      .put("http://localhost:8081/eventinfo", modify)
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
  const handleSubmitAdd = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:8081/eventinfo`, addrow)
      .then((res) => console.log(res))
      .then((err) => {
        console.log(err);
      });
    setRefresh((prev) => prev + 1);
  };
  return (
    <>
      <div className="Container">
        <div className="HeadingDiv">
          Events
          <Popup
            trigger={<input type="button" value="Add Row" id="Btn" />}
            modal
            nested
          >
            {(close) => (
              <>
                <div className="Popupdiv1">
                  <table>
                    <tr>
                      <td>ProgramName</td>
                      <td>DateFrom</td>
                      <td>DateTo</td>
                      <td>Outcome</td>
                      <td>Role</td>
                      <td>Acc_year</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>
                        <input
                          type="text"
                          onChange={(e) => handleAdd(e, "ProgramName")}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          onChange={(e) => handleAdd(e, "DateFrom")}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          onChange={(e) => handleAdd(e, "DateTo")}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          onChange={(e) => handleAdd(e, "Outcome")}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          onChange={(e) => handleAdd(e, "Role")}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          onChange={(e) => handleAdd(e, "Acc_Year")}
                        />
                      </td>
                      <td>
                        <input
                          onClick={(e) => {
                            handleSubmitModify(e);
                            close();
                          }}
                          value="Submit"
                          id="Btn"
                        />
                      </td>
                    </tr>
                  </table>
                </div>
              </>
            )}
          </Popup>
        </div>
        <div className="DisplyaDiv">
          {data.map((id, index) => {
            return (
              <div key={index} className="profile">
                <div>
                  <b>EmployeeID: </b>
                  {id.EmployeeID}
                  <br />
                  <b>ProgramName:</b> {id.ProgramName} <br />
                  <b> DateFrom:</b>
                  {id.DateFrom}
                  <br />
                  <b>DateTo:</b> {id.DateTo}
                  <br />
                  <b>Outcome:</b> {id.Outcome}
                  <br />
                  <b>Role:</b> {id.Role}
                  <br />
                  <b>Acc_year:</b> {id.Acc_year}
                </div>
                <div>
                  <Popup
                    trigger={<input type="button" value="modify" id="Btn" />}
                    modal
                    nested
                  >
                    {(close) => (
                      <>
                        <div className="Popupdiv1">
                          <table>
                            <tr>
                              <td>
                                <input
                                  type="text"
                                  defaultValue={id.ProgramName}
                                  onChange={(e) =>
                                    handleModify(
                                      e,
                                      "ProgramName",
                                      id.eventuserid
                                    )
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  defaultValue={id.DateFrom}
                                  onChange={(e) =>
                                    handleModify(e, "DateFrom", id.eventuserid)
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  defaultValue={id.DateTo}
                                  onChange={(e) =>
                                    handleModify(e, "DateTo", id.eventuserid)
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  defaultValue={id.Outcome}
                                  onChange={(e) =>
                                    handleModify(e, "Outcome", id.eventuserid)
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  defaultValue={id.Role}
                                  onChange={(e) =>
                                    handleModify(e, "Role", id.eventuserid)
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  defaultValue={id.Acc_year}
                                  onChange={(e) =>
                                    handleModify(e, "Acc_year", id.eventuserid)
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  onClick={(e) => {
                                    handleSubmitModify(e);
                                    close();
                                  }}
                                  value="Submit"
                                  id="Btn"
                                />
                              </td>
                            </tr>
                          </table>
                        </div>
                      </>
                    )}
                  </Popup>
                  <input
                    type="button"
                    onClick={(e) => handleDelete(e, index)}
                    value="Delete"
                    id="Btn"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
