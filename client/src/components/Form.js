import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Style.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Form() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const notifySuccess = () => {
        toast.success("Data sent successfully!");
    }

    const notifyError = () => {
        toast.error("Failed to send data. Please try again.");
    }

    const collectData = async (e) => {
        e.preventDefault();
        try {
            let result = await fetch('http://localhost:4000/', {
                method: 'post',
                body: JSON.stringify({ name, email, password }),
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (!result.ok) {
                throw new Error('Failed to send data');
            }
            result = await result.json();
            localStorage.setItem("user", JSON.stringify(result));
            // Call success notification
            notifySuccess();
        } catch (error) {
            // Call error notification
            notifyError();
            console.error('Error:', error);
        }
    }

    return (
        <div className="container">
            <form onSubmit={collectData} >
                <h1 className="text-center pt-3">SIGNUP FORM</h1>
                <div className="mb-3 mt-3">
                    <label className="form-label">Username</label>
                    <input type='text' className='form-control'
                        value={name}
                        onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email Address</label>
                    <input type='email' className='form-control'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type='password' className='form-control'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button className=' btn btn-success'>Submit</button>
                <ToastContainer />
            </form>
        </div>
    )
}
