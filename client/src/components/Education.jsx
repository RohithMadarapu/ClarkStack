import React, { useState } from 'react';
import './Education.css'
function Education() {

    return (
        <div className='education-content'>
            <h2>Education</h2>
            <form>
                <div className='education-item'>
                    <input className='education-input'
                        type='text'
                        name='degree'
                        placeholder='Degree'

                    />
                </div>
                <div className='education-item'>
                    <input className='education-input'
                        type='text'
                        name='major'
                        placeholder='Major'

                    />
                </div>
                <div className='education-item'>
                    <input className='education-input'
                        type='text'
                        name='institution'
                        placeholder='Institution'

                    />
                </div>
                <div className='education-item'>
                    <input className='education-input'
                        type='text'
                        name='location'
                        placeholder='Location'

                    />
                </div>
                <div className='education-item'>
                    <input className='education-input'
                        type='text'
                        name='graduationDate'
                        placeholder='Graduation Date'

                    />
                </div>
                <div className='education-item'>
                    <input className='education-input'
                        type='text'
                        name='gpa'
                        placeholder='GPA'

                    />
                </div>
                <div>
                    <button type='submit'>Save</button>
                </div>
            </form>
        </div>
    );
}

export default Education;
