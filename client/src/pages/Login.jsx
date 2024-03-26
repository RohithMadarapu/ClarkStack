import React from 'react'
import { useState } from 'react';
import axios from "axios";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import MailIcon from '@mui/icons-material/Mail';
import KeyIcon from '@mui/icons-material/Key';
import './Login.css'
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode'
import { useDispatch } from 'react-redux'
import { login } from '../../slices/userSlice';
import Admindashboard from './Admindashboard';


function Login() {
    let userName = '';
    let userEmail = '';
    let userId = '';
    let userRole = '';
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [data, setData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    })
    const loginUser = async (e) => {
        e.preventDefault();
        const { email, password, rememberMe } = data;
        try {
            const { data } = await axios.post("/login", {
                email, password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            )
            if (data.error) {
                toast.error(data.error);
            }
            else {
                setData({});
                userName = data.name;
                userEmail = data.email;
                userId = data._id;
                userRole = data.role;
                dispatch(login({
                    userName: userName,
                    userEmail: userEmail,
                    userId: userId,
                    userRole: userRole,
                    rememberMe: rememberMe,
                }))
                {
                    userRole == "admin" ? navigate("/admindashboard") : navigate("/Events");
                }
            }
        } catch (error) {
            console.log(error);
        }

    };
    return (
        <div className='login_background'>
            <div className='login'>
                <form onSubmit={loginUser}>
                    <div className='container'>
                        <div className='header1'>
                            <div className='text'>Sign In</div>
                            <div className='underline'></div>
                        </div>
                        <div className='inputs'>
                            <div className='input'>
                                <MailIcon sx={{ fontSize: 40 }} className='icons' />
                                <input type='text' placeholder="" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
                            </div>
                            <div className='input'>
                                <KeyIcon sx={{ fontSize: 40 }} className='icons' />
                                <input type='password' placeholder="" value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />
                            </div>
                            <div className='remember-me'>
                                <input
                                    className='rem-check'
                                    type="checkbox"
                                    checked={data.rememberMe}
                                    onChange={(e) => setData({ ...data, rememberMe: e.target.checked })}
                                />
                                <h4 className='rem'>Remember me</h4>
                            </div>
                        </div>
                        <div className="button-container">
                            <button type="submit">Sign In</button>
                        </div>
                        <div className='register-page-redirecting'>
                            <h4>Don't have an account?</h4>
                            <a href="/register">Register</a>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default Login

