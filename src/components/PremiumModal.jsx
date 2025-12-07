import React from 'react';
import { Check, Star, Zap, Crown } from 'lucide-react';
import { useMonetization } from './MonetizationContext';

const PremiumModal = ({ isOpen, onClose }) => {
    const { purchaseSubscription } = useMonetization();

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="glass-panel modal-content" style={{ maxWidth: '800px', width: '95%', textAlign: 'left' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <Crown size={48} color="hsl(45, 100%, 50%)" style={{ marginBottom: '1rem' }} />
                    <h2 style={{ margin: 0, fontSize: '2rem' }}>Upgrade to Focus+</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>Unlock your full potential with advanced tools.</p>
                </div>

                <div className="pricing-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
                    {/* Free */}
                    <div className="plan-card glass-panel" style={{ border: '1px solid rgba(255,255,255,0.1)', padding: '1.5rem' }}>
                        <h3>Free</h3>
                        <div className="price" style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '1rem 0' }}>$0 <span style={{ fontSize: '0.9rem', fontWeight: 'normal' }}>/mo</span></div>
                        <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                            <li style={{ marginBottom: '0.5rem' }}>✓ Basic Grid & Calendar</li>
                            <li style={{ marginBottom: '0.5rem' }}>✓ Standard Timer</li>
                            <li style={{ marginBottom: '0.5rem' }}>✓ Basic Stats</li>
                            <li style={{ marginBottom: '0.5rem' }}>✗ Ads Enabled</li>
                        </ul>
                        <button className="secondary-btn" style={{ width: '100%', marginTop: '1rem' }} disabled>Current Plan</button>
                    </div>

                    {/* Monthly */}
                    <div className="plan-card glass-panel" style={{ border: '1px solid hsl(145, 65%, 50%)', padding: '1.5rem', position: 'relative' }}>
                        <div style={{ position: 'absolute', top: '-10px', right: '10px', background: 'hsl(145, 65%, 50%)', color: 'black', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>POPULAR</div>
                        <h3>Monthly</h3>
                        <div className="price" style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '1rem 0' }}>$4.99 <span style={{ fontSize: '0.9rem', fontWeight: 'normal' }}>/mo</span></div>
                        <ul style={{ listStyle: 'none', padding: 0, color: 'white', fontSize: '0.9rem' }}>
                            <li style={{ marginBottom: '0.5rem' }}><Zap size={14} style={{ marginRight: '5px' }} /> No Ads</li>
                            <li style={{ marginBottom: '0.5rem' }}><Check size={14} style={{ marginRight: '5px' }} /> Advanced Analytics</li>
                            <li style={{ marginBottom: '0.5rem' }}><Check size={14} style={{ marginRight: '5px' }} /> Custom Goals</li>
                            <li style={{ marginBottom: '0.5rem' }}><Check size={14} style={{ marginRight: '5px' }} /> Cloud Backup</li>
                        </ul>
                        <button className="primary-btn" onClick={() => purchaseSubscription('monthly')} style={{ width: '100%', marginTop: '1rem' }}>Start 7-Day Trial</button>
                    </div>

                    {/* Lifetime */}
                    <div className="plan-card glass-panel" style={{ border: '1px solid hsl(45, 100%, 50%)', padding: '1.5rem' }}>
                        <h3>Lifetime</h3>
                        <div className="price" style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '1rem 0' }}>$99.99 <span style={{ fontSize: '0.9rem', fontWeight: 'normal' }}>/once</span></div>
                        <ul style={{ listStyle: 'none', padding: 0, color: 'white', fontSize: '0.9rem' }}>
                            <li style={{ marginBottom: '0.5rem' }}><Star size={14} style={{ marginRight: '5px' }} /> Everything in Monthly</li>
                            <li style={{ marginBottom: '0.5rem' }}><Star size={14} style={{ marginRight: '5px' }} /> Exclusive Gold Theme</li>
                            <li style={{ marginBottom: '0.5rem' }}><Star size={14} style={{ marginRight: '5px' }} /> Early Access Features</li>
                            <li style={{ marginBottom: '0.5rem' }}><Star size={14} style={{ marginRight: '5px' }} /> Support Indie Dev</li>
                        </ul>
                        <button className="primary-btn" onClick={() => purchaseSubscription('lifetime')} style={{ width: '100%', marginTop: '1rem', background: 'hsl(45, 100%, 50%)' }}>Unlock Forever</button>
                    </div>
                </div>

                <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                    <button className="secondary-btn" onClick={onClose}>Maybe Later</button>
                </div>
            </div>
        </div>
    );
};

export default PremiumModal;
