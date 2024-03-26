import React, { useState, useEffect } from 'react';
import './Events.css';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import EventComponent from '../components/EventComponent';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../slices/userSlice';
import NotificationsIcon from '@mui/icons-material/Notifications';
import io from 'socket.io-client';
import NotificationBadge from 'react-notification-badge';
import { Effect } from 'react-notification-badge';
const socket = io.connect("http://localhost:8000");

function Events() {
    const user = useSelector(selectUser);
    const isAdmin = user.userRole === 'admin';
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [isFormVisible, setFormVisible] = useState(false);
    const [eventTypeFilter, setEventTypeFilter] = useState('');
    const [isNotificationVisible, setNotificationVisible] = useState(false);
    const [addedEvents, setAddedEvents] = useState([]);
    const [addedEventCount, setAddedEventCount] = useState(0);

    const [eventTypeOptions] = useState([
        "Academic Events",
        "Cultural Events",
        "Sports Events",
        "Social and Networking Events",
        "Celebrations and Festivals",
        "Technology and Innovation Events",
        "Health and Wellness Events",
        "Educational and Career Development Events",
    ]);
    const handleToggleNotification = () => {
        setAddedEventCount(0);
        setNotificationVisible(!isNotificationVisible);
    };
    const [eventDetails, setEventDetails] = useState({
        title: '',
        description: '',
        date: "",
        time: '',
        duration: '',
        place: '',
        state: '',
        city: '',
        type: '',
        participants: '',
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredEvents, setFilteredEvents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/allEvents');
                const currentDate = new Date();
                const validEvents = response.data.filter((event) => new Date(event.date + 'T' + event.time) > currentDate);

                setEvents(validEvents);
                setFilteredEvents(validEvents);
                validEvents.forEach((event) => {
                    socket.emit("join_room", { eventId: event._id });
                });

            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchData();
    }, []);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/events', eventDetails);
            const createdEvent = response.data;
            socket.emit('new_event', createdEvent);
            setEventDetails({
                title: '',
                description: '',
                date: '',
                time: '',
                duration: '',
                place: '',
                state: '',
                city: '',
                type: '',
                participants: '',
            });

            setFormVisible(false);

            if (response.data.error) {
                toast.error(response.data.error);
            } else {
                toast.success('Event Created Successfully');
                {
                    user.userRole === 'admin' &&
                        navigate("/admindashboard");
                }
            }
        } catch (error) {
            console.error('Error creating event:', error);
        }
    };

    useEffect(() => {
        socket.on('new_event', async (newEvent) => {
            try {
                const updatedEventsResponse = await axios.get('http://localhost:8000/allEvents');
                const currentDate = new Date();
                const validEvents = updatedEventsResponse.data.filter((event) => new Date(event.date + 'T' + event.time) > currentDate);

                setEvents(validEvents);
                setFilteredEvents(validEvents);
                setAddedEvents([...addedEvents, newEvent]);
                setAddedEventCount((count) => count + 1);

            } catch (error) {

            }
        });
        return () => {
            socket.off('new_event');
        };
    }, []);
    const closeForm = () => {
        setFormVisible(false);
    };

    const handleFindEvents = () => {
        const updatedFilteredEvents = events.filter((event) =>
            event.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredEvents(updatedFilteredEvents);
    };

    const handleFilterEvents = () => {
        let updatedFilteredEvents = events;

        // Filter by event type
        if (eventTypeFilter) {
            updatedFilteredEvents = updatedFilteredEvents.filter((event) => event.type === eventTypeFilter);
        }

        // Filter by search term
        const searchedEvents = events.filter((event) =>
            event.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // Combine filtered events with events matching the search term
        if (searchTerm.trim() !== '') {
            updatedFilteredEvents = [...new Set([...updatedFilteredEvents, ...searchedEvents])];
        }

        setFilteredEvents(updatedFilteredEvents);
    };
    const handleAddEventClick = () => {
        if (isAdmin) {
            setFormVisible(true);
        } else {
            toast.error('Only admins can add events');
        }
    };

    return (
        <div>
            <div className="eventsContainer">
                <img src="../public/event.png" className="event-sub" alt="Event" />
            </div>
            <h3 className="event-info">
                Clark University sponsors, supports, and leads many events throughout the year. Most events fall under one of four categories: Festival events, Education, Spiritual Empowerment, and Special Events.
            </h3>
            <div className="events-display">
                <div className="event-nav">
                    <h4 className="dt">Events</h4>
                    <div className='search-bar'>
                        <input type="text" placeholder='Search' className='search-input' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                        <button className='find-button' onClick={handleFindEvents}>Find Events</button>
                    </div>
                    <div className='notifications'>
                        <div className='notification-content'>
                            <NotificationBadge count={addedEventCount} effect={Effect.SCALE} />
                            <NotificationsIcon sx={{ fontSize: 25 }} className='notifications-icon' onClick={handleToggleNotification} />
                            <small>Notifications</small>
                            {isNotificationVisible && (
                                <div className="notification-body">
                                    {addedEvents.length > 0 ? (
                                        addedEvents.map((event) => (
                                            <div key={event._id} className='display-body'>
                                                <div><strong>{event.title}</strong></div>
                                                <div>{event.description}</div>
                                                <div className='display1'>
                                                    <div><strong>Date:</strong> {event.date}</div>
                                                    <div><strong>Time:</strong> {event.time}</div>
                                                </div>
                                                <div className='display1'>
                                                    <div><strong>Place:</strong> {event.place}</div>
                                                    <div><strong>Participants:</strong> {event.participants}</div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div style={{ padding: 20 }}>
                                            <h3>No Events Added Recently...</h3>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        <button className="add-event" onClick={handleAddEventClick}>
                            Add Event
                        </button>
                    </div>
                </div>
            </div>
            <div className='filter'>
                <h4>Filter Events By Type</h4>
                <div className="filter-dropdown">
                    <select onChange={(e) => setEventTypeFilter(e.target.value)}>
                        <option value="">All Events</option>
                        {eventTypeOptions.map((eventType) => (
                            <option key={eventType} value={eventType}>
                                {eventType}
                            </option>
                        ))}
                    </select>
                </div>
                <button className='filter-button' onClick={handleFilterEvents}>
                    Filter
                </button>
            </div>
            <div className='list-events'>
                {filteredEvents.length === 0 && (
                    <h4 className="dt-m">
                        <span className="no-events-message">No matching events found.</span>
                    </h4>
                )}
            </div>
            <div className={filteredEvents.length > 0 ? 'events-bg-color event-body' : 'event-body'}>
                {filteredEvents.map((event) => (
                    <div key={event._id} className='inner-list'>
                        <EventComponent event={event} event_id={event._id} />
                    </div>
                ))}
            </div>
            {/* Popup Form */}
            {
                isAdmin && isFormVisible && (
                    <div className="popup-form-container">
                        <div className="popup-form">
                            <div className='add-cont'>
                                <h4>Add Event</h4>
                                <div className='closeIconContainer'>
                                    <CloseRoundedIcon
                                        className='closeIcon'
                                        style={{
                                            color: 'red',
                                            fontWeight: 'bold',
                                            fontSize: '24px',
                                            cursor: 'pointer',
                                        }}
                                        onClick={closeForm}
                                    />
                                </div>
                            </div>
                            <form onSubmit={handleFormSubmit}>
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Event Title"
                                    value={eventDetails.title}
                                    onChange={(e) => setEventDetails({ ...eventDetails, title: e.target.value })}
                                    required />
                                <textarea rows="8" placeholder="Event Description" value={eventDetails.description} onChange={(e) => setEventDetails({ ...eventDetails, description: e.target.value })} type="text" required />
                                <input type='date' placeholder='Event Date' value={eventDetails.date} onChange={(e) => setEventDetails({ ...eventDetails, date: e.target.value })} required />
                                <input type='time' placeholder='Event Starting Time' onFocus={(e) => e.target.type = "time"}
                                    onBlur={(e) => e.target.type = "text"} value={eventDetails.time} onChange={(e) => setEventDetails({ ...eventDetails, time: e.target.value })} required />
                                <input type='text' placeholder='Event Duration' value={eventDetails.duration} onChange={(e) => setEventDetails({ ...eventDetails, duration: e.target.value })} required />
                                <input type='text' placeholder='Event Place' value={eventDetails.place} onChange={(e) => setEventDetails({ ...eventDetails, place: e.target.value })} required />
                                <input type='text' placeholder='Event State' value={eventDetails.state} onChange={(e) => setEventDetails({ ...eventDetails, state: e.target.value })} required />
                                <input type='text' placeholder='Event City' value={eventDetails.city} onChange={(e) => setEventDetails({ ...eventDetails, city: e.target.value })} required />
                                <select
                                    onChange={(e) => setEventDetails({ ...eventDetails, type: e.target.value })}
                                    value={eventDetails.type}
                                    className='input-dropdown'
                                >
                                    <option value="" disabled>
                                        Select Event Type
                                    </option>
                                    {eventTypeOptions.map((eventType) => (
                                        <option key={eventType} value={eventType}>
                                            {eventType}
                                        </option>
                                    ))}
                                </select>
                                <input type='text' placeholder='No. of Participants allowed' value={eventDetails.participants} onChange={(e) => setEventDetails({ ...eventDetails, participants: e.target.value })} required />
                                <button type="submit">Add Event</button>
                            </form>
                        </div>
                    </div>
                )
            }
            <div className="footer">
                <p>&copy; 2023 Clark Stack</p>
            </div>
        </div >
    );
}

export default Events;

/*  const updatedEventsResponse = await axios.get('http://localhost:8000/allEvents');
            const currentDate = new Date();
            const validEvents = updatedEventsResponse.data.filter((event) => new Date(event.date + 'T' + event.time) > currentDate);

            setEvents(validEvents);
            setFilteredEvents(validEvents); */