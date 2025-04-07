import { useState } from "react";
import "./Profile.css";
import SubmitSupport from "./submit_support";
import SubmitPublications from "./submit_publications";
import SubmitTLC from "./submit_TLC";
import SubmitCertifications from "./submit_certifications";
import SubmitEvents from "./submit_events";
import SubmitPatents from "./submit_patents";
import SubmitResearch from "./submit_research";
import SubmitProfile from "./submit_profile";
import { useLocation } from "react-router";
export default function Profile() {
  const [Switch, setSwitch] = useState("Profile");
  const location = useLocation();
  const login = location.state?.login;
  const handleNavBar = (item) => {
    setSwitch(item);
  };
  return (
    <>
      <div className="top">{Switch}</div>
      <div className="bodyDiv">
        <div className="NavDiv">
          <div className="NavDivItems" onClick={() => handleNavBar("Profile")}>
            Profile
          </div>
          <div className="NavDivItems" onClick={() => handleNavBar("Support")}>
            Support
          </div>
          <div
            className="NavDivItems"
            onClick={() => handleNavBar("Publication")}
          >
            Publication
          </div>
          <div
            className="NavDivItems"
            onClick={() => handleNavBar("Teching and Learning")}
          >
            Teaching and Learning
          </div>
          <div
            className="NavDivItems"
            onClick={() => handleNavBar("Certifications")}
          >
            Certifications
          </div>
          <div className="NavDivItems" onClick={() => handleNavBar("Events")}>
            {" "}
            Events{" "}
          </div>
          <div className="NavDivItems" onClick={() => handleNavBar("Patents")}>
            Patents{" "}
          </div>

          <div className="NavDivItems" onClick={() => handleNavBar("Research")}>
            Research
          </div>
        </div>

        <div className="Componentsdiv">
          {Switch === "Profile" ? (
            <SubmitProfile login={login} />
          ) : Switch === "Support" ? (
            <SubmitSupport login={login} />
          ) : Switch === "Publication" ? (
            <SubmitPublications login={login} />
          ) : Switch === "Teching and Learning" ? (
            <SubmitTLC login={login} />
          ) : Switch === "Certifications" ? (
            <SubmitCertifications login={login} />
          ) : Switch === "Events" ? (
            <SubmitEvents login={login} />
          ) : Switch === "Patents" ? (
            <SubmitPatents login={login} />
          ) : Switch === "Research" ? (
            <SubmitResearch login={login} />
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
