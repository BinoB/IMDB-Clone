// PersonDetails.js
import React from "react";
import "./PersonDetails.css"; // Import your custom styles or modify Bootstrap classes directly

const PersonDetails = ({ person }) => (
  <div key={person.id} className="card personDetails">
    {person.profile_path ? (
      <img
        className="card-img-top personDetails__image"
        src={`https://image.tmdb.org/t/p/original${person.profile_path}`}
        alt={`${person.name} Profile`}
      />
    ) : (
      <img
        className="card-img-top personDetails__image"
        src="https://www.svgrepo.com/show/452030/avatar-default.svg"  // Specify the path to your default avatar image
        alt={`${person.name} Profile`}
      />
    )}
    <div className="card-body personDetails__info">
      <h5 className="card-title">{person.name}</h5>
      <p className="card-text">Gender: {person.gender === 2 ? 'Male' : 'Female'}</p>
      {person.character && <p className="card-text">Character: {person.character}</p>}
      {person.birthday && <p className="card-text">DOB: {person.birthday}</p>}
      <p className="card-text">Bio: {person.biography}</p>
    </div>
  </div>
);

export default PersonDetails;
