import axios from "axios";
import { useEffect, useState } from "react";
import "./submit_support.css";
import { port } from "./ProtUrl";

export default function SubmitPatents({ login }) {
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [addMode, setAddMode] = useState(false);
  const [newEntryVisible, setNewEntryVisible] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
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

  /*
  const handleDelete = (e, index) => {
    e.preventDefault();
    axios
      .delete(`${port}patents?patentuserid=${data[index].patentuserid}`)
      .then((res) => {
        setRefresh((prev) => prev + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };*/

  const handleModify = (e, key, index) => {
    const newData = [...data];
    newData[index][key] = e.target.value;
    setData(newData);
  };

  const handleSubmitModify = (e, index) => {
    e.preventDefault();
    axios
      .put(`${port}patents`, data[index])
      .then((res) => {
        setRefresh((prev) => prev + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAdd = (e, key) => {
    setAddRow((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleSubmitAdd = (e) => {
    e.preventDefault();
    axios
      .post(`${port}patents`, addrow)
      .then((res) => {
        setRefresh((prev) => prev + 1);
      })
      .catch((err) => {
        console.log(err);
      });
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
            {Object.entries(item).map(([key, val]) =>
              key !== "patentuserid" ? (
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
                onClick={() => handleDelete(item.patentuserid)}
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
