import React from 'react';
import './Header.css'; // Import the corresponding CSS file
// Replace 'avatar.jpg' with your image file name or URL
import avatarImage from './avatar.jpg'; 

<div className="profile-card">
  {/* The Teal Banner */}
  <div className="profile-banner" onClick={() => showToast('Banner customization coming soon!', 'info')}>
  </div>

  <div className="profile-body">
    {/* The Avatar sitting on the edge of the banner */}
    <div className="profile-avatar">
      <img 
        src="/TEAM MOMENT/image.png" 
        alt="Stanley" 
        className="avatar-img" 
      />
    </div>

    <div className="profile-info-row">
      <div className="profile-info">
        <h2 id="profile-greeting">Hello Stanley,</h2>
        <p className="profile-sub">A creative Designer/Web Developer</p>
        <p className="profile-loc">Los Angells, California</p>
      </div>
    </div>
    
    {/* Rest of your skills tags... */}
  </div>
</div>