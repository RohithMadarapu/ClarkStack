import React from 'react'
import './Info.css'

function Info({ profileData, setProfileData }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        let month = (date.getMonth() + 1).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    return (
        <div className='info-container'>
            <h4>Bio</h4>
            <textarea rows="8" className='bio-text' value={profileData.userBio} onChange={(e) => setProfileData({ ...profileData, userBio: e.target.value })} type="text" />
            <h4>Birthday</h4>
            <input className="info-text" value={formatDate(profileData.userBirthday)} onChange={(e) => setProfileData({ ...profileData, userBirthday: e.target.value })} type="date" />
            <h4>Country</h4>
            <input className="info-text" value={profileData.userCountry} onChange={(e) => setProfileData({ ...profileData, userCountry: e.target.value })} type="text" />
            <div className='line'>
            </div>
            <h4 className='contacts'>Contacts</h4>
            <h4>Phone</h4>
            <input className="info-text" value={profileData.userContact} onChange={(e) => setProfileData({ ...profileData, userContact: e.target.value })} type="number" />
            <h4>Website</h4>
            <input className="info-text" value={profileData.userWebsiteUrl} onChange={(e) => setProfileData({ ...profileData, userWebsiteUrl: e.target.value })} type="url" />
        </div>
    )
}

export default Info
