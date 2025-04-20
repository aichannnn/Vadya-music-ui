import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux'
import { login } from '../redux/actions/authActions'
import { useLocation, useNavigate,Link } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.fromSignup) {
      setSuccessMessage('Signup Successfull! Please Login');
    }
    if (location.state?.registeredEmail) {
      setEmail(location.state.registeredEmail)
    }
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();

    //get user from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      dispatch(login(user))
      navigate('/home')
    } else {
      setError('Incorrect email or password')
    }
  };

  return (
    <div className="container">
       <div className="auth-container-img">
       <div className="container-content">
        <span class="material-symbols-outlined">earbuds</span><p>Vādya</p>
        </div>
        <div className="content">
        <h1>Welcome Back!!</h1>
        <p>Login to access your playlist!!</p>
        <p>OR</p>
        </div>
        <div className="btns">
          <button type="button" className="btn1">Continue with Google</button>
          <button type="button" className="btn1">Continue with Apple</button>
        </div>
      </div>

      <div className="auth-container">
        <h1>Login to vādya</h1>
        {error && <p className="error"><span class="material-symbols-outlined">error</span>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <label>Email</label>
            <input
              type="email"
              placeholder="eg. jhonmartin@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-box">
          <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn">Login</button>
        </form>
        <h4>Don't have account yet? <Link to='/signup' className="no-dec">Create an account</Link></h4>
      </div>
     
    </div>
  );
};
export default Login;
