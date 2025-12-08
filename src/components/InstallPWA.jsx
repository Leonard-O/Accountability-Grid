import React, { useState, useEffect } from 'react';
import { Download, Smartphone } from 'lucide-react';

const InstallPWA = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);

    useEffect(() => {
        const handler = (e) => {
            // Prevent the mini-infobar from appearing on mobile
            e.preventDefault();
            // Stash the event so it can be triggered later.
            setDeferredPrompt(e);
        };

        window.addEventListener('beforeinstallprompt', handler);

        return () => {
            window.removeEventListener('beforeinstallprompt', handler);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;

        // Show the install prompt
        deferredPrompt.prompt();

        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response to the install prompt: ${outcome}`);

        // We've used the prompt, and can't use it again, discard it
        if (outcome === 'accepted') {
            setDeferredPrompt(null);
        }
    };

    if (!deferredPrompt) return null;

    return (
        <button
            onClick={handleInstallClick}
            className="secondary-btn"
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '0.4rem 0.8rem',
                fontSize: '0.8rem',
                background: 'rgba(0, 255, 128, 0.1)',
                border: '1px solid rgba(0, 255, 128, 0.3)',
                color: 'hsl(145, 65%, 50%)',
                marginRight: '0.5rem'
            }}
        >
            <Smartphone size={16} />
            <span className="desktop-only">Install App</span>
        </button>
    );
};

export default InstallPWA;
