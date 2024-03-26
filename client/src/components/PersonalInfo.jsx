import React from 'react';
import './PersonalInfo.css';

function PersonalInfo() {
    return (
        <div className='personal-info-content'>
            <div className='personal-info-left'>
                <div>
                    <label className='personalInfoLabel'>Name</label>
                    <input className='in' type='text' placeholder='Username' />
                </div>
                <div>
                    <label className='personalInfoLabel'>Email</label>
                    <input className='in' type='text' placeholder='Email' />
                </div>
                <div>
                    <label className='personalInfoLabel'>Contact</label>
                    <input className='in' type='text' placeholder='Contact' />
                </div>
                <div>
                    <label className='personalInfoLabel'>Address</label>
                    <input className='in' type='text' placeholder='Street Address' />
                </div>
                <div>
                    <label className='personalInfoLabel'>City</label>
                    <input className='in' type='text' placeholder='City' />
                </div>
                <div>
                    <label className='personalInfoLabel'>State</label>
                    <input className='in' type='text' placeholder='State' />
                </div>
                <div>
                    <label className='personalInfoLabel'>Postal Code</label>
                    <input className='in' type='text' placeholder='Postal Code' />
                </div>
                <div>
                    <label className='personalInfoLabel'>Country</label>
                    <input className='in' type='text' placeholder='Country' />
                </div>
            </div>
            <div className='personal-info-right'>
                <div>
                    <label className='personalInfoLabel'>About</label>
                    <textarea id='about' name='about' rows='6' cols='50'></textarea>
                </div>
                <div>
                    <button type='submit'>Save</button>
                </div>
            </div>
        </div>
    );
}

export default PersonalInfo;
