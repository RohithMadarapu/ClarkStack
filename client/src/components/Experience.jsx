import React from 'react';
import './Experience.css'

function ExperienceForm() {

    return (
        <div className="experience">
            <h2>Experience</h2>
            <form >
                <div>
                    <label>Job Title:</label>
                    <input className='experience-input' type="text" name="jobTitle" />
                </div>
                <div>
                    <label>Company Name:</label>
                    <input className='experience-input' type="text" name="companyName" />
                </div>
                <div>
                    <label>Employment Period (Start Date):</label>
                    <input className='experience-input' type="date" name="employmentPeriodStart" />
                </div>
                <div>
                    <label>Employment Period (End Date):</label>
                    <input className='experience-input' type="date" name="employmentPeriodEnd" />
                </div>
                <div>
                    <label>Job Description:</label>
                    <textarea className='experience-input' name="jobDescription" />
                </div>
                <div>
                    <label>Key Achievements:</label>
                    <textarea className='experience-input' name="keyAchievements" />
                </div>
                <div>
                    <label>Skills Used:</label>
                    <input className='experience-input' type="text" name="skillsUsed" />
                </div>
                <div>
                    <label>References:</label>
                    <input className='experience-input' type="text" name="references" />
                </div>
                <div>
                    <label>Location:</label>
                    <input className='experience-input' type="text" name="location" />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default ExperienceForm;
