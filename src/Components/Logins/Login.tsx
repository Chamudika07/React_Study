import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import './Login.css';

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLec, setIsLec] = useState(false);
    const navigate = useNavigate();
    //Arry
    // const data = {
    //     email: "chamudika@gmail.com",
    //     password: "chamudika",
    //     role : "student"
    // }

    const users = [
        {
            email: "chamudika@gmail.com",
            password: "chamudika",
            role: "student"
        },
        {
            email: "lecturer@gmail.com",
            password: "lecturer123",
            role: "lecturer"
        },
        {
            email: "sanoshi@gmail.com",
            password: "sanoshi",
            role: "lecturer"
        },
        {
            email: "prasad@gmail.com",
            password: "prasad",
            role: "student"
        },
        {
            email: "vimesha@gmail.com",
            password: "vimesha",
            role: "lecturer"
        }
    ];

    const handleLogin = () => {

        const user = users.find(
            u => u.email === email && u.password === password
        );

        if (!user) {

            alert("Wrong credentials!!");
            return;
        }
        if (isLec) {
            if (user.role == "lecturer") {
                alert("Welcome Lecturer")
            }
            else {
                alert("Hey! Are you student")
            }
        }
        else if (user.role == "lecturer") {
            alert(`Plese select tick ${user.role}`);
        }
        else {
            alert(`Welcome ${user.role} `);
        }
    };

    const handleSingup = () => {
        navigate("/signup");
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h1 className='login-title'>HII bro</h1>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder='Enter your email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder='Enter your password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="checkbox-group">
                    <input
                        type="checkbox"
                        id="isLec"
                        onChange={(e) => setIsLec(e.target.checked)}
                    />
                    <label htmlFor="isLec">Login as Lecturer</label>
                </div>

                <button className="login-btn" onClick={handleLogin}>Login</button>
                <button className="signup-btn" onClick={handleSingup}>Sign Up</button>
            </div>
        </div>
    )
}

export default Login