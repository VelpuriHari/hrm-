import { useEffect, useState } from "react";
import axios from "axios";
import "./submit_profile.css";

export default function SubmitProfile({ login }) {
  const [imageUrl, setImageUrl] = useState(null);

  const [data, setData] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:8081/emplyooe?login=${login}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, [login]);

  return (
    <div>
      {data && (
        <div className="ProfileCont">
          <div>
            <h1> {data.Name}</h1>
            <table>
              <tr>
                <td>
                  <span>Designation</span>
                </td>
                <td>:{data.Designation}</td>
              </tr>
              <tr>
                <td>
                  <span>Department</span>{" "}
                </td>
                <td>:{data.Department}</td>
              </tr>
              <tr>
                <td>
                  <span>DateOfJoining </span>
                </td>
                <td>:{data.DateOfJoining}</td>
              </tr>
              <tr>
                <td>
                  {" "}
                  <span> Email </span>
                </td>

                <td>:{data.Email}</td>
              </tr>
              <tr>
                <td>
                  {" "}
                  <span>Mobile </span>{" "}
                </td>
                <td>:{data.Mobile}</td>
              </tr>
              <tr>
                <td>
                  {" "}
                  <span>Highest Qulification </span>
                </td>
                <td>:{data.HighestQulification}</td>
              </tr>
            </table>
          </div>
          <div>
            {data.Photo && (
              <img src={data.Photo} alt="Profile" id="ProfileIMG" />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
