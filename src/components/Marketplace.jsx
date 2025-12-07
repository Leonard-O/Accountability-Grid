import React, { useState } from 'react';
import { Snowflake, Palette, Music, Lock, ShoppingBag, Zap } from 'lucide-react';
import { useMonetization } from './MonetizationContext';
import { toast } from 'react-hot-toast';

const Marketplace = () => {
    const { coins, streakFreezes, isPremium, purchaseItem } = useMonetization();
    const [confirmPopover, setConfirmPopover] = useState({ isOpen: false, x: 0, y: 0, item: null });

    const items = [
        {
            id: 'freeze_1',
            name: 'Streak Freeze',
            description: 'Protect your streak for one missed day.',
            icon: <Snowflake size={32} color="#00d2ff" />,
            cost: 50,
            type: 'powerup',
            premiumOnly: false
        },
        {
            id: 'theme_gold',
            name: 'Midas Touch',
            description: 'Apply the exclusive Gold Theme.',
            icon: <Palette size={32} color="gold" />,
            cost: 500,
            type: 'cosmetic',
            premiumOnly: true
        },
        {
            id: 'sound_pack_rain',
            name: 'Rainy Lo-Fi',
            description: 'Immersive rain sounds for focus.',
            icon: <Music size={32} color="#a855f7" />,
            cost: 200,
            type: 'sound',
            premiumOnly: false
        },
        {
            id: 'xp_boost_1h',
            name: '2x XP Boost',
            description: 'Double XP for the next hour.',
            icon: <Zap size={32} color="#f59e0b" />,
            cost: 150,
            type: 'powerup',
            premiumOnly: false
        }
    ];

    const handleBuy = (item, e) => {
        if (item.premiumOnly && !isPremium) {
            toast.error("This item is reserved for Focus+ members!");
            return;
        }

        const rect = e.target.getBoundingClientRect();
        setConfirmPopover({
            isOpen: true,
            x: rect.left + rect.width / 2,
            y: rect.top - 10,
            item: item
        });
    };

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '1rem', color: 'white' }}>
            {/* Header */}
            <div className="glass-panel" style={{
                padding: '2rem',
                marginBottom: '2rem',
                backgroundImage: 'linear-gradient(to right, rgba(0,255,100,0.1), rgba(0,200,255,0.1))',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div>
                    <h2 style={{ margin: '0 0 10px 0', fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <ShoppingBag size={32} color="hsl(145, 65%, 50%)" /> Item Store
                    </h2>
                    <p style={{ margin: 0, color: 'var(--text-secondary)' }}>Customize your experience and boost your progress.</p>
                </div>
                <div style={{ display: 'flex', gap: '2rem', textAlign: 'center' }}>
                    <div>
                        <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'gold' }}>{coins}</div>
                        <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.7 }}>Coins</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#00d2ff' }}>{streakFreezes}</div>
                        <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.7 }}>Freezes</div>
                    </div>
                </div>
            </div>

            {/* Product Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                gap: '1.5rem'
            }}>
                {items.map(item => (
                    <div key={item.id} className="glass-panel product-card" style={{
                        padding: '1.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        position: 'relative',
                        transition: 'transform 0.2s',
                        cursor: 'default'
                    }}>
                        {item.premiumOnly && (
                            <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'hsl(45, 100%, 50%)', color: 'black', padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <Lock size={10} /> PLUS
                            </div>
                        )}

                        <div style={{
                            background: 'rgba(255,255,255,0.05)',
                            height: '100px',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '0.5rem'
                        }}>
                            {item.icon}
                        </div>

                        <div style={{ flex: 1 }}>
                            <h3 style={{ margin: '0 0 5px 0', fontSize: '1.1rem' }}>{item.name}</h3>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>{item.description}</p>
                        </div>

                        <button
                            className="secondary-btn"
                            onClick={(e) => handleBuy(item, e)}
                            style={{
                                width: '100%',
                                marginTop: 'auto',
                                background: item.premiumOnly && !isPremium ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.15)',
                                color: item.premiumOnly && !isPremium ? '#555' : 'white',
                                cursor: item.premiumOnly && !isPremium ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '0.8rem 1rem'
                            }}
                        >
                            <span>Buy</span>
                            <span style={{ fontWeight: 'bold', color: item.premiumOnly && !isPremium ? '#555' : 'gold' }}>{item.cost} 🪙</span>
                        </button>
                    </div>
                ))}
            </div>

            {/* Purchase Confirmation Popover */}
            {confirmPopover.isOpen && (
                <>
                    <div
                        style={{ position: 'fixed', inset: 0, zIndex: 998 }}
                        onClick={() => setConfirmPopover({ ...confirmPopover, isOpen: false })}
                    />
                    <div
                        className="glass-panel"
                        style={{
                            position: 'fixed',
                            left: confirmPopover.x,
                            top: confirmPopover.y,
                            transform: 'translate(-50%, -100%)',
                            zIndex: 999,
                            padding: '1rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.5rem',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            minWidth: '200px'
                        }}
                    >
                        <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Buy for {confirmPopover.item.cost} coins?</span>
                        <p style={{ margin: '0 0 8px 0', fontSize: '0.8rem', color: '#ccc' }}>Balance: {coins}</p>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button
                                className="secondary-btn"
                                onClick={() => setConfirmPopover({ ...confirmPopover, isOpen: false })}
                                style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', flex: 1 }}
                            >
                                Cancel
                            </button>
                            <button
                                className="primary-btn"
                                onClick={async () => {
                                    const success = await purchaseItem(confirmPopover.item.cost, confirmPopover.item.id);
                                    if (success) {
                                        toast.success(`Purchased ${confirmPopover.item.name}!`);
                                        setConfirmPopover({ ...confirmPopover, isOpen: false });
                                    }
                                }}
                                style={{
                                    padding: '0.4rem 0.8rem',
                                    fontSize: '0.8rem',
                                    background: 'gold',
                                    color: 'black',
                                    boxShadow: 'none',
                                    flex: 1
                                }}
                            >
                                Buy
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Marketplace;
