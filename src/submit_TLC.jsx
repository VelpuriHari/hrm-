import axios from "axios";
import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "./submit_support.css";

export default function SubmitTLC({ login }) {
  const [data, setData] = useState([]);
  const [delete_, setDelete] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [modify, setModify] = useState({
    EmployeeID: login,
    Course: "",
    CourseCode: "",
    Year: "",
    Semester: "",
    Sec: "",
    ScheduledClasses: "",
    HeldClasses: "",
    No_ofStudentsRegistered: "",
    No_ofStudentsPassed: "",
    No_ofStudentsGivenFeedback: "",
    FeedbackResult: "",
    Acc_Year: "",
    tlpuserid: "",
  });
  const [addrow, setAddRow] = useState({
    EmployeeID: login,
    Course: "",
    CourseCode: "",
    Year: "",
    Semester: "",
    Sec: "",
    ScheduledClasses: "",
    HeldClasses: "",
    No_ofStudentsRegistered: "",
    No_ofStudentsPassed: "",
    No_ofStudentsGivenFeedback: "",
    FeedbackResult: "",
    Acc_Year: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8081/tlp?userid=${login}`)
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
      .delete(`http://localhost:8081/tlp?tlpuserid=${data[index].tlpuserid}`)
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
      tlpuserid: index,
    }));
    console.log(modify);
  }; ///
  const handleSubmitModify = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:8081/tlp", modify)
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
      .post(`http://localhost:8081/tlp`, addrow)
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
          Teaching and Learning
          <Popup
            trigger={<input type="button" value="Add Row" id="Btn" />}
            modal
            nested
          >
            {(close) => (
              <>
                <div className="Popupdiv1">
                  <tr>
                    <td>Course</td>
                    <td>CourseCode </td>
                    <td>Year </td>
                    <td>Semester </td>
                    <td> Sec</td>
                    <td>ScheduledClasses</td>
                    <td>HeldClasses</td>
                    <td>No_ofStudentsRegistered</td>
                    <td>No_ofStudentsPassed</td>
                    <td>No_ofStudentsGivenFeedback</td>
                    <td>FeedbackResult</td>
                    <td>Acc_Year</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        type="text"
                        onChange={(e) => handleAdd(e, "Course")}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        onChange={(e) => handleAdd(e, "CourseCode")}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        onChange={(e) => handleAdd(e, "Year")}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        onChange={(e) => handleAdd(e, "Semester")}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        onChange={(e) => handleAdd(e, "Sec")}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        onChange={(e) => handleAdd(e, "ScheduledClasses")}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        onChange={(e) => handleAdd(e, "HeldClasses")}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        onChange={(e) =>
                          handleAdd(e, "No_ofStudentsRegistered")
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        onChange={(e) => handleAdd(e, "No_ofStudentsPassed")}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        onChange={(e) =>
                          handleAdd(e, "No_ofStudentsGivenFeedback")
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        onChange={(e) => handleAdd(e, "FeedbackResult")}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        onChange={(e) => handleAdd(e, "Acc_Year")}
                      />
                    </td>
                    <td>
                      <input type="submit" id="Btn" onClick={handleSubmitAdd} />
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
                  <b>EmployeeID: </b>
                  {id.EmployeeID}
                  <br />
                  <b>Course:</b> {id.Course} <br />
                  <b> CourseCode:</b>
                  {id.CourseCode}
                  <br />
                  <b>Year:</b> {id.Year}
                  <br />
                  <b>Semester:</b> {id.Semester}
                  <br />
                  <b>Sec:</b> {id.Sec}
                  <br />
                  <b>ScheduledClasses:</b> {id.ScheduledClasses}
                  <br />
                  <b>HeldClasses:</b> {id.HeldClasses}
                  <br />
                  <b>No_ofStudentsRegistered:</b> {id.No_ofStudentsRegistered}
                  <br />
                  <b>No_ofStudentsPassed:</b> {id.No_ofStudentsPassed}
                  <br />
                  <b>No_ofStudentsGivenFeedback:</b>{" "}
                  {id.No_ofStudentsGivenFeedback}
                  <br />
                  <b>FeedbackResult:</b> {id.FeedbackResult}
                  <br />
                  <b>Acc_Year:</b> {id.Acc_Year}
                  <br />
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
                              <td>Course</td>
                              <td>CourseCode </td>
                              <td>Year </td>
                              <td>Semester </td>
                              <td> Sec</td>
                              <td>ScheduledClasses</td>
                              <td>HeldClasses</td>
                              <td>No_ofStudentsRegistered</td>
                              <td>No_ofStudentsPassed</td>
                              <td>No_ofStudentsGivenFeedback</td>
                              <td>FeedbackResult</td>
                              <td>Acc_Year</td>
                              <td></td>
                            </tr>
                            <tr>
                              <td>
                                <input
                                  type="text"
                                  defaultValue={id.Course}
                                  onChange={(e) =>
                                    handleModify(e, "Course", id.tlpuserid)
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  defaultValue={id.CourseCode}
                                  onChange={(e) =>
                                    handleModify(e, "CourseCode", id.tlpuserid)
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  defaultValue={id.Year}
                                  onChange={(e) =>
                                    handleModify(e, "Year", id.tlpuserid)
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  defaultValue={id.Semester}
                                  onChange={(e) =>
                                    handleModify(e, "Semester", id.tlpuserid)
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  defaultValue={id.Sec}
                                  onChange={(e) =>
                                    handleModify(e, "Sec", id.tlpuserid)
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  defaultValue={id.ScheduledClasses}
                                  onChange={(e) =>
                                    handleModify(
                                      e,
                                      "ScheduledClasses",
                                      id.tlpuserid
                                    )
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  defaultValue={id.HeldClasses}
                                  onChange={(e) =>
                                    handleModify(e, "HeldClasses", id.tlpuserid)
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  defaultValue={id.No_ofStudentsRegistered}
                                  onChange={(e) =>
                                    handleModify(
                                      e,
                                      "No_ofStudentsRegistered",
                                      id.tlpuserid
                                    )
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  defaultValue={id.No_ofStudentsPassed}
                                  onChange={(e) =>
                                    handleModify(
                                      e,
                                      "No_ofStudentsPassed",
                                      id.tlpuserid
                                    )
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  defaultValue={id.No_ofStudentsGivenFeedback}
                                  onChange={(e) =>
                                    handleModify(
                                      e,
                                      "No_ofStudentsGivenFeedback",
                                      id.tlpuserid
                                    )
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  defaultValue={id.FeedbackResult}
                                  onChange={(e) =>
                                    handleModify(
                                      e,
                                      "FeedbackResult",
                                      id.tlpuserid
                                    )
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  defaultValue={id.Acc_Year}
                                  onChange={(e) =>
                                    handleModify(e, "Acc_Year", id.tlpuserid)
                                  }
                                />
                              </td>
                            </tr>
                          </table>
                          <input
                            id="Btn"
                            onClick={(e) => {
                              handleSubmitModify(e);
                              close();
                            }}
                            value="Submit"
                          />
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
