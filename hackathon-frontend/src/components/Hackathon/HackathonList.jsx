import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import "./Hackathon.css";

const HackathonList = () => {
  const [hackathons, setHackathons] = useState([]);
  useEffect(() => {
    const fetchHackathons = async () => {
      const response = await fetch("http://localhost:5005/api/hackathons");
      const data = await response.json();
      setHackathons(data);
    };

    fetchHackathons();
  }, [setHackathons]);

  return (
    <div className="hackathon-list">
      <h2>Hackathons</h2>
      <ul>
        {hackathons.map((hackathon) => (
          <li key={hackathon._id}>
            <Link to={`/hackathon/${hackathon._id}`}>
              <h3>{hackathon.eventName}</h3>
              <p>{new Date(hackathon.date).toLocaleDateString()}</p>
              <p>{hackathon.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HackathonList;
