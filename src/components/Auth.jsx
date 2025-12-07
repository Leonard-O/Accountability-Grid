import React, { useState } from 'react';
import { supabase } from '../supabase';

export default function Auth() {
    const [loading, setLoading] = useState(false);
    const [allowSignup, setAllowSignup] = useState(false); // Toggle between Login/Signup
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // New state
    const [msg, setMsg] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMsg('');

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) setMsg(error.message);
        setLoading(false);
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        // Password Confirmation Check
        if (password !== confirmPassword) {
            setMsg("Passwords do not match!");
            return;
        }

        setLoading(true);
        setMsg('');

        const { error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            setMsg(error.message);
        } else {
            setMsg('Check your email for the confirmation link!');
        }
        setLoading(false);
    };

    return (
        <div className="app-container" style={{ justifyContent: 'center', height: '80vh' }}>
            <header style={{ textAlign: 'center', marginBottom: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, hsl(145, 65%, 50%), hsl(180, 70%, 50%))',
                    color: '#1a1a1a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '900',
                    fontSize: '1.4rem',
                    marginBottom: '1rem',
                    boxShadow: '0 0 20px rgba(0, 255, 128, 0.3)'
                }}>
                    AG
                </div>
                <h1 className="title" style={{
                    fontSize: '2rem',
                    background: 'linear-gradient(to right, hsl(145, 65%, 50%), hsl(180, 70%, 50%))',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                    margin: 0
                }}>Accountability Grid</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Login to sync your habits across devices.</p>
            </header>

            <div className="glass-panel" style={{ width: '100%', maxWidth: '400px', padding: '2rem', margin: '0 auto' }}>
                <h2 style={{ marginTop: 0, textAlign: 'center' }}>{allowSignup ? 'Join the Club' : 'Welcome Back'}</h2>

                <form onSubmit={allowSignup ? handleSignup : handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <input
                            className="glass-input"
                            type="email"
                            placeholder="Email"
                            value={email}
                            required={true}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.8rem',
                                borderRadius: '8px',
                                border: '1px solid rgba(255,255,255,0.1)',
                                background: 'rgba(0,0,0,0.2)',
                                color: 'white',
                                outline: 'none'
                            }}
                        />
                    </div>
                    <div>
                        <input
                            className="glass-input"
                            type="password"
                            placeholder="Password"
                            value={password}
                            required={true}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.8rem',
                                borderRadius: '8px',
                                border: '1px solid rgba(255,255,255,0.1)',
                                background: 'rgba(0,0,0,0.2)',
                                color: 'white',
                                outline: 'none'
                            }}
                        />
                    </div>

                    {/* Confirm Password Field (Signup Only) */}
                    {allowSignup && (
                        <div>
                            <input
                                className="glass-input"
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                required={true}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '0.8rem',
                                    borderRadius: '8px',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    background: 'rgba(0,0,0,0.2)',
                                    color: 'white',
                                    outline: 'none'
                                }}
                            />
                        </div>
                    )}

                    <button className="primary-btn" disabled={loading} style={{ width: '100%', marginTop: '0.5rem' }}>
                        {loading ? 'Processing...' : (allowSignup ? 'Sign Up' : 'Log In')}
                    </button>
                </form>

                {msg && <p style={{ color: 'hsl(var(--accent-red))', textAlign: 'center', marginTop: '1rem' }}>{msg}</p>}

                <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    {allowSignup ? 'Already have an account?' : "Don't have an account?"} <br />
                    <span
                        onClick={() => { setAllowSignup(!allowSignup); setMsg(''); }}
                        style={{ color: 'hsl(var(--accent-green))', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        {allowSignup ? 'Log In here' : 'Sign Up here'}
                    </span>
                </p>
            </div>
        </div>
    );
}
