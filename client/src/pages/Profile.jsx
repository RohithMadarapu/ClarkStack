import React, { useState, useEffect } from 'react';
import './profile.css';
import General from '../components/General';
import Info from '../components/Info';
import ChangePassword from '../components/ChangePassword';
import SocialLinks from '../components/SocialLinks';
import Notifications from '../components/Notifications';
import Logout from '../components/Logout';
import axios from "axios";
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { selectUser } from '../../slices/userSlice'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../slices/userSlice';

function Profile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    const [data, setData] = useState(null);
    const userId = user.userId;
    const [activeComponent, setActiveComponent] = useState('General');
    const handleComponentChange = (componentName) => {
        setActiveComponent(componentName);
    };
    const [profileData, setProfileData] = useState({
        imageUrl: "",
        profileName: "",
        profileEmail: "",
        gradYear: "",
        userCurrentPassword: "",
        userNewPassword: "",
        userNewPasswordRepeat: "",
        userBio: "",
        userBirthday: "",
        userCountry: "",
        userContact: "",
        userWebsiteUrl: "",
        userTwitterUrl: "",
        userFacebookUrl: "",
        userGithubUrl: "",
        userLinkedinUrl: "",
        userInstagramUrl: "",
        userNewsNotify: "",
        userWeeklyNotify: "",
        userPltUpdatesNotify: "",
        accountDelete: false,
    })
    const handleSubmit = async (e) => {
        e.preventDefault();

        const {
            imageUrl,
            profileName,
            profileEmail,
            gradYear,
            userCurrentPassword,
            userNewPassword,
            userNewPasswordRepeat,
            userBio,
            userBirthday,
            userCountry,
            userContact,
            userWebsiteUrl,
            userTwitterUrl,
            userFacebookUrl,
            userGithubUrl,
            userLinkedinUrl,
            userInstagramUrl,
            userNewsNotify,
            userWeeklyNotify,
            userPltUpdatesNotify,
            accountDelete
        } = profileData;

        const requestData = {
            userId,
            imageUrl,
            profileName,
            profileEmail,
            gradYear,
            userCurrentPassword,
            userNewPassword,
            userNewPasswordRepeat,
            userBio,
            userBirthday,
            userCountry,
            userContact,
            userWebsiteUrl,
            userTwitterUrl,
            userFacebookUrl,
            userGithubUrl,
            userLinkedinUrl,
            userInstagramUrl,
            userNewsNotify,
            userWeeklyNotify,
            userPltUpdatesNotify,
            accountDelete
        };

        try {
            let response;

            if (accountDelete) {
                response = await axios.delete("http://localhost:8000/deleteAccount", { data: { userId } });

                if (response.data.error) {
                    toast.error(response.data.error);
                } else {
                    toast.success('Account Deleted Successfully');
                    dispatch(logout());
                    navigate("/login");
                }
            } else {
                response = await axios.post("http://localhost:8000/profile", requestData, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    maxContentLength: 10 * 1024 * 1024,
                    maxBodyLength: 10 * 1024 * 1024,
                });


                if (response.data.error) {
                    toast.error(response.data.error);
                } else {
                    toast.success('profile data updated Successfully');
                }
            }
        } catch (error) {
            console.log(error);
            toast.error('An error occurred');
        }
    };
    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/getProfile/${userId}`);
                if (response.data) {
                    setProfileData(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchProfileData();
    }, [userId])
    return (
        <>
            <form onSubmit={handleSubmit}>
                <h2 className="account-Settings">Account Settings</h2>
                <div className="profile-conatiner">
                    <div className='components-data'>
                        <a className='component' onClick={() => handleComponentChange('General')}>General</a>
                        <a className='component' onClick={() => handleComponentChange('ChangePassword')}>Change Password</a>
                        <a className='component' onClick={() => handleComponentChange('Info')}>Info</a>
                        <a className='component' onClick={() => handleComponentChange('SocialLinks')}>Social Links</a>
                        <a className='component' onClick={() => handleComponentChange('Notifications')}>Notifications</a>
                        <a className='notify-component' onClick={() => handleComponentChange('Logout')}>Delete Account</a>
                    </div>
                    <div className='component-data'>
                        {activeComponent === 'General' && <General profileData={profileData} setProfileData={setProfileData} />}
                        {activeComponent === 'ChangePassword' && <ChangePassword profileData={profileData} setProfileData={setProfileData} />}
                        {activeComponent === 'Info' && <Info profileData={profileData} setProfileData={setProfileData} />}
                        {activeComponent === 'SocialLinks' && <SocialLinks profileData={profileData} setProfileData={setProfileData} />}
                        {activeComponent === 'Notifications' && <Notifications profileData={profileData} setProfileData={setProfileData} />}
                        {activeComponent === 'Logout' && <Logout profileData={profileData} setProfileData={setProfileData} />}
                    </div>
                </div>
                <button type="submit" className='saveChanges-button'>Save Changes</button>
            </form>
        </>
    );
}

export default Profile;


/*

            if (accountDelete) {
                response = await axios.delete("http://localhost:8000/deleteAccount", { data: { userId } });
            } */


