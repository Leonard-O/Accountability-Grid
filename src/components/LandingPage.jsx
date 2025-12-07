import React from 'react';
import { LayoutGrid, TrendingUp, Trophy, ArrowRight, CheckCircle } from 'lucide-react';

const LandingPage = ({ onGetStarted }) => {
    return (
        <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* Navbar */}
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        background: 'linear-gradient(135deg, hsl(145, 65%, 50%), hsl(180, 70%, 50%))',
                        color: '#1a1a1a',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: '900',
                        fontSize: '0.9rem',
                        boxShadow: '0 0 10px rgba(0, 255, 128, 0.2)'
                    }}>
                        AG
                    </div>
                    <h1 className="title" style={{
                        fontSize: '1.5rem',
                        background: 'linear-gradient(to right, hsl(145, 65%, 50%), hsl(180, 70%, 50%))',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        color: 'transparent',
                        margin: 0
                    }}>Accountability Grid</h1>
                </div>
                <button className="secondary-btn" onClick={onGetStarted}>Log In</button>
            </header>

            {/* Hero Section */}
            <section style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                padding: '4rem 0'
            }}>
                <div style={{
                    background: 'linear-gradient(to right, hsl(145, 65%, 50%), hsl(180, 70%, 50%))',
                    color: 'black',
                    padding: '5px 15px',
                    borderRadius: '20px',
                    fontWeight: 'bold',
                    marginBottom: '1.5rem',
                    fontSize: '0.9rem'
                }}>
                    #1 Consistency Tracker
                </div>

                <h1 style={{ fontSize: '3.5rem', lineHeight: 1.1, marginBottom: '1.5rem', maxWidth: '800px' }}>
                    Master Your Habits, <br />
                    <span style={{ color: 'hsl(145, 65%, 50%)' }}>One Day at a Time.</span>
                </h1>

                <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', marginBottom: '3rem', lineHeight: 1.6 }}>
                    Visualize your progress with our 365-Day Grid. Track study sessions, earn XP, and build an unbreakable streak.
                </p>

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="primary-btn" onClick={onGetStarted} style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
                        Start Your Journey <ArrowRight size={20} style={{ marginLeft: '8px' }} />
                    </button>
                </div>

                {/* Hero Image / Mockup */}
                <div style={{
                    marginTop: '4rem',
                    width: '100%',
                    maxWidth: '900px',
                    height: '400px',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '20px',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px', zIndex: 0 }}></div>
                    {/* Interactive Mock Grid */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(15, 1fr)',
                        gap: '6px',
                        width: '85%', // Reduce width slightly -> shrinks height -> creates top/bottom gap
                        padding: '1rem', // Minimal padding
                        alignSelf: 'center', // Center vertically
                        justifySelf: 'center', // Center horizontally
                        position: 'relative',
                        zIndex: 10
                    }}>
                        <InteractiveGrid />
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section style={{ padding: '4rem 0' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2rem' }}>Everything you need to stay focused</h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    <FeatureCard
                        icon={<LayoutGrid size={32} color="#00d2ff" />}
                        title="Visual Consistency"
                        desc="Fill your 365-day grid. Every green square is a victory."
                    />
                    <FeatureCard
                        icon={<Trophy size={32} color="gold" />}
                        title="Gamified Progress"
                        desc="Earn XP, level up, and unlock exclusive badges and themes."
                    />
                    <FeatureCard
                        icon={<TrendingUp size={32} color="#a855f7" />}
                        title="Advanced Analytics"
                        desc="detailed charts and heatmaps to understand your peak hours."
                    />
                </div>
            </section>

            {/* Footer */}
            <footer style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: '2rem 0', textAlign: 'center', color: 'var(--text-secondary)' }}>
                <p>&copy; {new Date().getFullYear()} Accountability Grid. Build with Focus.</p>
            </footer>
        </div>
    );
};

const FeatureCard = ({ icon, title, desc }) => (
    <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ background: 'rgba(255,255,255,0.05)', width: '60px', height: '60px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {icon}
        </div>
        <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{title}</h3>
        <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{desc}</p>
    </div>
);

// Helper for the interactive visual
const InteractiveGrid = () => {
    // Initialize with a predetermined pattern
    const [gridState, setGridState] = React.useState(() => {
        return Array.from({ length: 120 }).map((_, i) =>
            (i % 3 === 0) || (i % 5 === 0) || (i > 50 && i < 60)
        );
    });

    const toggleCell = (index) => {
        const newState = [...gridState];
        newState[index] = !newState[index];
        setGridState(newState);
    };

    return (
        <>
            {gridState.map((active, i) => (
                <div
                    key={i}
                    onClick={() => toggleCell(i)}
                    className={`day-cell ${active ? 'studied' : ''}`}
                    style={{
                        width: '100%',
                        height: 'auto',
                        aspectRatio: '1',
                        fontSize: '0', // Hide text if any
                        cursor: 'pointer'
                    }}
                />
            ))}
        </>
    );
};

export default LandingPage;
