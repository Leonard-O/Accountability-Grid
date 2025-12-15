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

    // Phase 3 States
    const [inventory, setInventory] = useState([]);
    const [activeTheme, setActiveTheme] = useState('default');
    const [xpBoostExpiresAt, setXpBoostExpiresAt] = useState(null);

    const refreshUser = async () => {
        if (!session?.user) return;

        const { data, error } = await supabase
            .from('profiles')
            .select('subscription_tier, coins, streak_freeze_count, exp_points, level, active_theme, xp_boost_expires_at')
            .eq('id', session.user.id)
            .single();

        if (data) {
            setTier(data.subscription_tier);
            setCoins(data.coins);
            setStreakFreezes(data.streak_freeze_count);
            setXp(data.exp_points || 0);
            setLevel(data.level || 1);
            setActiveTheme(data.active_theme || 'default');
            setXpBoostExpiresAt(data.xp_boost_expires_at ? new Date(data.xp_boost_expires_at) : null);
            setIsPremium(data.subscription_tier !== 'free');
        }

        const { data: inv } = await supabase
            .from('user_inventory')
            .select('item_id')
            .eq('user_id', session.user.id);

        if (inv) {
            setInventory(inv.map(i => i.item_id));
        }
    };

    const fetchBadges = async () => {
        if (!session?.user) return;
        const { data } = await supabase
            .from('user_badges')
            .select('badge_id')
            .eq('user_id', session.user.id);

        if (data) {
            setBadges(data.map(b => b.badge_id));
        }
    };

    useEffect(() => {
        if (session?.user) {
            refreshUser();
            fetchBadges();
        }
    }, [session]);

    const isBoostActive = () => {
        return xpBoostExpiresAt && new Date() < xpBoostExpiresAt;
    };

    const purchaseSubscription = async (newTier) => {
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

    const buyTheme = async (itemId, cost) => {
        const { data: success, error } = await supabase.rpc('purchase_theme', { p_item_id: itemId, p_cost: cost });
        if (error) {
            toast.error(error.message);
            return false;
        }
        if (!success) {
            toast.error("Purchase failed (Funds? Already Owned?)");
            return false;
        }
        await refreshUser();
        return true;
    };

    const buyBoost = async (durationHours, cost) => {
        const { data: success, error } = await supabase.rpc('activate_xp_boost', { p_duration_hours: durationHours, p_cost: cost });
        if (error) {
            toast.error(error.message);
            return false;
        }
        if (!success) {
            toast.error("Insufficient coins!");
            return false;
        }
        await refreshUser();
        return true;
    };

    const buyFreeze = async (cost) => {
        if (coins < cost) {
            toast.error("Not enough coins!");
            return false;
        }
        const { error } = await supabase
            .from('profiles')
            .update({
                coins: coins - cost,
                streak_freeze_count: streakFreezes + 1
            })
            .eq('id', session.user.id);

        if (error) {
            toast.error("Transaction failed");
            return false;
        }
        refreshUser();
        return true;
    };

    const equipTheme = async (themeId) => {
        const { error } = await supabase
            .from('profiles')
            .update({ active_theme: themeId })
            .eq('id', session.user.id);

        if (error) {
            toast.error("Failed to equip");
            return;
        }
        setActiveTheme(themeId);
        toast.success("Theme applied! 🎨");
    };

    const awardXP = async (amount) => {
        // Boost Logic
        const multiplier = isBoostActive() ? 2 : 1;
        const finalAmount = amount * multiplier;

        const newXp = xp + finalAmount;
        let newLevel = level;
        const xpToNextLevel = level * 100;

        if (newXp >= xpToNextLevel) {
            newLevel += 1;
            toast(`🎉 LEVEL UP! You reached Level ${newLevel}!`, { icon: '🚀' });
        }

        if (multiplier > 1) {
            toast(`XP Boost Active! +${finalAmount} XP (2x)`, { icon: '⚡' });
        }

        setXp(newXp);
        setLevel(newLevel);

        await supabase.from('profiles').update({
            exp_points: newXp,
            level: newLevel
        }).eq('id', session.user.id);
    };

    const purchaseItem = async () => false; // Deprecated placeholder

    return (
        <MonetizationContext.Provider value={{
            xp, level, coins,
            streakFreezes, isPremium, tier,
            inventory, activeTheme,
            isBoostActive,
            refreshUser,
            buyTheme, buyBoost, buyFreeze, equipTheme,
            badges,
            showPremiumModal, setShowPremiumModal,
            purchaseSubscription,
            purchaseItem,
            awardXP
        }}>
            {children}
        </MonetizationContext.Provider>
    );
};
