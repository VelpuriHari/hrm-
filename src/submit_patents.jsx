import axios from "axios";
import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "./submit_support.css";

export default function SubmitPatents({ login }) {
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
    axios
      .get(`http://localhost:8081/patents?userid=${login}`)
      .then((res) => {
        setData(res.data);
      })
      .then((err) => {});
  }, [refresh]);
  const handleDelete = (e, index) => {
    e.preventDefault();
    axios
      .delete(
        `http://localhost:8081/patents?patentuserid=${data[index].patentuserid}`
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
      patentuserid: index,
    }));
    console.log(modify);
  }; ///
  const handleSubmitModify = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:8081/patents", modify)
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
      .post(`http://localhost:8081/patents`, addrow)
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
      <div className="Container">
        <div className="HeadingDiv">
          Patents
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
                          onChange={(e) => handleAdd(e, "Title")}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          onChange={(e) => handleAdd(e, "Application_Number")}
                        />
                      </td>
                      <td>
                        <input
                          placeholder="YYYY-MM-DD"
                          type="text"
                          onChange={(e) => handleAdd(e, "date_of_filing")}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          onChange={(e) => handleAdd(e, "Status")}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          placeholder="YYYY-MM-DD"
                          onChange={(e) => handleAdd(e, "date_of_grant")}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          onChange={(e) => handleAdd(e, "Acc_year")}
                        />
                      </td>
                      <td>
                        <input
                          type="button"
                          value="submit"
                          id="Btn"
                          onClick={(e) => handleSubmitAdd(e)}
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
                  <b>Title:</b> {id.Title} <br />
                  <b> Application_Number:</b>
                  {id.Application_Number}
                  <br />
                  <b>date_of_filing:</b> {id.date_of_filing}
                  <br />
                  <b>Status:</b> {id.Status}
                  <br />
                  <b>date_of_grant:</b> {id.date_of_grant}
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
                                  defaultValue={id.Title}
                                  onChange={(e) =>
                                    handleModify(e, "Title", id.patentuserid)
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  defaultValue={id.Application_Number}
                                  onChange={(e) =>
                                    handleModify(
                                      e,
                                      "Application_Number",
                                      id.patentuserid
                                    )
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  defaultValue={id.date_of_filing}
                                  placeholder="YYYY-MM-DD"
                                  onChange={(e) =>
                                    handleModify(
                                      e,
                                      "date_of_filing",
                                      id.patentuserid
                                    )
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  defaultValue={id.Status}
                                  onChange={(e) =>
                                    handleModify(e, "Status", id.patentuserid)
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  defaultValue={id.date_of_grant}
                                  placeholder="YYYY-MM-DD"
                                  onChange={(e) =>
                                    handleModify(
                                      e,
                                      "date_of_grant",
                                      id.patentuserid
                                    )
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  defaultValue={id.Acc_year}
                                  onChange={(e) =>
                                    handleModify(e, "Acc_year", id.patentuserid)
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="button"
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
