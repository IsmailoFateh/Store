import React, { useState } from 'react';
import './css/Signin.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();



    setEmail('');
    setPassword('');
  };

  return (
    <div className="main">
      <div className="container1">
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Email: <br />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Password: <br />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <div className="but">
            <button type="submit">Sign In</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
