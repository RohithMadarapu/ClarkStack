import React from 'react'
import './SocialLinks.css'

function SocialLinks({ profileData, setProfileData }) {
    return (
        <div className='sociallinks-container'>
            <h4>Twitter</h4>
            <input className='links-text' value={profileData.userTwitterUrl} onChange={(e) => setProfileData({ ...profileData, userTwitterUrl: e.target.value })} type="url" placeholder='https://twitter.com/user' />
            <h4>Facebook</h4>
            <input className='links-text' value={profileData.userFacebookUrl} onChange={(e) => setProfileData({ ...profileData, userFacebookUrl: e.target.value })} type="url" placeholder='https://www.facebook.com/user' />
            <h4>GitHub</h4>
            <input className='links-text' value={profileData.userGithubUrl} onChange={(e) => setProfileData({ ...profileData, userGithubUrl: e.target.value })} type="url" placeholder='https://www.github.com/user' />
            <h4>LinkedIn</h4>
            <input className='links-text' value={profileData.userLinkedinUrl} onChange={(e) => setProfileData({ ...profileData, userLinkedinUrl: e.target.value })} type="url" placeholder='https://www.linkedin.com/user' />
            <h4>Instagram</h4>
            <input className='links-text' value={profileData.userInstagramUrl} onChange={(e) => setProfileData({ ...profileData, userInstagramUrl: e.target.value })} type="url" placeholder='https://www.instagram.com/user' />
        </div>
    )
}

export default SocialLinks
