import axios from "axios";
import { useEffect, useState } from "react";
import "./submit_support.css";
import { port } from "./ProtUrl";

export default function SubmitEvents({ login }) {
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [addMode, setAddMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [newEntryVisible, setNewEntryVisible] = useState(false);
  const [newEntryData, setNewEntryData] = useState({
    EmployeeID: login,
    ProgramName: "",
    DateFrom: "",
    DateTo: "",
    Outcome: "",
    Role: "",
    Acc_year: "",
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
      .get(`${port}eventinfo?userid=${login}`)
      .then((res) => setData(res.data));
  }, [refresh]);
  const handleDelete = (index) => {
    console.log(index);
    axios
      .delete(`${port}eventinfo?eventuserid=${index}`)
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
    axios.put(`${port}eventinfo`, item).then(() => {
      setRefresh((prev) => prev + 1);
      setEditIndex(null);
    });
  };
  const handleAddSubmit = () => {
    axios.post(`${port}eventinfo`, addrow).then(() => {
      setAddMode(false);
      setAddRow({
        EmployeeID: login,
        ProgramName: "",
        DateFrom: "",
        DateTo: "",
        Outcome: "",
        Role: "",
        Acc_year: "",
      });
      setRefresh((prev) => prev + 1);
    });
  };
  const handleAddChange = (key, value) => {
    setAddRow((prev) => ({ ...prev, [key]: value }));
  };

  const handleEditChange = (index, key, value) => {
    const updated = [...data];
    updated[index][key] = value;
    setData(updated);
  };

  const handleSubmitEdit = (index) => {
    const row = data[index];
    axios
      .put(`${port}eventinfo`, row)
      .then(() => setRefresh((prev) => prev + 1));
  };

  const handleNewEntryChange = (key, value) => {
    setNewEntryData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmitNewEntry = () => {
    axios.post(`${port}eventinfo`, newEntryData).then(() => {
      setNewEntryVisible(false);
      setRefresh((prev) => prev + 1);
    });
  };

  return (
    <div className="Container">
      <div className="HeadingDiv">
        Events
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
            {Object.entries(item).map(([key, val]) =>
              key !== "eventuserid" ? (
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
                onClick={() => handleDelete(item.eventuserid)}
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
