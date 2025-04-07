import axios from "axios";
import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "./submit_support.css";

export default function SubmitCertifications({ login }) {
  const [data, setData] = useState([]);
  const [delete_, setDelete] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [modify, setModify] = useState({
    EmployeeID: login,
    CertificationName: "",
    Provider: "",
    Duration: "",
    Acc_Year: "",
    certificationid: "",
  });
  const [addrow, setAddRow] = useState({
    EmployeeID: login,
    CertificationName: "",
    Provider: "",
    Duration: "",
    Acc_Year: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8081/certifications?userid=${login}`)
      .then((res) => {
        setData(res.data);
      })
      .then((err) => {});
  }, [refresh]);
  const handleDelete = (e, index) => {
    console.log(data[index].certificationid);
    e.preventDefault();
    axios
      .delete(
        `http://localhost:8081/certifications?certificationid=${data[index].certificationid}`
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
      certificationid: index,
    }));
    console.log(modify);
  }; ///
  const handleSubmitModify = (e, index) => {
    e.preventDefault();
    console.log(modify);
    console.log(typeof index);
    axios
      .put("http://localhost:8081/certifications", modify)
      .then(
        (res) => console.log(res),
        setRefresh((prev) => prev + 1)
      )
      .then((err) => console.log(err));
    setRefresh((prev) => prev + 1);
  };
  ////
  const handleAdd = (e, key) => {
    e.preventDefault();
    setAddRow((prev) => ({ ...prev, [key]: e.target.value }));
  };
  ////////
  const handleSubmitAdd = () => {
    axios
      .post(`http://localhost:8081/certifications`, addrow)
      .then(
        (res) => console.log(res),
        setRefresh((prev) => prev + 1)
      )
      .then((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="Container">
        <div className="HeadingDiv">
          Certifications
          <Popup
            trigger={<input type="button" value="Add Row" id="Btn" />}
            modal
            nested
          >
            {(close) => (
              <>
                <div className="Popupdiv1">
                  <table>
                    <tr>
                      <td>CertificationName</td>
                      <td>Provider</td>
                      <td>Duration</td>
                      <td>Acc_Year</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>
                        <input
                          type="text"
                          onChange={(e) => handleAdd(e, "CertificationName")}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          onChange={(e) => handleAdd(e, "Provider")}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          onChange={(e) => handleAdd(e, "Duration")}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          onChange={(e) => handleAdd(e, "Acc_Year")}
                        />
                      </td>
                      <td>
                        <input
                          type="submit"
                          id="Btn"
                          onClick={handleSubmitAdd}
                        />
                      </td>
                    </tr>
                  </table>
                </div>
              </>
            )}
          </Popup>
        </div>
        <div className="DisplyaDiv">
          {data.map((id, index) => {
            return (
              <div key={index} className="profile">
                <div>
                  <b>EmployeeID: </b>
                  {id.EmployeeID}
                  <br />
                  <b>CertificationName:</b> {id.CertificationName} <br />
                  <b> Provider:</b>
                  {id.Provider}
                  <br />
                  <b>Duration:</b> {id.Duration}
                  <br />
                  <b>Acc_Year:</b> {id.Acc_Year}
                </div>
                <div>
                  <Popup
                    trigger={<input type="button" value="modify" id="Btn" />}
                    modal
                    nested
                  >
                    {(close) => (
                      <>
                        <div className="Popupdiv1">
                          <table>
                            <tr>
                              <td>
                                <input
                                  type="text"
                                  defaultValue={id.CertificationName}
                                  onChange={(e) =>
                                    handleModify(
                                      e,
                                      "CertificationName",
                                      id.certificationid
                                    )
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  defaultValue={id.Provider}
                                  onChange={(e) =>
                                    handleModify(
                                      e,
                                      "Provider",
                                      id.certificationid
                                    )
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  defaultValue={id.Duration}
                                  onChange={(e) =>
                                    handleModify(
                                      e,
                                      "Duration",
                                      id.certificationid
                                    )
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  defaultValue={id.Acc_Year}
                                  onChange={(e) =>
                                    handleModify(
                                      e,
                                      "Acc_Year",
                                      id.certificationid
                                    )
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  onClick={(e) => {
                                    handleSubmitModify(e);
                                    close();
                                  }}
                                  value="Submit"
                                  id="Btn"
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
          })}
        </div>
      </div>
    </>
  );
}
