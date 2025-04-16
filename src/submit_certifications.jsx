import axios from "axios";
import { useEffect, useState } from "react";
import "./submit_support.css";
import { port } from "./ProtUrl";

export default function SubmitCertifications({ login }) {
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [editIndex, setEditIndex] = useState(null);
  const [newEntryVisible, setNewEntryVisible] = useState(false);

  useEffect(() => {
    axios
      .get(`${port}certifications?userid=${login}`)
      .then((res) => setData(res.data));
  }, [refresh]);

  const handleDelete = (index) => {
    axios
      .delete(
        `${port}certifications?certificationid=${data[index].certificationid}`
      )
      .then(() => setRefresh((prev) => prev + 1));
  };

  const handleEditChange = (index, key, value) => {
    const updated = [...data];
    updated[index][key] = value;
    setData(updated);
  };

  const handleSubmitEdit = (index) => {
    const row = data[index];
    axios.put(`${port}certifications`, row).then(() => {
      setEditIndex(null);
      setRefresh((prev) => prev + 1);
    });
  };

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
          onClick={() => setNewEntryVisible(true)}
        />
      </div>
      <div className="DisplyaDiv">
        {data.map((id, index) => {
          const isEditing = editIndex === index;
          const isNewRow = newEntryVisible && index === data.length - 1;

          return (
            <div key={index} className="profile">
              <div>
                <b>EmployeeID:</b> {id.EmployeeID} <br />
                <b>CertificationName:</b>{" "}
                {isEditing || isNewRow ? (
                  <input
                    type="text"
                    value={id.CertificationName || ""}
                    onChange={(e) =>
                      isNewRow
                        ? handleAddChange("CertificationName", e.target.value)
                        : handleEditChange(
                            index,
                            "CertificationName",
                            e.target.value
                          )
                    }
                  />
                ) : (
                  id.CertificationName
                )}
                <br />
                <b>Provider:</b>{" "}
                {isEditing || isNewRow ? (
                  <input
                    type="text"
                    value={id.Provider || ""}
                    onChange={(e) =>
                      isNewRow
                        ? handleAddChange("Provider", e.target.value)
                        : handleEditChange(index, "Provider", e.target.value)
                    }
                  />
                ) : (
                  id.Provider
                )}
                <br />
                <b>Duration:</b>{" "}
                {isEditing || isNewRow ? (
                  <input
                    type="text"
                    value={id.Duration || ""}
                    onChange={(e) =>
                      isNewRow
                        ? handleAddChange("Duration", e.target.value)
                        : handleEditChange(index, "Duration", e.target.value)
                    }
                  />
                ) : (
                  id.Duration
                )}
                <br />
                <b>Acc_Year:</b>{" "}
                {isEditing || isNewRow ? (
                  <input
                    type="text"
                    value={id.Acc_Year || ""}
                    onChange={(e) =>
                      isNewRow
                        ? handleAddChange("Acc_Year", e.target.value)
                        : handleEditChange(index, "Acc_Year", e.target.value)
                    }
                  />
                ) : (
                  id.Acc_Year
                )}
              </div>
              <div>
                {isNewRow ? (
                  <input
                    type="button"
                    value="Submit"
                    id="Btn"
                    onClick={handleSubmitAdd}
                  />
                ) : isEditing ? (
                  <input
                    type="button"
                    value="Save"
                    id="Btn"
                    onClick={() => handleSubmitEdit(index)}
                  />
                ) : (
                  <>
                    <input
                      type="button"
                      value="Modify"
                      id="Btn"
                      onClick={() => setEditIndex(index)}
                    />
                    <input
                      type="button"
                      value="Delete"
                      id="Btn"
                      onClick={() => handleDelete(index)}
                    />
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
