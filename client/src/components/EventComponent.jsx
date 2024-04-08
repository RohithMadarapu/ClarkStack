import React, { useEffect } from 'react'
import './EventComponent.css'
import AlarmOnSharpIcon from '@mui/icons-material/AlarmOnSharp';
import TimelapseSharpIcon from '@mui/icons-material/TimelapseSharp';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useState } from 'react';
import { Avatar } from '@mui/material'
import { useSelector } from 'react-redux';
import { selectUser } from '../../slices/userSlice';
import io from "socket.io-client";
import axios from 'axios';
import toast from 'react-hot-toast';
import academic from '../../public/academic-events.jpg';
import carrerDevelopement from '../../public/carrerDevelopement-events.jpg';
import cultural from '../../public/cultural-events.jpg';
import festival from '../../public/festival-events.jpg';
import health from '../../public/health-events.jpg';
import innovation from '../../public/innovation-events.jpg';
import social from '../../public/social-events.jpg';
import sports from '../../public/sports-events.jpg';
const backendURL=import.meta.env.VITE_backend_url;
const socket = io.connect(backendURL);
import NotificationBadge from 'react-notification-badge';
import { Effect } from 'react-notification-badge';
import Badge from '@mui/material/Badge';

function ChatBox({ onClose, event, id, register }) {
    const user = useSelector(selectUser);
    const [message, setMessage] = useState([]);
    const [messageList, setMessageList] = useState([]);
    const [data, setData] = useState(
        {
            content: "",
            eventId: id,
            userId: user.userId
        }
    )
    const [usernames, setUsernames] = useState({});
    useEffect(() => {
        const fetchChatData = async () => {
            try {
                const chatResponse = await axios.get(`/chats/${id}`);

                setMessage(chatResponse.data);

                const senderIds = new Set(chatResponse.data.map(message => message.senderId));
                const usernamesResponse = await axios.post('/userName', { senderIds: [...senderIds] });
                setUsernames(usernamesResponse.data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchChatData();
    }, [id]);
    const chatData = async (e) => {
        e.preventDefault();
        if (!register) {
            toast.error('You are not registered for this event. Cannot send messages.');
            return;
        }
        try {
            const response = await axios.post('/updateChats', data);
            setData({ ...data, content: "" });
            if (response.data.error) {
                toast.error(response.data.error);
            } else {
                //setMessage(response.data.chat.messages);
                socket.emit("send_message", {
                    senderId: user.userId,
                    eventId: id,
                    content: response.data.chat.messages[response.data.chat.messages.length - 1].content,
                    timestamp: new Date().toUTCString(),
                });
            }
        } catch (error) {
            console.error('Error sending message:', error.response);

            if (error.response && error.response.data) {
                console.error('Response data:', error.response.data);
            }
        }
    };

    useEffect(() => {
        const handleReceiveMessage = async (data) => {
            setMessage((list) => [...list, { senderId: data.senderId, content: data.content, timestamp: data.timestamp }]);
            console.log(`Received message from ${data.senderId}: ${data.content}`);
            const newUsernameResponse = await axios.post('/userName', { senderIds: [data.senderId] });
            setUsernames((prevUsernames) => ({ ...prevUsernames, ...newUsernameResponse.data }));
        };

        // Subscribe to the "receive_message" event for the specific room (event ID)
        socket.on(`receive_message_${id}`, handleReceiveMessage);

        return () => {
            // Cleanup: Unsubscribe from the event when the component is unmounted
            socket.off(`receive_message_${id}`, handleReceiveMessage);
        };
    }, [socket, id]);

    return (
        <div className="chat-box">
            <div className='chat__header'>
                <div className='chat__headerInfo'>
                    <Avatar className='icon' />
                    <h3>{user.userName}</h3>
                </div>
                <div>
                    {event.title}
                </div>
                <div className="chat__headerRight">
                    <CloseRoundedIcon className='closeIcon' style={{
                        color: 'red', fontWeight: 'bold', fontSize: '24px',
                        cursor: 'pointer',
                    }} onClick={onClose} />
                </div>
            </div>
            <div className='chat__body'>
                {message.map(message2 => (
                    <p key={message2._id} className={`chat__message ${message2.senderId === user.userId && 'chat__receiver'}`}>
                        <span className='chat__name'>
                            {usernames[message2.senderId] || 'Unknown User'}</span>
                        {message2.content}
                        <span className='chat__time'>
                            {message2.timestamp && new Date(message2.timestamp).toUTCString()}
                        </span>
                    </p>
                ))}
            </div>
            <div className='chat__footer'>
                <form onSubmit={chatData}>
                    <input type="text" placeholder='Type a message' value={data.content} onChange={(e) => setData({ ...data, content: e.target.value })} />
                    <button type="submit">Send a message</button>
                </form>
            </div>
        </div>
    );
}

function EventComponent({ event, event_id }) {
    const user = useSelector(selectUser);
    const [count, setCount] = useState(event.participants);
    const [isChatBoxOpen, setChatBoxOpen] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [notificationsCount, setNotificationsCount] = useState(0);

    useEffect(() => {
        const checkRegistration = async () => {
            try {
                const response = await axios.post('/checkRegister', {
                    eventId: event_id,
                    userId: user.userId,
                });
                if (response.data.isRegistered) {
                    setIsRegistered(true);
                } else {
                    setIsRegistered(false);
                }
            } catch (error) {
                console.error('Error checking registration status:', error);
            }
        }
        checkRegistration();
    }, [])

    useEffect(() => {
        const handleReceive = async () => {
            console.log('New chat message received!');
            setNotificationsCount((prevCount) => prevCount + 1);
        };

        if (!isChatBoxOpen && isRegistered) {
            socket.on(`receive_message_${event_id}`, handleReceive);
        }

        return () => {
            socket.off(`receive_message_${event_id}`, handleReceive);
        };
    }, [isChatBoxOpen, isRegistered, event_id]);

    const getImageUrl = () => {
        switch (event.type) {
            case 'Academic Events':
                return academic;
            case 'Cultural Events':
                return cultural;
            case 'Sports Events':
                return sports;
            case 'Social and Networking Events':
                return social;
            case 'Technology and Innovation Events':
                return innovation;
            case 'Health and Wellness Events':
                return health;
            case 'Educational and Career Development Events':
                return carrerDevelopement;
            default:
                return festival;
        }
    };


    const handleChatIconClick = (id) => {
        socket.emit("join_room", { eventId: id });
        setNotificationsCount(0);
        setChatBoxOpen(true);
    };

    const closeChatBox = () => {
        setChatBoxOpen(false);
    };

    const handleRegistration = () => {
        if (user.userRole === 'admin') {
            toast.error('Admins cannot register for events.');
        } else if (count > 0) {
            registerForEvent(event_id);
        } else {
            toast.message('Event is already full. Cannot register.');
        }
    };

    const registerForEvent = async (eventId) => {
        try {
            const requestData = { eventId, userId: user.userId };
            console.log('Request Data:', requestData);
            const response = await axios.post('/registerUser', requestData);
            if (response.data.success) {
                console.log('Registration successful');
                setCount((prevCount) => prevCount - 1);
                setIsRegistered(true);
            } else {
                console.error('Registration failed:', response.data.error);
            }
        } catch (error) {
            console.error('Error registering for the event:', error);
        }
    };

    return (
        <>
            <div className='event-container'>
                <div className='event-details'>
                    <img className="event-image" src={getImageUrl()} />
                    <div className="right-content">
                        <div className='event-td'>
                            <h2>{event.title}</h2>
                            <div className='des'>
                                {event.description.length > 250 ? `${event.description.slice(0, 250)}...` : event.description}
                            </div>
                        </div>
                        <div className='details'>
                            <div className='first'>
                                <div className="content">
                                    <CalendarMonthOutlinedIcon className='gap-bw-icon' />
                                    <p>{event.date}</p>
                                </div>
                                <div className="content">
                                    <AlarmOnSharpIcon className='gap-bw-icon' />
                                    <p>{event.time}</p>
                                </div>
                                <div className="content">
                                    <TimelapseSharpIcon className='gap-bw-icon' />
                                    <p>{event.duration} hours</p>
                                </div>
                                <div className="content">
                                    <LocationOnOutlinedIcon className='gap-bw-icon' />
                                    <p>{event.place}</p>
                                </div>
                                <p className='state-city'>{event.state},{event.city}</p>
                            </div>
                            <div className="mid">
                                <div className='running-text'>
                                    <p>Click Chat Icon to Chat with Registered Participants</p>
                                </div>

                                <div className="notification-badge">
                                    <Badge badgeContent={notificationsCount} color="error" >
                                        <ChatBubbleOutlineOutlinedIcon onClick={() => handleChatIconClick(event_id)} className='chat-icon' />
                                    </Badge>
                                </div>


                            </div>
                            <div className='btn-reg'>
                                {isRegistered ? (
                                    <button className='event-register-button registered'>Registered</button>
                                ) : (
                                    <button onClick={handleRegistration} className='event-register-button'>
                                        Register
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isChatBoxOpen && <ChatBox onClose={closeChatBox} event={event} id={event_id} register={isRegistered} />}

        </>
    )
}

export default EventComponent   