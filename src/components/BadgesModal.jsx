import React from 'react';
import { Award, Zap, Flame, Star, Calendar, Shield } from 'lucide-react';
import { useMonetization } from './MonetizationContext';

const BADGE_DEFINITIONS = [
    { id: 'first_session', name: 'First Steps', desc: 'Complete your first study session.', icon: <Star size={32} /> },
    { id: 'streak_3', name: 'Heating Up', desc: 'Reach a 3-day streak.', icon: <Flame size={32} /> },
    { id: 'streak_7', name: 'On Fire', desc: 'Reach a 7-day streak.', icon: <Zap size={32} /> },
    { id: 'streak_30', name: 'Unstoppable', desc: 'Reach a 30-day streak.', icon: <Award size={32} /> },
    { id: 'early_bird', name: 'Early Bird', desc: 'Study before 8 AM.', icon: <Calendar size={32} /> },
    { id: 'night_owl', name: 'Night Owl', desc: 'Study after 10 PM.', icon: <Award size={32} /> },
    { id: 'weekend_warrior', name: 'Weekend Warrior', desc: 'Study on Saturday and Sunday.', icon: <Shield size={32} /> },
    { id: 'level_5', name: 'Level 5', desc: 'Reach Level 5.', icon: <Star size={32} /> },
    { id: 'level_10', name: 'Master', desc: 'Reach Level 10.', icon: <Award size={32} /> },
];

const BadgesModal = ({ onClose }) => {
    const { badges } = useMonetization();

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ margin: 0 }}>Your Achievements</h2>
                    <button className="secondary-btn" onClick={onClose}>Close</button>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
                    gap: '1rem',
                    maxHeight: '60vh',
                    overflowY: 'auto',
                    padding: '0.5rem'
                }}>
                    {BADGE_DEFINITIONS.map((badge) => {
                        const isEarned = badges.includes(badge.id);
                        return (
                            <div key={badge.id} style={{
                                padding: '1rem',
                                borderRadius: '12px',
                                background: isEarned
                                    ? 'linear-gradient(135deg, rgba(0, 255, 128, 0.1), rgba(0, 255, 128, 0.05))'
                                    : 'rgba(255,255,255,0.03)',
                                border: isEarned
                                    ? '1px solid hsl(145, 65%, 50%)'
                                    : '1px dashed rgba(255,255,255,0.1)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                                gap: '0.5rem',
                                opacity: isEarned ? 1 : 0.4,
                                filter: isEarned ? 'none' : 'grayscale(100%)',
                                boxShadow: isEarned ? '0 0 15px rgba(0,255,128,0.2)' : 'none',
                                transition: 'all 0.3s ease'
                            }}>
                                <div style={{ color: isEarned ? 'hsl(145, 65%, 50%)' : 'var(--text-secondary)' }}>
                                    {badge.icon}
                                </div>
                                <div>
                                    <div style={{ fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '4px' }}>{badge.name}</div>
                                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{badge.desc}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default BadgesModal;
