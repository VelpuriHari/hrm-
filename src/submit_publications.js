import axios from "axios";
import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "./submit_support.css";

export default function SubmitPublications({ login }) {
  const [data, setData] = useState([]);
  const [delete_, setDelete] = useState([]);
  const [refresh, setRefresh] = useState(0);
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
      .get(`http://localhost:8081/publications?userid=${login}`)
      .then((res) => {
        setData(res.data);
        //console.log(data);hg
      })
      .then((err) => {
        // consougugihoijogugiygugi
      });
  }, [refresh]);
  const handleDelete = (e, index) => {
    console.log(data[index]);
    e.preventDefault();
    axios
      .delete(
        `http://localhost:8081/publications?journalid=${data[index].journalid}`
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
      journalid: index,
    }));
    console.log(modify);
  }; ///
  const handleSubmitModify = (e, index) => {
    e.preventDefault();
    console.log(modify);
    console.log(typeof index);
    axios
      .put("http://localhost:8081/publications", modify)
      .then((res) => console.log(res))
      .then((err) => console.log(err));
    setRefresh((prev) => prev + 1);
  };
  ////
  const handleAdd = (e, key) => {
    e.preventDefault();
    setAddRow((prev) => ({ ...prev, [key]: e.target.value }));
  };
  ////////
  const handleSubmitAdd = () => {
    axios
      .post(`http://localhost:8081/publications`, addrow)
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
          Publications
          <Popup
            trigger={<input type="button" value="Add Row" id="Btn" />}
            modal
            nested
          >
            {(close) => (
              <>
                {" "}
                <div className="Popupdiv1">
                  <tr>
                    <td>Title</td>
                    <td>PaperTitle</td>
                    <td>ISSN</td>
                    <td>Details</td>
                    <td>IndexedIn</td>
                    <td>Month</td>
                    <td>Year</td>
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
                        onChange={(e) => handleAdd(e, "PaperTitle")}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        onChange={(e) => handleAdd(e, "ISSN")}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        onChange={(e) => handleAdd(e, "Details")}
                      />
                    </td>
                    <td>
                      {" "}
                      <input
                        type="text"
                        onChange={(e) => handleAdd(e, "IndexedIn")}
                      />
                    </td>
                    <td>
                      {" "}
                      <input
                        type="text"
                        onChange={(e) => handleAdd(e, "Month")}
                      />
                    </td>
                    <td>
                      {" "}
                      <input
                        type="text"
                        onChange={(e) => handleAdd(e, "Year")}
                      />
                    </td>
                    <td>
                      {" "}
                      <input
                        type="submit"
                        id="Btn"
                        onClick={() => (handleSubmitAdd(), close())}
                      />
                    </td>
                  </tr>
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
                  <b>EmplooyeId: </b>
                  {id.EmployeeID}
                  <br />
                  <b>Title:</b> {id.Title} <br />
                  <b> PaperTitle:</b>
                  {id.PaperTitle}
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
                              <td>Title</td>
                              <td>PaperTitle</td>
                              <td>ISSN</td>
                              <td>Details</td>
                              <td>IndexedIn</td>
                              <td>Month</td>
                              <td>Year</td>
                            </tr>
                            <tr>
                              <td>
                                <input
                                  type="text"
                                  defaultValue={id.Title}
                                  onChange={(e) =>
                                    handleModify(e, "Title", id.journalid)
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  defaultValue={id.PaperTitle}
                                  onChange={(e) =>
                                    handleModify(e, "PaperTitle", id.journalid)
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  defaultValue={id.ISSN}
                                  onChange={(e) =>
                                    handleModify(e, "ISSN", id.journalid)
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  defaultValue={id.Details}
                                  onChange={(e) =>
                                    handleModify(e, "Details", id.journalid)
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  defaultValue={id.IndexedIn}
                                  onChange={(e) =>
                                    handleModify(e, "IndexedIn", id.journalid)
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  defaultValue={id.Month}
                                  onChange={(e) =>
                                    handleModify(e, "Month", id.journalid)
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  defaultValue={id.Year}
                                  onChange={(e) =>
                                    handleModify(e, "Year", id.journalid)
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  onClick={(e) => {
                                    handleSubmitModify(e);
                                    close();
                                  }}
                                  type="Submit"
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
                    id="Btn"
                    onClick={(e) => handleDelete(e, index)}
                    value="Delete"
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
