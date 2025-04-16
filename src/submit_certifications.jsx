import axios from "axios";
import { useEffect, useState } from "react";
import "./submit_support.css";
import { port } from "./ProtUrl";

export default function SubmitCertifications({ login }) {
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [editIndex, setEditIndex] = useState(null);
  const [addMode, setAddMode] = useState(false);
  const [newEntryVisible, setNewEntryVisible] = useState(false);
  const [addrow, setAddRow] = useState({
    EmployeeID: login,
    CertificationName: "",
    Provider: "",
    Duration: "",
    Acc_Year: "",
  });
  useEffect(() => {
    axios
      .get(`${port}certifications?userid=${login}`)
      .then((res) => setData(res.data));
  }, [refresh]);

  const handleDelete = (index) => {
    console.log(index);
    axios
      .delete(`${port}certifications?certificationid=${index}`)
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
    axios.put(`${port}certifications`, item).then(() => {
      setRefresh((prev) => prev + 1);
      setEditIndex(null);
    });
  };
  const handleEditChange = (index, key, value) => {
    const updated = [...data];
    updated[index][key] = value;
    setData(updated);
  };
  const handleAddSubmit = () => {
    axios.post(`${port}certifications`, addrow).then(() => {
      setAddMode(false);
      setAddRow({
        EmployeeID: login,
        CertificationName: "",
        Provider: "",
        Duration: "",
        Acc_Year: "",
      });
      setRefresh((prev) => prev + 1);
    });
  };

  const handleSubmitEdit = (index) => {
    const row = data[index];
    axios.put(`${port}certifications`, row).then(() => {
      setEditIndex(null);
      setRefresh((prev) => prev + 1);
    });
  };
  /*
  const handleAddChange = (key, value) => {
    setData((prev) => {
      const newData = [...prev];
      newData[prev.length] = {
        ...(newData[prev.length] || {}),
        EmployeeID: login,
        [key]: value,
      };
      return newData;
    });
  };*/
  const handleAddChange = (key, value) => {
    setAddRow((prev) => ({ ...prev, [key]: value }));
  };
  const handleSubmitAdd = () => {
    const newEntry = data[data.length - 1];
    axios.post(`${port}certifications`, newEntry).then(() => {
      setNewEntryVisible(false);
      setRefresh((prev) => prev + 1);
    });
  };

  return (
    <div className="Container">
      <div className="HeadingDiv">
        Certifications
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
            {Object.entries(item).map(([key, val]) =>
              key !== "certificationid" ? (
                <div key={key}>
                  <b>{key}:</b>{" "}
                  {editIndex === index ? (
                    <input
                      type="text"
                      value={val}
                      onChange={(e) => handleChange(key, e.target.value)}
                    />
                  ) : (
                    val
                  )}
                </div>
              ) : null
            )}
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
                onClick={() => handleDelete(item.certificationid)}
              />
            </div>
          </div>
        ))}

        {addMode && (
          <div className="profile1">
            {Object.entries(addrow).map(([key, val]) => (
              <div key={key}>
                <b>{key}:</b>{" "}
                <input
                  type="text"
                  value={val}
                  onChange={(e) => handleAddChange(key, e.target.value)}
                />
              </div>
            ))}
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
