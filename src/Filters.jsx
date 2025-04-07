import "./Filters.css";
import { useState } from "react";
import Support from "./Support";
import Publicatons from "./Publications";
import TLC from "./TLC";
import Certifications from "./Certifications";
import Patents from "./Patents";
import Event from "./Event";
import { useNavigate } from "react-router";

export default function Filters() {
  const [Switch, setSwitch] = useState("Support");
  const naigate = useNavigate();
  const handleNavBar = (item) => {
    setSwitch(item);
  };
  return (
    <>
      <div className="filtersNavBar">
        <div className="homediv" onClick={() => naigate("/")}>
          Home
        </div>
        <div onClick={() => handleNavBar("Support")}>Support </div>
        <div onClick={() => handleNavBar("Publication")}>Publication</div>
        <div onClick={() => handleNavBar("tlc")}>Teaching and Learning</div>
        <div onClick={() => handleNavBar("Certifications")}>Certifications</div>
        <div onClick={() => handleNavBar("Events")}>Events</div>
        <div onClick={() => handleNavBar("Patents")}>Patents</div>
        <div onClick={() => handleNavBar("Research")}>Research</div>
      </div>
      <div className="ComponentsDiv">
        {Switch === "Support" ? (
          <Support />
        ) : Switch === "Publication" ? (
          <Publicatons />
        ) : Switch === "tlc" ? (
          <TLC />
        ) : Switch === "Certifications" ? (
          <Certifications />
        ) : Switch === "Events" ? (
          <Event />
        ) : Switch === "Patents" ? (
          <Patents />
        ) : Switch === "Research" ? (
          "NO DATA"
        ) : (
          ""
        )}
      </div>
    </>
  );
}
