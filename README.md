# Accountability Grid V2 🎯

A gamified habit tracking application built with **React**, **Supabase**, and **Vite**. Visualize your consistency, earn rewards, and focus better.

## ✨ Key Features

### 📊 Visualization
- **365-Day Grid**: GitHub-style contribution graph to visualize daily progress.
- **Calendar View**: Traditional monthly calendar for easy date navigation.
- **Responsive Design**: Works on Desktop, Tablet, and Mobile.

### 🎮 Gamification & Marketplace
- **XP System**: Earn XP for every study session. Level up to unlock badges!
- **Currency (Coins)**: Earn **1 coin per 5 minutes** of focused study.
- **Marketplace**: Spend coins on:
    - **Themes**: Unlock distinctive looks like the "Midas Touch" Gold Theme.
    - **XP Boosts**: Double your XP gain for limited time.
    - **Streak Freezes**: Protect your perfect streak on busy days.
- **Inventory**: Items are permanently purchased and stored in your account.

### 🛡️ Anti-Cheat & Focus
- **Secure Timer**: Server-side validation ensures study sessions are real.
- **Anti-Cheat**: Detects if the browser tab loses focus.
- **PWA Support**: Install as a native app on Android/iOS/Desktop. Works offline for navigation.

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite 5
- **Styling**: Vanilla CSS (CSS Variables, Glassmorphism, Dark Mode)
- **Backend Service**: Supabase (PostgreSQL, Auth, Edge Functions)
- **Deployment**: Netlify / Vercel compatible

## 🚀 Getting Started

1.  **Clone & Install**:
    ```bash
    git clone https://github.com/Leonard-O/Accountability-Grid.git
    npm install
    ```

2.  **Environment Setup**:
    Create a `.env` file with your Supabase credentials:
    ```env
    VITE_SUPABASE_URL=your_project_url
    VITE_SUPABASE_ANON_KEY=your_anon_key
    ```

3.  **Run Locally**:
    ```bash
    npm run dev
    ```

4.  **Database Setup**:
    Run the SQL scripts in your Supabase SQL Editor in this order:
    1.  `supabase_schema.sql` (Base tables)
    2.  `anti_cheat.sql` (Session verification)
    3.  `marketplace_mechanics.sql` (Store & Inventory)

## 📱 Progressive Web App (PWA)

This app is fully PWA compliant.
- **Install**: Look for the install icon in Chrome/Edge or "Add to Home Screen" on iOS.
- **Offline**: Basic navigation works without internet.

---

*Built by Antigravity* 🚀
