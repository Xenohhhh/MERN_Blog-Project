import React from 'react'
import { registerUser } from '../services/auth.service';

const Register = () => {
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ username, email, password });

        setLoading(true);
        setError("");

        try{
            const data = {username, email, password};
            const res = registerUser(data);
            console.log("Backend response:", res);
            alert("Registration successful!");
        }catch(error){
            setError(err.response?.data?.message || "Registration failed");
        }finally{
            setLoading(false);
        }
        
    };


  return (
    <div className='container'>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
            <div className='form-group'>
                <label>Username:</label>
                <input 
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className='form-control'    
                />
            </div>
            <div className='form-group'>
                <label>Email:</label>
                <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='form-control'
                />
            </div>
            <div className='form-group'>        
                <label>Password:</label>
                <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='form-control'
                />
            </div>
            <button type="submit" className='btn btn-primary mt-3'>Register</button>
        </form>
    </div>
  )
}

export default Register