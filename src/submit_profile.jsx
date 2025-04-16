import { useEffect, useState } from "react";
import axios from "axios";
import "./submit_profile.css";
import { port } from "./ProtUrl";

export default function SubmitProfile({ login }) {
  const [data, setData] = useState(null);
  const [editable, setEditable] = useState(false);
  const [formData, setFormData] = useState({});
  const [photoFile, setPhotoFile] = useState(null);

  useEffect(() => {
    axios
      .get(`${port}emplyooe?login=${login}`)
      .then((response) => {
        setData(response.data);
        setFormData(response.data);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, [login]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    setPhotoFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const handleSave = async () => {
    const updatedData = { ...formData };

    // If there's a new photo, upload it
    if (photoFile) {
      console.log(photoFile);
      const photoForm = new FormData();
      photoForm.append("photo", photoFile);
      console.log(photoForm);
      try {
        const uploadRes = await axios.post(`${port}upload-photo`, photoForm, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        updatedData.Photo = uploadRes.data.url; // Assume server responds with { url: "photo_url" }
      } catch (err) {
        console.error("Photo upload failed:", err);
      }
    }

    // Update data
    try {
      console.log(updatedData);
      await axios.put(`${port}employee?login=${login}`, updatedData);
      setData(updatedData);
      setEditable(false);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <div>
      {data && (
        <div className="ProfileCont">
          <div>
            <h1>
              {editable ? (
                <input
                  name="Name"
                  value={formData.Name}
                  onChange={handleChange}
                />
              ) : (
                data.Name
              )}
            </h1>
            <table>
              <tbody>
                {[
                  "Designation",
                  "Department",
                  "DateOfJoining",
                  "Email",
                  "Mobile",
                  "HighestQualification",
                ].map((field) => (
                  <tr key={field}>
                    <td>
                      <span>{field.replace(/([A-Z])/g, " $1")}</span>
                    </td>
                    <td>
                      :{" "}
                      {editable ? (
                        <input
                          type={field === "DateOfJoining" ? "date" : "text"}
                          name={field}
                          value={formData[field] || ""}
                          onChange={handleChange}
                        />
                      ) : (
                        data[field]
                      )}
                    </td>
                  </tr>
                ))}
                {editable && (
                  <tr>
                    <td>
                      <span>Upload Photo</span>
                    </td>
                    <td>
                      :{" "}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                      />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <button
              onClick={() => (editable ? handleSave() : setEditable(true))}
            >
              {editable ? "Save" : "Edit"}
            </button>
          </div>
          <div>
            {data.Photo && (
              <img
                src={data.Photo}
                alt={`${data.Name}'s profile`}
                id="ProfileIMG"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
