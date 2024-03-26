import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom'

function Home() {
    return (
        <div className='home-container'>
            <div className="header">
                <div className="header-content">
                    <h1>Welcome to the Exciting World of University Events</h1>
                    <p>Explore a vibrant calendar of events that make our university a dynamic and engaging community.</p>
                    <div className="event-highlights">
                        <p>From academic conferences to cultural celebrations, our events cater to diverse interests.</p>
                        <p>Join us in fostering a sense of community and collaboration through these enriching experiences.</p>
                    </div>
                    <Link to="/Events" className="cta-button">Discover Upcoming Events</Link>
                </div>
            </div>
            <div className="contact-section">
                <h2 className='c-h2'>Contact Us</h2>
                <p className='c-p'>If you have any questions or suggestions, feel free to reach out to us:</p>
                <p className='c-p'>Email: clarkStack@collegeevents.com</p>
                <p className='c-p'>Phone: (508) 410-0689</p>
            </div>

            <div className="footer">
                <p>&copy; 2023 College Events</p>

            </div>
        </div>

    )
}

export default Home
