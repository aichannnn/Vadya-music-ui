import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../redux/actions/authActions";
import { Link, useNavigate} from "react-router-dom";

const Signup = () => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(u => u.email === email);

    if (userExists) {
      setError('User already exists with this email');
    } else {
      const newUser = { fname, lname, email, password };
      const updateUser = [...users, newUser];
      localStorage.setItem('users', JSON.stringify(updateUser));

      dispatch(signup(newUser));
      navigate('/login', { state: { registeredEmail: email } })
    }
  }

  return (
    <div className="container">
      <div className="auth-container-img">
        
        <div className="container-content">
        <span class="material-symbols-outlined">earbuds</span><p>Vādya</p>
        </div>
        <div className="content">
        <h1>Get Started With Us</h1>
        <p>Complete this easy steps to register your account.</p>
        </div>
        <div className="btns">
          <button type="button" className="btn1">1. Signup your account</button>
          <button type="button" className="btn1">2. Setup your workspace</button>
          <button type="button" className="btn1">3. Setup your profile</button>
        </div>
      </div>

      <div className="auth-container">
        <h1>Sign Up Account</h1>
        {error && <p className="error"><span class="material-symbols-outlined">error</span>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-box2">
            <div>
            <label>First Name</label>
            <input
              type="text"
              placeholder="eg. Jhon"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
              required
            />
            </div>
            <div>
            <label>Last Name</label>
            <input
              type="text"
              placeholder="eg. Martin"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
            />
            </div>
          </div>
            <div className="input-box3">
              <label>Email</label>
              <input
                type="email"
                placeholder="eg. jhonmartin@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-box3">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          <button type="submit" className="btn" id="btn">Signup</button>

        </form>
        <h4>Already have an account? <Link to='/login' className="no-dec">Log in</Link></h4>
      </div>
    </div>
  );
};

export default Signup;