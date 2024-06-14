import React from "react";
import {Link} from "react-router-dom";
import "./Organizer.css";

const OrganizerDashboard = () => {
  return (
    <div className="organizer-dashboard">
      <h2>Organizer Dashboard</h2>
      <div className="organizer-actions">
        <Link
          to="/create-hackathon"
          className="organizer-action-link"
        >
          Create New Hackathon
        </Link>
        <Link
          to="/organizer-events"
          className="organizer-action-link"
        >
          View Your Hackathons
        </Link>
      </div>
    </div>
  );
};

export default OrganizerDashboard;
