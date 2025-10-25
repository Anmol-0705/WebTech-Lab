import React, { useState } from 'react';
import API from '../api';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      await API.post('/users/register', { name, email, password });
      setMsg('Registered successfully — you can now login.');
      setName(''); setEmail(''); setPassword('');
    } catch (err) {
      setMsg(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="card p-3">
      <h4>Register</h4>
      {msg && <div className="alert alert-info">{msg}</div>}
      <form onSubmit={submit}>
        <div className="mb-2">
          <input
            className="form-control"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
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
            minLength={6}
          />
        </div>
        <button className="btn btn-success" type="submit">Register</button>
      </form>
    </div>
  );
}