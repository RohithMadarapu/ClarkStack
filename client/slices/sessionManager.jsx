
import React, { useEffect } from 'react';
import { logout } from './userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SessionManager = ({ children }) => {

    const dispatch = useDispatch();
    const SESSION_TIMEOUT = 50 * 60 * 1000;
    let lastActivityTime = Date.now();

    const updateUserActivity = () => {
        lastActivityTime = Date.now();
        localStorage.setItem('lastActivityTime', lastActivityTime.toString());
    };

    const checkUserActivity = () => {
        const currentTime = Date.now();
        const inactiveDuration = currentTime - lastActivityTime;

        if (inactiveDuration > SESSION_TIMEOUT) {
            dispatch(logout());
        }
    };

    useEffect(() => {
        const activityInterval = setInterval(checkUserActivity, 60 * 1000); // Check every minute
        return () => {
            clearInterval(activityInterval);
            document.removeEventListener('mousemove', updateUserActivity);
            document.removeEventListener('keydown', updateUserActivity);
        };
    }, []);

    useEffect(() => {
        document.addEventListener('mousemove', updateUserActivity);
        document.addEventListener('keydown', updateUserActivity);

        return () => {
            document.removeEventListener('mousemove', updateUserActivity);
            document.removeEventListener('keydown', updateUserActivity);
        };
    }, []);

    return <>{children}</>;
};

export default SessionManager;
