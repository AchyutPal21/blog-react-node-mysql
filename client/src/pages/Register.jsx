import React, {useState} from 'react';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState(null);

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
      await axios.post(`${import.meta.env.VITE_PROXY}/auth/register`, inputs);
      navigate("/login");
    } catch (err) {
      console.log("[Error in client side while sending user regis data to api]");
      setErrors(err.response.data);
    }
  };

  return (
    <div className="auth">
        <h1>Register</h1>
        <form>
            <input required type="text" placeholder="username" name="username" onChange={handleInputChange} />
            <input required type="email" placeholder="email" name="email" onChange={handleInputChange} />
            <input required type="password" placeholder="password" name="password" onChange={handleInputChange} />
            <button onClick={handleSubmit}>Register</button>
            {errors && <p>{errors}</p>}
            <span>Have an account? <Link className="link" to="/login">Login</Link></span>
        </form>
    </div>
  )
}

export default Register