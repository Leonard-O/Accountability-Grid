-- RUN THIS ONLY
-- 1. Create Enum
create type subscription_tier as enum ('free', 'monthly', 'yearly', 'lifetime');

-- 2. Add columns to EXISTING profiles table
alter table profiles 
add column subscription_tier subscription_tier default 'free',
add column subscription_expires_at timestamp with time zone,
add column is_trial_used boolean default false,
add column streak_freeze_count int default 0,
add column coins int default 0;

-- 3. Create NEW inventory table
create table user_inventory (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  item_id text not null,
  item_type text not null,
  acquired_at timestamp with time zone default now()
);

-- Enable Security for Inventory
alter table user_inventory enable row level security;
create policy "Users can view own inventory" on user_inventory for select using (auth.uid() = user_id);
create policy "Users can add to own inventory" on user_inventory for insert with check (auth.uid() = user_id);

-- 4. Create NEW transactions table
create table transactions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  amount decimal(10, 2),
  currency text default 'USD',
  item_type text, 
  created_at timestamp with time zone default now()
);

-- Enable Security for Transactions
alter table transactions enable row level security;
create policy "Users can view own transactions" on transactions for select using (auth.uid() = user_id);
