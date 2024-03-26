import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import './Register.css'
import PersonSharpIcon from '@mui/icons-material/PersonSharp';
import MailIcon from '@mui/icons-material/Mail';
import KeyIcon from '@mui/icons-material/Key';

function Register() {
    const navigate = useNavigate();

    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const registerUser = async (e) => {
        e.preventDefault();
        const { name, email, password } = data;
        try {

            const { data } = await axios.post("/register", {
                name, email, password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            )
            if (data.error) {
                toast.error(data.error)
            } else {
                setData({})
                toast.success('Registerd Successfully. Welcome')
                navigate('/login')
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='register_background'>
            <div className='register'>
                <form onSubmit={registerUser}>
                    <div className='container'>
                        <div className='header1'>
                            <div className='text'>Sign Up</div>
                            <div className='underline'></div>
                        </div>
                        <div className='inputs'>
                            <div className='input'>
                                <PersonSharpIcon sx={{ fontSize: 40 }} className="icons" />
                                <input type='text' placeholder="" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
                            </div>
                            <div className='input'>
                                <MailIcon sx={{ fontSize: 40 }} className='icons' />
                                <input type='text' placeholder="" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
                            </div>
                            <div className='input'>
                                <KeyIcon sx={{ fontSize: 40 }} className='icons' />
                                <input type='password' placeholder="" value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />
                            </div>
                        </div>
                        <div className="button-container">
                            <button type="submit">Sign Up</button>
                        </div>
                        <div className='login-page-redirecting'>
                            <h4>Already have an account?</h4>
                            <a href="/login">Sign In</a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register
