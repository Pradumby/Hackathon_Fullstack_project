import React, {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import "./Hackathon.css";

const HackathonDetail = () => {
  const {id} = useParams();
  const [hackathon, setHackathon] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHackathon = async () => {
      const response = await fetch(
        `http://localhost:5005/api/hackathons/${id}`
      );
      const data = await response.json();
      setHackathon(data);
    };

    fetchHackathon();
  }, [id]);

  const handleRegister = () => {
    navigate(`/register/${id}`);
  };

  return (
    <div className="hackathon-detail">
      {hackathon ? (
        <>
          <h2>{hackathon.eventName}</h2>
          <p>{new Date(hackathon.date).toLocaleDateString()}</p>
          <p>{hackathon.description}</p>
          <button
            onClick={handleRegister}
            className="hackathon-button"
          >
            Register
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default HackathonDetail;
