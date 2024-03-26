import React from 'react';
import "./Notifications.css";

function Notifications({ profileData, setProfileData }) {
    return (
        <div className='notifications-container'>
            <h3 className='notify-header'>Application</h3>
            <div className='first-box'>
                <input
                    type="checkbox"
                    checked={profileData.userNewsNotify}
                    onChange={(e) => setProfileData({ ...profileData, userNewsNotify: e.target.checked })}
                    className="notify-input"
                />
                <h4>News and Announcements</h4>
            </div>
            <div className='first-box'>
                <input
                    type="checkbox"
                    checked={profileData.userWeeklyNotify}
                    onChange={(e) => setProfileData({ ...profileData, userWeeklyNotify: e.target.checked })}
                    className="notify-input"
                />
                <h4>Weekly Updates</h4>
            </div>
            <div className='first-box'>
                <input
                    type="checkbox"
                    checked={profileData.userPltUpdatesNotify}
                    onChange={(e) => setProfileData({ ...profileData, userPltUpdatesNotify: e.target.checked })}
                    className="notify-input"
                />
                <h4>Receive Occasional Emails with Advice and Platform Updates</h4>
            </div>
        </div>
    );
}

export default Notifications;
