import React from "react";
import "./ProfileCard.css";

const ProfileCard = ({ person }) => {
  return (
    <div className="card">
      <img src={person.image} alt={person.name} className="avatar" />

      <h2 className="name">{person.name}</h2>
      <p className="role">{person.role}</p>

      <p className="description">{person.description}</p>

      <div className="info">
        <span>📍 {person.location}</span>
        <span>📧 {person.email}</span>
      </div>

      <button className="btn">Connect</button>
    </div>
  );
};

export default ProfileCard;
