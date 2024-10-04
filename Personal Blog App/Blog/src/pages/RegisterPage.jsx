import { useState } from "react";

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');

  async function register(ev) {
    ev.preventDefault();
    
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

   
    if (!email) {
      alert('Email is required');
      return;
    }

    const response = await fetch('http://localhost:8800/register', {
      method: 'POST',
      body: JSON.stringify({ username, password, email }), 
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.status === 200) {
      alert('Registration successful');
    } else {
      alert('Registration failed');
    }
  }

  return (
    <form className="register" onSubmit={register}>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={ev => setUsername(ev.target.value)}
        required 
      />
      <input
        type="email" 
        placeholder="email" 
        value={email}
        onChange={ev => setEmail(ev.target.value)}
        required 
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={ev => setPassword(ev.target.value)}
        required
      />
      <input
        type="password"
        placeholder="confirm password" // Confirm password input
        value={confirmPassword}
        onChange={ev => setConfirmPassword(ev.target.value)}
        required 
      />
      <button>Register</button>
    </form>
  );
}
