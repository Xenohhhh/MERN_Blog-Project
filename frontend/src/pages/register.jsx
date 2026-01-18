import React from 'react'
import { registerUser } from '../services/auth.service';

const Register = () => {
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log({ username, email, password });

        setLoading(true);
        setError("");

        try{
            const data = {username, email, password};
            const res = await registerUser(data);
            console.log("Backend response:", res);
            alert("Registration successful!");
        }catch(err){
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

            {error && <p className="text-danger mt-2">{error}</p>}

        </form>
    </div>
  )
}

export default Register