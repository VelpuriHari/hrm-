import axios from "axios";
import { useEffect, useState } from "react";
import "./submit_support.css";
import { port } from "./ProtUrl";

export default function SubmitEvents({ login }) {
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(0);
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

  useEffect(() => {
    axios
      .get(`${port}eventinfo?userid=${login}`)
      .then((res) => setData(res.data));
  }, [refresh]);

  const handleDelete = (index) => {
    axios
      .delete(`${port}eventinfo?eventuserid=${data[index].eventuserid}`)
      .then(() => setRefresh((prev) => prev + 1));
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
          onClick={() => setNewEntryVisible(true)}
        />
      </div>

      <div className="DisplyaDiv">
        {data.map((id, index) => {
          const isNewRow = newEntryVisible && index === data.length;
          return (
            <div key={index} className="profile">
              <div>
                <b>EmployeeID:</b> {id.EmployeeID} <br />
                <b>ProgramName:</b>{" "}
                <input
                  type="text"
                  value={id.ProgramName}
                  onChange={(e) =>
                    handleEditChange(index, "ProgramName", e.target.value)
                  }
                />
                <br />
                <b>DateFrom:</b>{" "}
                <input
                  type="text"
                  value={id.DateFrom}
                  onChange={(e) =>
                    handleEditChange(index, "DateFrom", e.target.value)
                  }
                />
                <br />
                <b>DateTo:</b>{" "}
                <input
                  type="text"
                  value={id.DateTo}
                  onChange={(e) =>
                    handleEditChange(index, "DateTo", e.target.value)
                  }
                />
                <br />
                <b>Outcome:</b>{" "}
                <input
                  type="text"
                  value={id.Outcome}
                  onChange={(e) =>
                    handleEditChange(index, "Outcome", e.target.value)
                  }
                />
                <br />
                <b>Role:</b>{" "}
                <input
                  type="text"
                  value={id.Role}
                  onChange={(e) =>
                    handleEditChange(index, "Role", e.target.value)
                  }
                />
                <br />
                <b>Acc_year:</b>{" "}
                <input
                  type="text"
                  value={id.Acc_year}
                  onChange={(e) =>
                    handleEditChange(index, "Acc_year", e.target.value)
                  }
                />
              </div>
              <div>
                <input
                  type="button"
                  value="Save"
                  id="Btn"
                  onClick={() => handleSubmitEdit(index)}
                />
                <input
                  type="button"
                  value="Delete"
                  id="Btn"
                  onClick={() => handleDelete(index)}
                />
              </div>
            </div>
          );
        })}

        {newEntryVisible && (
          <div className="profile">
            <div>
              <b>EmployeeID:</b> {login} <br />
              <b>ProgramName:</b>{" "}
              <input
                type="text"
                value={newEntryData.ProgramName}
                onChange={(e) =>
                  handleNewEntryChange("ProgramName", e.target.value)
                }
              />
              <br />
              <b>DateFrom:</b>{" "}
              <input
                type="text"
                value={newEntryData.DateFrom}
                onChange={(e) =>
                  handleNewEntryChange("DateFrom", e.target.value)
                }
              />
              <br />
              <b>DateTo:</b>{" "}
              <input
                type="text"
                value={newEntryData.DateTo}
                onChange={(e) => handleNewEntryChange("DateTo", e.target.value)}
              />
              <br />
              <b>Outcome:</b>{" "}
              <input
                type="text"
                value={newEntryData.Outcome}
                onChange={(e) =>
                  handleNewEntryChange("Outcome", e.target.value)
                }
              />
              <br />
              <b>Role:</b>{" "}
              <input
                type="text"
                value={newEntryData.Role}
                onChange={(e) => handleNewEntryChange("Role", e.target.value)}
              />
              <br />
              <b>Acc_year:</b>{" "}
              <input
                type="text"
                value={newEntryData.Acc_year}
                onChange={(e) =>
                  handleNewEntryChange("Acc_year", e.target.value)
                }
              />
            </div>
            <div>
              <input
                type="button"
                value="Submit"
                id="Btn"
                onClick={handleSubmitNewEntry}
              />
              <input
                type="button"
                value="Cancel"
                id="Btn"
                onClick={() => setNewEntryVisible(false)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
