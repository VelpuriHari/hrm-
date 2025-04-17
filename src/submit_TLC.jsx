import axios from "axios";
import { useEffect, useState } from "react";
import "./submit_support.css";
import { port } from "./ProtUrl";

export default function SubmitTLC({ login }) {
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [editIndex, setEditIndex] = useState(null);
  const [addMode, setAddMode] = useState(false);
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
    axios.get(`${port}tlp?userid=${login}`).then((res) => setData(res.data));
  }, [refresh]);

  const handleDelete = (id) => {
    axios
      .delete(`${port}tlp?tlpuserid=${id}`)
      .then(() => setRefresh((prev) => prev + 1));
  };

  const handleChange = (key, value) => {
    setData((prev) =>
      prev.map((item, i) =>
        i === editIndex ? { ...item, [key]: value } : item
      )
    );
  };

  const handleSave = (item) => {
    console.log(item);
    axios.put(`${port}tlp`, item).then(() => {
      setRefresh((prev) => prev + 1);
      setEditIndex(null);
    });
  };

  const handleAddChange = (key, value) => {
    setAddRow((prev) => ({ ...prev, [key]: value }));
  };

  const handleAddSubmit = () => {
    axios.post(`${port}tlp`, addrow).then(() => {
      setAddMode(false);
      setAddRow({
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
      setRefresh((prev) => prev + 1);
    });
  };

  return (
    <div className="Container">
      <div className="HeadingDiv">
        Teaching and Learning
        <input
          type="button"
          value="Add Row"
          id="Btn"
          onClick={() => setAddMode(true)}
        />
      </div>
      <div className="DisplyaDiv">
        {data.map((item, index) => (
          <div key={item.tlpuserid} className="profile1">
            <table>
              <tbody>
                {Object.entries(item).map(([key, val]) =>
                  key !== "tlpuserid" ? (
                    <tr>
                      <td>
                        <b>{key}:</b>
                      </td>
                      <td>
                        {editIndex === index ? (
                          <input
                            type="text"
                            value={val}
                            onChange={(e) => handleChange(key, e.target.value)}
                          />
                        ) : (
                          val
                        )}
                      </td>
                    </tr>
                  ) : null
                )}
              </tbody>
            </table>
            <div>
              {editIndex === index ? (
                <>
                  <input
                    type="button"
                    id="Btn"
                    value="Save"
                    onClick={() => handleSave(item)}
                  />
                  <input
                    type="button"
                    id="Btn"
                    value="Cancel"
                    onClick={() => setEditIndex(null)}
                  />
                </>
              ) : (
                <input
                  type="button"
                  id="Btn"
                  value="Modify"
                  onClick={() => setEditIndex(index)}
                />
              )}
              <input
                type="button"
                id="Btn"
                value="Delete"
                onClick={() => handleDelete(item.tlpuserid)}
              />
            </div>
          </div>
        ))}

        {addMode && (
          <div className="profile1">
            <table>
              <tbody>
                {Object.entries(addrow).map(([key, val]) => (
                  <tr>
                    <td>
                      <b>{key}:</b>
                    </td>
                    <td>
                      {" "}
                      <input
                        type="text"
                        value={val}
                        onChange={(e) => handleAddChange(key, e.target.value)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div>
              <input
                type="button"
                id="Btn"
                value="Submit"
                onClick={handleAddSubmit}
              />
              <input
                type="button"
                id="Btn"
                value="Cancel"
                onClick={() => setAddMode(false)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
