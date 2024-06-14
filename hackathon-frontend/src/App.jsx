import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import HackathonList from "./components/Hackathon/HackathonList";
import HackathonDetail from "./components/Hackathon/HackathonDetail";
import EventRegistration from "./components/Participant/EventRegistration";
import ParticipantDashboard from "./components/Participant/ParticipantDashboard";
import OrganizerDashboard from "./components/Organizer/OrganizerDashboard";
import OrganizerEventList from "./components/Organizer/OrganizerEventList";
import ParticipantList from "./components/Organizer/ParticipantList";
import HackathonForm from "./components/Hackathon/HackathonForm";
import HackathonUpdateForm from "./components/Hackathon/HackathonUpdate";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/register"
          element={<Register />}
        />
        <Route
          path="/hackathons"
          element={<HackathonList />}
        />
        <Route
          path="/hackathon/:id"
          element={<HackathonDetail />}
        />
        <Route
          path="/register/:hackathonId"
          element={<EventRegistration />}
        />
        <Route
          path="/participant-dashboard"
          element={<ParticipantDashboard />}
        />
        <Route
          path="/organizer-dashboard"
          element={<OrganizerDashboard />}
        />
        <Route
          path="/organizer-events"
          element={<OrganizerEventList />}
        />
        <Route
          path="/organizer-event-update/:Id"
          element={<HackathonUpdateForm />}
        />
        <Route
          path="/participants/:hackathonId"
          element={<ParticipantList />}
        />
        <Route
          path="/create-hackathon"
          element={<HackathonForm />}
        />
      </Routes>
    </Router>
  );
}

export default App;
