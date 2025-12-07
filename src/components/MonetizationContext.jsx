import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { toast } from 'react-hot-toast';

const MonetizationContext = createContext();

export const useMonetization = () => useContext(MonetizationContext);

export const MonetizationProvider = ({ children, session }) => {
    const [isPremium, setIsPremium] = useState(false);
    const [tier, setTier] = useState('free');
    const [coins, setCoins] = useState(0);
    const [streakFreezes, setStreakFreezes] = useState(0);
    const [xp, setXp] = useState(0);
    const [level, setLevel] = useState(1);
    const [badges, setBadges] = useState([]);
    const [showPremiumModal, setShowPremiumModal] = useState(false);

    useEffect(() => {
        if (session?.user) {
            fetchUserStatus();
            fetchBadges();
        }
    }, [session]);

    const fetchUserStatus = async () => {
        const { data, error } = await supabase
            .from('profiles')
            .select('subscription_tier, coins, streak_freeze_count, exp_points, level')
            .eq('id', session.user.id)
            .single();

        if (data) {
            setTier(data.subscription_tier);
            setCoins(data.coins);
            setStreakFreezes(data.streak_freeze_count);
            setXp(data.exp_points || 0);
            setLevel(data.level || 1);

            // Simple premium check
            setIsPremium(data.subscription_tier !== 'free');
        }
    };

    const fetchBadges = async () => {
        const { data, error } = await supabase
            .from('user_badges')
            .select('badge_id')
            .eq('user_id', session.user.id);

        if (data) {
            setBadges(data.map(b => b.badge_id));
        }
    };

    const purchaseSubscription = async (newTier) => {
        // Mock Purchase
        const { error } = await supabase
            .from('profiles')
            .update({ subscription_tier: newTier })
            .eq('id', session.user.id);

        if (!error) {
            setTier(newTier);
            setIsPremium(true);
            setShowPremiumModal(false);
            toast.success(`Welcome to Focus+ ${newTier.charAt(0).toUpperCase() + newTier.slice(1)}!`, { duration: 5000 });
        }
    };

    const purchaseItem = async (cost, itemName) => {
        if (coins >= cost) {
            // Deduct coins (Mock)
            const newBalance = coins - cost;
            await supabase.from('profiles').update({ coins: newBalance }).eq('id', session.user.id);
            setCoins(newBalance);
            return true;
        } else {
            toast.error("Not enough coins!");
            return false;
        }
    };

    const awardXP = async (amount) => {
        const newXp = xp + amount;
        let newLevel = level;

        // Simple Leveling Logic: Level * 100 XP to advance
        // Level 1 -> 2 needs 100 XP
        // Level 2 -> 3 needs 200 XP
        const xpToNextLevel = level * 100;

        if (newXp >= xpToNextLevel) {
            newLevel += 1;
            toast(`🎉 LEVEL UP! You reached Level ${newLevel}!`, {
                icon: '🚀',
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            });
        }

        setXp(newXp);
        setLevel(newLevel);

        // Save to DB
        await supabase.from('profiles').update({
            exp_points: newXp,
            level: newLevel
        }).eq('id', session.user.id);
    };

    return (
        <MonetizationContext.Provider value={{
            isPremium,
            tier,
            coins,
            streakFreezes,
            streakFreezes,
            xp,
            level,
            badges,
            showPremiumModal,
            setShowPremiumModal,
            purchaseSubscription,
            purchaseItem,
            purchaseSubscription,
            purchaseItem,
            awardXP,
            refreshUser: fetchUserStatus
        }}>
            {children}
        </MonetizationContext.Provider>
    );
};
