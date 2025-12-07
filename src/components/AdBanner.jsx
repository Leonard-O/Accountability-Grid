import React from 'react';
import { useMonetization } from './MonetizationContext';

const AdBanner = () => {
    const { isPremium } = useMonetization();

    if (isPremium) return null;

    return (
        <div style={{
            width: '100%',
            padding: '1rem',
            background: '#222',
            textAlign: 'center',
            borderTop: '1px solid #444',
            marginTop: 'auto' // Push to bottom
        }}>
            <span style={{ color: '#888', fontSize: '0.8rem', marginRight: '1rem' }}>ADVERTISEMENT</span>
            <span style={{ color: 'white' }}>Focus better with Premium. <strong style={{ color: 'hsl(145, 65%, 50%)', cursor: 'pointer' }}>Upgrade Now!</strong></span>
        </div>
    );
};

export default AdBanner;
