import axios from "axios";
import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "./submit_support.css";
import { port } from "./ProtUrl";

export default function SubmitSupport({ login }) {
  const [data, setData] = useState([]);
  const [delete_, setDelete] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [modify, setModify] = useState({
    EmployeeID: login,
    Role: "",
    Scope: "",
    Support: "",
    Peroid: "",
  });
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
  const handleDelete = (e, index) => {
    console.log(data[index]);
    e.preventDefault();
    axios
      .delete(
        `${port}support?userid=${login}&EmplooyeId=${data[index].EmplooyeId}&Role=${data[index].Role}&Support=${data[index].Support}&Peroid=${data[index].Peroid}`
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
      support_userid: index,
    }));
    console.log(modify);
  }; ///
  const handleSubmitModify = (e, index) => {
    e.preventDefault();
    console.log(modify);
    axios
      .put(`${port}support`, modify)
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
    console.log(addrow);
  };
  ////////
  const handleSubmitAdd = () => {
    axios
      .post(`${port}support`, addrow)
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
          Support
          <input
            type="button"
            value="Add Row"
            id="Btn"
            onClick={() =>
              setData((prev) => [
                ...prev,
                {
                  EmployeeID: login,
                  Role: "",
                  Scope: "",
                  Support: "",
                  Acc_Year: "",
                  support_userid: "new_" + Date.now(), // temp ID
                  isNew: true,
                },
              ])
            }
          />
        </div>
        <div className="DisplyaDiv">
          {data.map((id, index) => {
            const isNew = id.isNew;
            const isEditing =
              isNew || modify.support_userid === id.support_userid;

            return (
              <div key={index} className="profile">
                <div>
                  <b>EmployeeID:</b> {id.EmployeeID} <br />
                  <b>Role:</b>{" "}
                  {isEditing ? (
                    <input
                      type="text"
                      defaultValue={id.Role}
                      onChange={(e) =>
                        handleModify(e, "Role", id.support_userid)
                      }
                    />
                  ) : (
                    id.Role
                  )}
                  <br />
                  <b>Scope:</b>{" "}
                  {isEditing ? (
                    <input
                      type="text"
                      defaultValue={id.Scope}
                      onChange={(e) =>
                        handleModify(e, "Scope", id.support_userid)
                      }
                    />
                  ) : (
                    id.Scope
                  )}
                  <br />
                  <b>Support:</b>{" "}
                  {isEditing ? (
                    <input
                      type="text"
                      defaultValue={id.Support}
                      onChange={(e) =>
                        handleModify(e, "Support", id.support_userid)
                      }
                    />
                  ) : (
                    id.Support
                  )}
                  <br />
                  <b>Period:</b>{" "}
                  {isEditing ? (
                    <input
                      type="text"
                      defaultValue={id.Acc_Year}
                      onChange={(e) =>
                        handleModify(e, "Peroid", id.support_userid)
                      }
                    />
                  ) : (
                    id.Acc_Year
                  )}
                </div>
                <div>
                  {isEditing ? (
                    <input
                      id="Btn"
                      type="button"
                      value="Save"
                      onClick={(e) => {
                        if (isNew) {
                          axios
                            .post(`${port}support`, {
                              EmployeeId: id.EmployeeID,
                              Role: modify.Role,
                              Scope: modify.Scope,
                              Support: modify.Support,
                              Peroid: modify.Peroid,
                            })
                            .then((res) => {
                              console.log(res);
                              setRefresh((prev) => prev + 1);
                            });
                        } else {
                          handleSubmitModify(e);
                        }

                        setModify({
                          EmployeeID: login,
                          Role: "",
                          Scope: "",
                          Support: "",
                          Peroid: "",
                        });
                      }}
                    />
                  ) : (
                    <input
                      type="button"
                      value="Modify"
                      id="Btn"
                      onClick={() =>
                        setModify({
                          EmployeeID: id.EmployeeID,
                          Role: id.Role,
                          Scope: id.Scope,
                          Support: id.Support,
                          Peroid: id.Acc_Year,
                          support_userid: id.support_userid,
                        })
                      }
                    />
                  )}
                  <input
                    type="button"
                    onClick={(e) => handleDelete(e, index)}
                    value="Delete"
                    id="Btn"
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
