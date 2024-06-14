import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import "./Organizer.css";

const ParticipantList = () => {
  const {hackathonId} = useParams();
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const fetchParticipants = async () => {
      const response = await fetch(
        `http://localhost:5005/api/participants/${hackathonId}`
      );
      const data = await response.json();
      setParticipants(data);
    };

    fetchParticipants();
  }, [hackathonId]);

  return (
    <div className="participant-list">
      <h2>Participants</h2>
      <ul>
        {participants.map((participant) => (
          <li key={participant._id}>
            <h3>{participant.name}</h3>
            <p>{participant.email}</p>
            <p>{participant.phone}</p>
            <p>{participant.experience}</p>
            <p>{participant.skills}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ParticipantList;
