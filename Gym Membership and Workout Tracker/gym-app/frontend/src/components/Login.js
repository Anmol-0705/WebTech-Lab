import React, { useState } from 'react';
import API from '../api';

export default function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      const res = await API.post('/users/login', { email, password });
      const user = res.data.user;        // <-- no token now
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
    } catch (error) {
      setErr(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="card p-3">
      <h4>Login</h4>
      {err && <div className="alert alert-danger">{err}</div>}
      <form onSubmit={submit}>
        <div className="mb-2">
          <input
            className="form-control"
            placeholder="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-2">
          <input
            className="form-control"
            placeholder="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-primary" type="submit">Login</button>
      </form>
    </div>
  );
}
