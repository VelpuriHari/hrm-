import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Login from "./Login";
import Registration from "./Registration";
import ChangePassword from "./ChangePassword";
import Profile from "./Profile";
import Support from "./Support";
import Publicatons from "./Publications";
import TLC from "./TLC";
import Certifications from "./Certifications";
import Event from "./Event";
import Patents from "./Patents";
import SubmitSupport from "./submit_support";
import SubmitPublications from "./submit_publications";
import SubmitTLC from "./submit_TLC";
import SubmitCertifications from "./submit_certifications";
import SubmitEvents from "./submit_events";
import SubmitPatents from "./submit_patents";
import SubmitResearch from "./submit_research";
import Home from "./Home";
import Filters from "./Filters";
import Analysis from "./Analysis";

function App() {
  return (
    <div classN ame="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/filters" element={<Filters />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/admin" element={<Registration />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/support" element={<Support />} />
          <Route path="/publications" element={<Publicatons />} />
          <Route path="/teachingandlearning" element={<TLC />} />
          <Route path="/OnlineCertifications" element={<Certifications />} />
          <Route path="/Event" element={<Event />} />
          <Route path="/Patents" element={<Patents />} />
          <Route path="/submitPublications" element={<SubmitPublications />} />
          <Route path="/submitTLC" element={<SubmitTLC />} />
          <Route
            path="/submitCertifications"
            element={<SubmitCertifications />}
          />
          <Route path="/submitEvents" element={<SubmitEvents />} />
          <Route path="/submitPatents" element={<SubmitPatents />} />

          <Route path="/submitSupport" element={<SubmitSupport />} />
          <Route path="/submitResearch" element={<SubmitResearch />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
