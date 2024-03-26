import React, { useState } from 'react';
import './General.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useSelector } from 'react-redux';
import { selectUser } from '../../slices/userSlice';


function General({ profileData, setProfileData }) {
    const user = useSelector(selectUser);
    const [profileImage, setProfileImage] = useState(null);
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        let month = (date.getMonth() + 1).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    const handleUploadPhoto = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                setProfileImage(e.target.result);
                setProfileData((prevData) => ({ ...prevData, imageUrl: e.target.result }));
            };

            reader.readAsDataURL(file);
        }
    };
    return (
        <div className='general-container'>
            <div className='profile'>
                {profileData.imageUrl ? (
                    <img src={profileData.imageUrl} alt="User Profile" className='profile-image' />
                ) : (
                    <AccountCircleIcon sx={{ fontSize: 120, color: 'gray' }} className='mui' />
                )}
                <div className='buttons-container'>
                    <div>
                        <label htmlFor="fileInput" className='picture-button'>Upload new photo</label>
                        <input
                            type="file"
                            id="fileInput"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleUploadPhoto}
                        />
                    </div>
                    <h5>Allowed JPG, GIF, or PNG. Max size of 800K</h5>
                </div>
            </div>
            <div className='user-data'>
                <h4>{user.userName}</h4>
                <div className='name-container'>
                    <div>
                        <h4>Name</h4>
                    </div>
                    <input className="profile-text" value={profileData.profileName} onChange={(e) => setProfileData({ ...profileData, profileName: e.target.value })} type="text" />
                    <div>
                        <h4>User Email</h4>
                    </div>
                    <input className="profile-text" value={profileData.profileEmail} onChange={(e) => setProfileData({ ...profileData, profileEmail: e.target.value })} type="email" />
                    <div>
                        <h4>Grad Year</h4>
                    </div>
                    <input className="profile-text" value={formatDate(profileData.gradYear)} onChange={(e) => setProfileData({ ...profileData, gradYear: e.target.value })} type="date" />
                </div>
            </div>
        </div>
    );
}

export default General;
