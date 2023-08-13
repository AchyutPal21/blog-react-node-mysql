import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext';

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState(null);

  const {login} = useContext(AuthContext);


  const handleInputChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/");
    } catch (err) {
      console.log("[Error in client side while login the user]");
      setErrors(err.response.data);
    }
  };


  return (
    <div className="auth">
        <h1>Login</h1>
        <form>
            <input type="text" placeholder="username" name="username" onChange={handleInputChange} />
            <input type="password" placeholder="password" name="password" onChange={handleInputChange} />
            <button onClick={handleSubmit}>Login</button>
            {errors && <p>{errors}</p>}
            <span>Don't have an account? <Link className="link" to="/register">Register</Link></span>
        </form>
    </div>
  )
}

export default Login