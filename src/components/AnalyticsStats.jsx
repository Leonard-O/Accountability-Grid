import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { Trophy, Flame, Target, Lock, TrendingUp, Calendar as CalendarIcon } from 'lucide-react';
import { useMonetization } from './MonetizationContext';

const AnalyticsStats = ({ data }) => {
    const { isPremium, setShowPremiumModal } = useMonetization();

    const totalSessions = Object.keys(data).length;

    // Streak Logic
    const calculateStreak = () => {
        const today = new Date();
        const start = new Date(today.getFullYear(), 0, 0);
        const todayIndex = Math.floor((today - start) / (1000 * 60 * 60 * 24));
        let streak = 0;
        let day = todayIndex;
        while (day > 0) {
            if (data[day] === 'studied') { streak++; day--; }
            else if (day === todayIndex && !data[day]) { day--; }
            else { break; }
        }
        return streak;
    };
    const streak = calculateStreak();

    // Weekly Data
    const getWeeklyData = () => {
        const chartData = [];
        const today = new Date();
        const start = new Date(today.getFullYear(), 0, 0);
        const todayIndex = Math.floor((today - start) / (1000 * 60 * 60 * 24));
        for (let i = 6; i >= 0; i--) {
            const dayIdx = todayIndex - i;
            chartData.push({
                name: `D${dayIdx}`,
                sessions: data[dayIdx] === 'studied' ? 1 : 0
            });
        }
        return chartData;
    };
    const weeklyData = getWeeklyData();

    return (
        <div className="analytics-container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '1rem', color: 'white' }}>
            <h2 style={{ marginTop: 0, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <TrendingUp color="hsl(145, 65%, 50%)" /> Performance Dashboard
            </h2>

            {/* Bento Grid Layout */}
            <div className="stats-grid">

                {/* Large Card: Chart */}
                <div className="glass-panel stats-card-wide" style={{
                    padding: '1.5rem',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h3 style={{ margin: 0 }}>Activity Trend</h3>
                        {isPremium && <span style={{ fontSize: '0.7rem', color: 'gold', border: '1px solid gold', padding: '2px 6px', borderRadius: '4px' }}>PREMIUM</span>}
                    </div>

                    {!isPremium && (
                        <div style={{
                            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                            background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)',
                            zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                        }}>
                            <Lock size={32} color="hsl(45, 100%, 50%)" style={{ marginBottom: '0.5rem' }} />
                            <p style={{ margin: '0 0 1rem 0' }}>Unlock Weekly Reports</p>
                            <button className="primary-btn" onClick={() => setShowPremiumModal(true)}>Upgrade</button>
                        </div>
                    )}

                    <div style={{ flex: 1, minHeight: '200px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <XAxis
                                    dataKey="name"
                                    stroke="#ccc"
                                    tick={{ fill: '#ccc', fontSize: 12 }}
                                    tickLine={{ stroke: '#555' }}
                                />
                                <YAxis
                                    hide={false}
                                    stroke="#555"
                                    tick={{ fill: '#888', fontSize: 10 }}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <Tooltip
                                    contentStyle={{ background: '#222', border: '1px solid #444', borderRadius: '8px', color: '#fff' }}
                                    cursor={{ fill: 'rgba(255,255,255,0.1)' }}
                                />
                                <Bar dataKey="sessions" radius={[4, 4, 0, 0]}>
                                    {weeklyData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.sessions ? 'hsl(145, 65%, 50%)' : 'rgba(255,255,255,0.1)'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Small Card: Streak */}
                <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: -20, right: -20, opacity: 0.1 }}>
                        <Flame size={120} />
                    </div>
                    <Flame size={40} color="hsl(30, 90%, 60%)" style={{ marginBottom: '0.5rem' }} />
                    <span style={{ fontSize: '3rem', fontWeight: 'bold', lineHeight: 1 }}>{streak}</span>
                    <span style={{ color: 'var(--text-secondary)', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px' }}>Day Streak</span>
                </div>

                {/* Small Card: Total Sessions */}
                <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <CalendarIcon size={40} color="hsl(200, 80%, 60%)" style={{ marginBottom: '0.5rem' }} />
                    <span style={{ fontSize: '3rem', fontWeight: 'bold', lineHeight: 1 }}>{totalSessions}</span>
                    <span style={{ color: 'var(--text-secondary)', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px' }}>Total Sessions</span>
                </div>

                {/* Wide Card: Year Progress */}
                <div className="glass-panel stats-card-wide" style={{
                    padding: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '2rem'
                }}>
                    <div style={{ flex: 1 }}>
                        <h3 style={{ margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Target size={20} color="hsl(50, 90%, 50%)" /> Yearly Goal
                        </h3>
                        <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>You're making great progress! Keep filling up the grid to reach 100%.</p>
                    </div>
                    <div style={{ position: 'relative', width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
                            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="hsl(145, 65%, 50%)" strokeWidth="4" strokeDasharray={`${(totalSessions / 365) * 100}, 100`} />
                        </svg>
                        <span style={{ position: 'absolute', fontSize: '0.9rem', fontWeight: 'bold' }}>{Math.round((totalSessions / 365) * 100)}%</span>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AnalyticsStats;
