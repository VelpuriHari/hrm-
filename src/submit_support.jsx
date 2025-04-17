import axios from "axios";
import { useEffect, useState } from "react";
import "./submit_support.css";
import { port } from "./ProtUrl";

export default function SubmitSupport({ login }) {
  const [data, setData] = useState([]);
  const [addMode, setAddMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const [addrow, setAddRow] = useState({
    EmployeeId: login,
    Role: "",
    Scope: "",
    Support: "",
    Peroid: "",
  });

  useEffect(() => {
    axios
      .get(`${port}support?userid=${login}`)
      .then((res) => {
        setData(res.data);
        //console.log(data);hg
      })
      .then((err) => {
        // consougugihoijogugiygugi
      });
  }, [refresh]);

  const handleDelete = (index) => {
    console.log(index);
    axios
      .delete(`${port}support?support_userid=${index}`)
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
    axios.put(`${port}support`, item).then(() => {
      setRefresh((prev) => prev + 1);
      setEditIndex(null);
    });
  };
  const handleAddSubmit = () => {
    axios.post(`${port}support`, addrow).then(() => {
      setAddMode(false);
      setAddRow({
        EmployeeId: login,
        Role: "",
        Scope: "",
        Support: "",
        Peroid: "",
      });
      setRefresh((prev) => prev + 1);
    });
  };
  const handleAddChange = (key, value) => {
    setAddRow((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <div className="Container">
        <div className="HeadingDiv">
          Support
          <input
            type="button"
            value="Add Row"
            id="Btn"
            onClick={() => setAddMode(true)}
          />
        </div>
        <div className="DisplyaDiv">
          {data.map((item, index) => (
            <div key={item.eventuserid} className="profile1">
              <table>
                <tbody>
                  {Object.entries(item).map(([key, val]) =>
                    key !== "support_userid" ? (
                      <tr>
                        <td>
                          {" "}
                          <b>{key}</b>
                        </td>
                        <td>
                          {editIndex === index ? (
                            <input
                              type="text"
                              value={val}
                              onChange={(e) =>
                                handleChange(key, e.target.value)
                              }
                            />
                          ) : (
                            ((<b>:</b>), val)
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
                  onClick={() => handleDelete(item.support_userid)}
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
    </>
  );
}
