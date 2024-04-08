import React from 'react';
import './Admindashboard.css';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import UpcomingIcon from '@mui/icons-material/Upcoming';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AddIcon from '@mui/icons-material/Add';
import InventoryIcon from '@mui/icons-material/Inventory';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import EventIcon from '@mui/icons-material/Event';
import GroupsIcon from '@mui/icons-material/Groups';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../slices/userSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import { useSelector } from 'react-redux';
import { selectUser } from '../../slices/userSlice';


function Admindashboard() {
    const user = useSelector(selectUser);
    const [users, setUsers] = useState([]);
    const [register, setRegister] = useState([]);
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [totalEvents, setTotalEvents] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalRegisters, setTotalRegisters] = useState(0);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [participants, setParticipants] = useState([]);
    const [showParticipants, setShowParticipants] = useState(false);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [showUpcoming, setShowUpcoming] = useState(false);
    const [showPast, setShowPast] = useState(false);
    const [activeTab, setActiveTab] = useState('');
    const [showAll, setShowAll] = useState(false);
    const [showAllPartcipants, setShowAllParticipants] = useState(false);
    const eventInventory = [
        { id: 1, name: 'Projector', quantity: 5, status: 'Available' },
        { id: 2, name: 'Tables', quantity: 20, status: 'Available' },
        { id: 3, name: 'Chairs', quantity: 50, status: 'Available' },
        { id: 4, name: 'Microphones', quantity: 10, status: 'In Use' },
        { id: 5, name: 'Laptops', quantity: 15, status: 'Available' },
        { id: 6, name: 'Projector', quantity: 5, status: 'Available' },
        { id: 7, name: 'Tables', quantity: 20, status: 'Available' },
        { id: 8, name: 'Chairs', quantity: 50, status: 'Available' },
        { id: 9, name: 'Microphones', quantity: 10, status: 'In Use' },
        { id: 10, name: 'Laptops', quantity: 15, status: 'Available' },
        { id: 11, name: 'Microphones', quantity: 10, status: 'In Use' },
        { id: 12, name: 'Laptops', quantity: 15, status: 'Available' },
    ];
    const handleSeeAllClick = () => {
        setShowAll(!showAll);
    };
    const handleSeeAllClickForParticipants = () => {
        setShowAllParticipants(!showAllPartcipants);
    };
    const handleEventClick = async (event) => {
        if (selectedEvent && selectedEvent._id === event._id) {
            setSelectedEvent(null);
            setShowParticipants(false);
            setParticipants([]);
        } else {
            setSelectedEvent(event);
            setShowParticipants(true);
            try {
                const response = await axios.get(`/participants/${event._id}`);
                setParticipants(response.data);
            } catch (error) {
                console.error('Error fetching participants:', error);
            }
        }
    };
    const handleDropdownToggle = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        dispatch(logout());
        setDropdownOpen(false);
        navigate('/login');
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/allEvents');
                setEvents(response.data);
                setFilteredEvents(response.data);
                setTotalEvents(response.data.length);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchData();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('/allUsers');
            setUsers(response.data);
            setTotalUsers(response.data.length);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleUpcomingEventsClick = () => {
        const currentTime = new Date();
        const upcoming = events.filter((event) => new Date(event.date) > currentTime && new Date(event.date) <= new Date(currentTime.getTime() + 24 * 60 * 60 * 1000));
        setFilteredEvents(upcoming);
        setShowUpcoming(true);
        setShowPast(false);
        setActiveTab('');
    };

    const handlePastEventsClick = () => {
        const currentTime = new Date();
        const past = events.filter((event) => new Date(event.date) < currentTime);
        setFilteredEvents(past);
        setShowUpcoming(false);
        setShowPast(true);
        setActiveTab('');
    };

    const handleAllEventsClick = () => {
        setFilteredEvents(events);
        setShowUpcoming(false);
        setShowPast(false);
        setActiveTab('');
    };
    const handleDelete = async (userId) => {
        try {
            await axios.delete("/deleteAccount", { data: { userId } });
            await fetchUsers();
        } catch (error) {
            console.log("Error Deleting the user account", error);
        }
    };
    useEffect(() => {
        const fetchRegister = async () => {
            try {
                const response = await axios.get('/allRegistrations');
                setRegister(response.data);
                setTotalRegisters(response.data.length);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchRegister();
    }, []);
    const isEventExpired = (endDate) => {
        const eventEndDate = new Date(endDate);
        const currentDate = new Date();
        const res = currentDate > eventEndDate;
        return res;
    };
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    }
    const handleNavigate = () => {
        navigate('/Events');
    };
    return (
        <>
            <input type="checkbox" id="nav-toggle" />
            <div className="sidebar">
                <div className="sidebar-brand">
                    <h2><span className="lab la-accusoft"></span><span>Clark Stack</span></h2>
                </div>
                <div className="sidebar-menu">
                    <ul>
                        <li>
                            <a href="#" className="active">
                                <span className='icon-a'><SpaceDashboardIcon /></span>
                                <span>Dashboard</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span onClick={handleUpcomingEventsClick}><UpcomingIcon /></span>
                                <span onClick={handleUpcomingEventsClick}>Upcoming Events</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span onClick={handleAllEventsClick}><UpcomingIcon /></span>
                                <span onClick={handleAllEventsClick}>All Events</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span onClick={handlePastEventsClick}><AssignmentTurnedInIcon /></span>
                                <span onClick={handlePastEventsClick}>Past Events</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span onClick={handleNavigate}><AddIcon /></span>
                                <span onClick={handleNavigate}>Create New Event</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span onClick={() => handleTabClick('inventory')}><InventoryIcon /></span>
                                <span onClick={() => handleTabClick('inventory')}>Inventory</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span onClick={() => handleTabClick('accounts')}><PeopleAltIcon /></span>
                                <span onClick={() => handleTabClick('accounts')}>Accounts</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="main-content">
                <header className='header-admin'>
                    <h2 className="dashboard-heading">
                        <label htmlFor="nav-toggle">
                            <span className='space-d'><SpaceDashboardIcon /></span>
                        </label>
                        Dashboard
                    </h2>
                    <div className="search-wrapper">
                        <span><SearchIcon sx={{ fontSize: 20 }} /></span>
                        <input type="search" placeholder="Search here" />
                    </div>
                    <div className="user-wrapper">
                        <AccountCircleOutlinedIcon sx={{ fontSize: 40 }} style={{ cursor: 'pointer' }} onClick={handleDropdownToggle} />
                        {isDropdownOpen && (
                            <div className="dropdown-admin">
                                <p onClick={handleLogout}>Logout</p>
                            </div>
                        )}
                        <div>
                            <h4>{user.userName}</h4>
                            <small>Super Admin</small>
                        </div>
                    </div>
                </header>
                <main>
                    <div className="cards">
                        <div className="card-single">
                            <div>
                                <h1>{totalUsers}</h1>
                                <span>Students</span>
                            </div>
                            <div>
                                <span><GroupsIcon sx={{ fontSize: 48 }} /></span>
                            </div>
                        </div>
                        <div className="card-single">
                            <div>
                                <h1>{totalEvents}</h1>
                                <span>Events</span>
                            </div>
                            <div>
                                <span><EventIcon sx={{ fontSize: 48 }} /></span>
                            </div>
                        </div>
                        <div className="card-single">
                            <div>
                                <h1>{totalRegisters}</h1>
                                <span>Registrations</span>
                            </div>
                            <div>
                                <span><HowToRegIcon sx={{ fontSize: 48 }} /></span>
                            </div>
                        </div>
                        <div className="card-single">
                            <div>
                                <h1>0</h1>
                                <span>Income</span>
                            </div>
                            <div>
                                <span><MonetizationOnIcon sx={{ fontSize: 48 }} /></span>
                            </div>
                        </div>
                    </div>
                    <div className="recent-grid">
                        <div className="Events">
                            <div className="card">
                                <div className="card-header">
                                    <h3>
                                        {activeTab === 'create' && 'Create New Event'}
                                        {activeTab === 'inventory' && 'Inventory'}
                                        {activeTab === 'accounts' && 'Accounts'}
                                        {(!activeTab && showUpcoming) && 'Upcoming Events'}
                                        {(!activeTab && showPast) && 'Past Events'}
                                        {(!activeTab && !showUpcoming && !showPast) && 'All Events'}
                                    </h3>
                                    <button style={{ cursor: 'pointer' }} onClick={handleSeeAllClick}>{showAll ? 'Hide' : 'See all'}<span ></span></button>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table width="100%">
                                            <thead>
                                                {
                                                    activeTab ? '' : (
                                                        <tr>
                                                            <td>Event Title</td>
                                                            <td>Event Type</td>
                                                            <td>Status</td>
                                                        </tr>
                                                    )
                                                }
                                            </thead>
                                            <tbody>
                                                {activeTab === 'accounts' ? (
                                                    users.map((user, index) => (
                                                        <tr key={user._id} className="account-information">
                                                            <div className='user-info'>
                                                                <td><AccountCircleTwoToneIcon sx={{ fontSize: 20 }} /></td>
                                                                <td>{user.name}</td>
                                                            </div>
                                                            <td>{user.email}</td>
                                                            <td><DeleteIcon sx={{ fontSize: 20 }} onClick={() => handleDelete(user._id)} /></td>
                                                        </tr>
                                                    )).slice(0, showAll ? users.length : 10)
                                                ) : activeTab === 'inventory' ? (
                                                    eventInventory.map((inventory, index) => (

                                                        (showAll || index < 10) && (
                                                            <tr key={inventory.id}>
                                                                <td>{inventory.name}</td>
                                                                <td>{inventory.status}</td>
                                                                <td>{inventory.quantity}</td>
                                                            </tr>
                                                        )

                                                    ))
                                                ) : activeTab === 'create' ?
                                                    (<p>Create Event Information</p>) : (
                                                        filteredEvents.map((event) => (
                                                            <React.Fragment key={event._id}>
                                                                <tr onClick={() => handleEventClick(event)}>
                                                                    <td>{event.title}</td>
                                                                    <td>{event.type}</td>
                                                                    <td>
                                                                        <span className={`status ${isEventExpired(event.date) ? 'red' : 'green'}`}></span>
                                                                        {isEventExpired(event.date) ? 'Completed' : 'Active'}
                                                                    </td>
                                                                </tr>
                                                                {selectedEvent && selectedEvent._id === event._id && (
                                                                    <td colSpan="3">
                                                                        <div className='in-data'>
                                                                            <h3>{selectedEvent.title}</h3>
                                                                            <p>Event Type: {selectedEvent.type}</p>
                                                                            <p>Description: {selectedEvent.description}</p>
                                                                            <p>Place: {selectedEvent.place}</p>
                                                                            <p>Time: {selectedEvent.time}</p>
                                                                            <p>Duration: {selectedEvent.duration}</p>
                                                                            <p>Date: {selectedEvent.date}</p>
                                                                        </div>
                                                                    </td>

                                                                )}
                                                            </React.Fragment>
                                                        ))
                                                    )}

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="customers">
                            <div className="card">
                                <div className="card-header">
                                    <h3>Participants</h3>
                                    <button style={{ cursor: 'pointer' }} onClick={handleSeeAllClickForParticipants}>{showAllPartcipants ? 'Hide' : 'See all'}<span ></span></button>
                                </div>
                                <div className="card-body">
                                    <div className="customer">
                                        {participants.map((participant, index) => (
                                            <div className="info" key={participant.id}>
                                                <h4>{participant.email}</h4>
                                                <p>{participant.name}</p>
                                            </div>
                                        )).slice(0, showAllPartcipants ? participants.length : 10)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

export default Admindashboard;
