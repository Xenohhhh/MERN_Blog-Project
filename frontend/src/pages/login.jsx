import React from 'react'
import { loginUser } from '../services/auth.service'

const Login = () => {
    const [identifier, setIdentifier] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)
        setError("")

        try{
            const data = {identifier, password}
            const res = await loginUser(data)
            localStorage.setItem("token", res.accessToken)

            alert(`Welcome back`)
        }catch(err){
            setError(err.response?.data?.message || "Registration failed");
        }finally{
            setLoading(false);
        }
    }

  return (
    <div className='container'>
        <h1>Login Page</h1>

        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Identifier:</label>
                <input
                placeholder='Username/email'
                value={identifier}
                onChange={(e)=>{setIdentifier(e.target.value)}}
                className='form-control'
                />
            </div>
            <div className="form-group">
                <label>Password:</label>
                <input
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
                className='form-control'
                />
            </div>
            <button type="submit" className='btn btn-primary mt-3'>Login</button>

            {error && <p className="text-danger mt-2">{error}</p>}
        </form>
    </div>
  )
}

export default Login