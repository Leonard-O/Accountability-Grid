-- 1. Create PROFILES table (Linked to Auth)
create table profiles (
  id uuid references auth.users not null primary key,
  username text,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable RLS (Security)
alter table profiles enable row level security;
create policy "Users can view own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

-- 2. Create STUDY_LOGS table
create table study_logs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  day_index int not null,
  year int not null,
  status text check (status in ('studied', 'skipped', 'failed')),
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable RLS
alter table study_logs enable row level security;
create policy "Users can view own logs" on study_logs for select using (auth.uid() = user_id);
create policy "Users can insert own logs" on study_logs for insert with check (auth.uid() = user_id);
create policy "Users can delete own logs" on study_logs for delete using (auth.uid() = user_id);
-- 3. Monetization Extensions

-- SUBSCRIPTIONS & CURRENCY
-- Enum for tier
create type subscription_tier as enum ('free', 'monthly', 'yearly', 'lifetime');

-- Add columns to PROFILES
alter table profiles 
add column subscription_tier subscription_tier default 'free',
add column subscription_expires_at timestamp with time zone,
add column is_trial_used boolean default false,
add column streak_freeze_count int default 0,
add column coins int default 0;

-- INVENTORY (Themes, Icons, etc.)
create table user_inventory (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  item_id text not null, -- e.g., 'theme_dark_mode', 'icon_gold'
  item_type text not null, -- 'theme', 'icon', 'sound'
  acquired_at timestamp with time zone default now()
);

-- Enable RLS for Inventory
alter table user_inventory enable row level security;
create policy "Users can view own inventory" on user_inventory for select using (auth.uid() = user_id);
create policy "Users can add to own inventory" on user_inventory for insert with check (auth.uid() = user_id);

-- TRANSACTION LOG (Audit)
create table transactions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  amount decimal(10, 2), -- Real money or coins
  currency text default 'USD',
  item_type text, -- 'subscription', 'freeze', 'challenge'
  created_at timestamp with time zone default now()
);

-- Enable RLS for Transactions
alter table transactions enable row level security;
create policy "Users can view own transactions" on transactions for select using (auth.uid() = user_id);
