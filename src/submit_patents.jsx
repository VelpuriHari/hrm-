import axios from "axios";
import { useEffect, useState } from "react";
import "./submit_support.css";
import { port } from "./ProtUrl";

export default function SubmitPatents({ login }) {
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [addMode, setAddMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

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

  const handleDelete = (index) => {
    console.log(index);
    axios
      .delete(`${port}patents?patentuserid=${index}`)
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
    axios.put(`${port}patents`, item).then(() => {
      setRefresh((prev) => prev + 1);
      setEditIndex(null);
    });
  };
  const handleAddSubmit = () => {
    axios.post(`${port}patents`, addrow).then(() => {
      setAddMode(false);
      setAddRow({
        EmployeeID: login,
        Title: "",
        Application_Number: "",
        date_of_filing: "",
        Status: "",
        date_of_grant: "",
        Acc_year: "",
      });
      setRefresh((prev) => prev + 1);
    });
  };
  const handleAddChange = (key, value) => {
    setAddRow((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="Container">
      <div className="HeadingDiv">
        Patents
        <input
          type="button"
          value="Add Row"
          id="Btn"
          onClick={() => setAddMode(true)}
        />
      </div>
      <div className="DisplyaDiv">
        {data.map((item, index) => (
          <div key={item.certificationid} className="profile1">
            <table>
              <tbody>
                {Object.entries(item).map(([key, val]) =>
                  key !== "patentuserid" ? (
                    <tr>
                      <td>
                        {" "}
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
                onClick={() => handleDelete(item.patentuserid)}
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
