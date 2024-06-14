import React, {useEffect, useState, useContext} from "react";
import {Link} from "react-router-dom";
import "./Participant.css";
import {useNavigate} from "react-router-dom";

const ParticipantDashboard = () => {
  const navigate = useNavigate();
  const [hackathons, setHackathons] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    // if (!auth || !auth.token) {
    //   navigate("/login");
    //   return;
    // }
    const fetchHackathons = async () => {
      const response = await fetch("http://localhost:5005/api/hackathons", {
        headers: {
          token: token,
        },
      });
      const data = await response.json();
      setHackathons(data);
    };

    fetchHackathons();
  }, [token]);

  return (
    <div className="participant-dashboard">
      <h2>Your Hackathons..</h2>
      <ul>
        {hackathons.map((hackathon) => (
          <li key={hackathon._id}>
            <h3>{hackathon.eventName}</h3>
            <p>{new Date(hackathon.date).toLocaleDateString()}</p>
            <p>{hackathon.description}</p>
            <Link
              to={`/register/${hackathon._id}`}
              className="register-button"
            >
              Register For this hackathon
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ParticipantDashboard;
