import React from 'react';

const ProfileCard = ({ profile, onClick, status }) => {
  let statusClass = '';
  if (status === 'correct') statusClass = 'correct';
  if (status === 'incorrect') statusClass = 'incorrect';

  return (
    <button 
      className={`glass profile-card ${statusClass}`}
      onClick={() => onClick(profile)}
      disabled={!!status}
    >
      <div className="profile-emoji">{profile.emoji}</div>
      <div className="profile-name">{profile.name}</div>
      <div className="profile-category">{profile.category}</div>
    </button>
  );
};

export default ProfileCard;
