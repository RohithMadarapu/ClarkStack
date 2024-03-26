import React from 'react';
import './ChangePassword.css';

function ChangePassword({ profileData, setProfileData }) {
    return (
        <div className='changepassword-container'>
            <h4>Current Password</h4>
            <input
                className="pass-text"
                value={profileData.userCurrentPassword || ''}
                onChange={(e) => setProfileData({ ...profileData, userCurrentPassword: e.target.value })}
                type="password"
            />
            <h4>New Password</h4>
            <input
                className="pass-text"
                value={profileData.userNewPassword || ''}
                onChange={(e) => setProfileData({ ...profileData, userNewPassword: e.target.value })}
                type="password"
            />
            <h4>Repeat New Password</h4>
            <input
                className="pass-text"
                value={profileData.userNewPasswordRepeat || ''}
                onChange={(e) => setProfileData({ ...profileData, userNewPasswordRepeat: e.target.value })}
                type="password"
            />
        </div>
    );
}

export default ChangePassword;
