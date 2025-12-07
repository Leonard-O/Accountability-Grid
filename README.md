# Accountability Table (V2)

A modern, gamified habit tracking application built with **React** and **Supabase**.

## Features

- **365-Day Grid**: Visualize your consistency with a GitHub-style contribution graph.
- **Focus Timer**: Built-in 25-minute study timer with "Research Mode" and anti-cheat detection.
- **Calendar View**: Traditional monthly view for easier navigation.
- **Gamification**: (Coming Soon) Earn XP and badges for consistency.
- **Cloud Sync**: (Coming Soon) Data persisted via Supabase.

## Tech Stack

- **Frontend**: React, Vite
- **Styling**: Vanilla CSS (Variables + Glassmorphism)
- **Icons**: Lucide React
- **Backend**: Supabase (Auth & DB)

## Getting Started

1.  Install dependencies:
    ```bash
    npm install
    ```
2.  Start the development server:
    ```bash
    npm run dev
    ```
3.  Open [http://localhost:5173](http://localhost:5173) (or the port shown in terminal).

## Project Structure

- `src/components/`: Reusable UI components (Grid, Timer, Calendar).
- `src/App.jsx`: Main application layout and state.
- `src/supabase.js`: Supabase client configuration.
