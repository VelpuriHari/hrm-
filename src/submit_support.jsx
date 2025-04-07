import axios from "axios";
import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "./submit_support.css";

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
      .get(`http://localhost:8081/support?userid=${login}`)
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
        `http://localhost:8081/support?userid=${login}&EmplooyeId=${data[index].EmplooyeId}&Role=${data[index].Role}&Support=${data[index].Support}&Peroid=${data[index].Peroid}`
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
    console.log(typeof index);
    axios
      .put("http://localhost:8081/support", modify)
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
      .post(`http://localhost:8081/support`, addrow)
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
          <Popup
            trigger={<input type="button" value="Add Row" id="Btn" />}
            modal
            nested
          >
            {(close) => (
              <>
                {" "}
                <div className="Popupdiv1">
                  <tr>
                    <td>Role</td>
                    <td>Scope</td>
                    <td>Support</td>
                    <td>Peroid</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        type="text"
                        onChange={(e) => handleAdd(e, "Role")}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        onChange={(e) => handleAdd(e, "Scope")}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        onChange={(e) => handleAdd(e, "Support")}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        onChange={(e) => handleAdd(e, "Peroid")}
                      />
                    </td>
                    <td>
                      {" "}
                      <input
                        type="submit"
                        id="Btn"
                        onClick={() => (handleSubmitAdd(), close())}
                      />
                    </td>
                  </tr>
                </div>
              </>
            )}
          </Popup>
        </div>
        <div className="DisplyaDiv">
          {data.length !== 0
            ? data.map((id, index) => {
                return (
                  <div key={index} className="profile">
                    <div>
                      <b>EmplooyeId: </b>
                      {id.EmployeeID}
                      {console.log(id.support_userid)}
                      <br />
                      <b>Role:</b> {id.Role} <br />
                      <b> Scope:</b>
                      {id.Scope}
                      <br />
                      <b>Support:</b> {id.Support}
                      <br />
                      <b>Peroid:</b> {id.Acc_Year}
                    </div>
                    <div>
                      <Popup
                        trigger={
                          <input type="button" value="modify" id="Btn" />
                        }
                        modal
                        nested
                      >
                        {(close) => (
                          <>
                            <div className="Popupdiv1">
                              <table>
                                <tr>
                                  <td>Role</td>
                                  <td>Scope</td>
                                  <td>Support</td>
                                  <td>Peroid</td>
                                  <td></td>
                                </tr>
                                <tr>
                                  <td>
                                    <input
                                      type="text"
                                      defaultValue={id.Role}
                                      onChange={(e) =>
                                        handleModify(
                                          e,
                                          "Role",
                                          id.support_userid
                                        )
                                      }
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      defaultValue={id.Scope}
                                      onChange={(e) =>
                                        handleModify(
                                          e,
                                          "Scope",
                                          id.support_userid
                                        )
                                      }
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      defaultValue={id.Support}
                                      onChange={(e) =>
                                        handleModify(
                                          e,
                                          "Support",
                                          id.support_userid
                                        )
                                      }
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      defaultValue={id.Acc_Year}
                                      onChange={(e) => {
                                        handleModify(
                                          e,
                                          "Peroid",
                                          id.support_userid
                                        );
                                      }}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      id="Btn"
                                      onClick={(e) => {
                                        handleSubmitModify(e);
                                        close();
                                      }}
                                      type="Submit"
                                    />
                                  </td>
                                </tr>
                              </table>
                            </div>
                          </>
                        )}
                      </Popup>
                      <input
                        type="button"
                        onClick={(e) => handleDelete(e, index)}
                        value="Delete"
                        id="Btn"
                      />
                    </div>
                  </div>
                );
              })
            : "NO DATA"}
        </div>
      </div>
    </>
  );
}
