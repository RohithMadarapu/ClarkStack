import React from 'react';
import './Logout.css';

function Logout({ profileData, setProfileData }) {
    return (
        <div className="logout-container">
            <input
                type="checkbox"
                className="notify-input"
                onChange={(e) => setProfileData({ ...profileData, accountDelete: e.target.checked })}
            />
            <h4 className='delete-text'>Do you want to delete the account</h4>
        </div>
    );
}

export default Logout;
